
var bus_data_col = {};
var bus_data_row;

/*charging station*/
charg_station = [{'id':1,'StationName':'OTTC','x':100,'y':210},{'id':2,'StationName':'KJTC','x':500,'y':110},
    {'id':3,'StationName':'CTH','x':470,'y':230},{'id':4,'StationName':'JRPR','x':280,'y':350},
    {'id':5,'StationName':'KPR','x':120,'y':320},
    {'id':6,'StationName':'EH','x':430,'y':350},{'id':7,'StationName':'GS','x':300,'y':210}]


function station_bus(){

    d3.csv("../Data/BusStationTime.csv", function(data) {
        bus_data_row = data;
        col_data = data['columns'];
        for (i=0; i<col_data.length;i++){
            if (col_data[i] !=='') {
                bus_data_col[col_data[i]] = []
                data.forEach(function(element){
                    bus_data_col[col_data[i]].push(element[col_data[i]])
                })
            }
        }
    })
}



function time_select(){


    d3.csv("../Data/ActiveLoad.csv", function(data) {
        result = data.filter(function(d){
            return d.nodes=='n1';
        });
        data=[]
        for (var ele in result[0]){
            if (ele=='nodes'){
                data.push([ele,result[0][ele]])
            }else{
                data.push([ele,+result[0][ele]])
            }
        }
        data.shift()
        var dateList = data.map(function (item) {
            return item[0];
        });

        select = document.getElementById('time');

        for (var i = 0; i< dateList.length-1; i++){
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = 't'+(i+1)+': '+dateList[i];
            select.appendChild(opt);
        }

    });

}





function transport_update(bus){

    var station_mark_x = {'OTTC':0,'KJTC':0,'CTH':0,'JRPR':0,'KPR':0,'EH':0,'GS':0};
    var station_mark_y = {'OTTC':0,'KJTC':0,'CTH':0,'JRPR':0,'KPR':0,'EH':0,'GS':0};

    //select box
    time_select();

    // bus_station_data load
    station_bus();

    // append the svg object to the body of the page
    clear_svg("transport");

    // append tooltip
    var div2 = d3.select("#transport").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var svg_container = d3.select("#transport")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    route_data = [0,10,20,40,60,70,80,90,100,110];

    var routeColor = d3.scaleOrdinal().domain(route_data)
        .range(['white',"MediumTurquoise ", "PaleGreen ", "LightSteelBlue ", "gold", "pink", "Peru", "slateblue", "LightSkyBlue", "orange"])

    if (bus){
        var rect = svg_container.selectAll("rect")
            .data(bus)
            .enter()
            .append('g')

        rect.append('rect')
            .attr('x',function(d,i){
                temp = charg_station.filter(function(ele){
                    return ele.StationName==d.StationName
                })
                pos = station_mark_x[d.StationName];
                station_mark_x[d.StationName]=station_mark_x[d.StationName]+1;
                return temp[0].x-50+25*parseInt(pos%6)
            })
            .attr('y',function(d,i){
                temp = charg_station.filter(function(ele){

                    return ele.StationName==d.StationName
                })
                pos_y = station_mark_y[d.StationName];
                station_mark_y[d.StationName]=station_mark_y[d.StationName]+1;
                return temp[0].y-30-parseInt(pos_y/6)*22
            })
            .attr('width',20)
            .attr('height',20)
            .style('stroke','black')
            .style('stroke-width','0px')
            .style('fill',function(d){
                return routeColor(parseInt(d.Route)*10)
            })
            .on('mouseover',function(d){
                d3.select(this).style('stroke-width','2px').style("cursor", "pointer");

                //div2.html('BusId: '+d.BusID+"<br/>"+'Bus Route: ')
                document.getElementById('id').value = d.BusID;
                document.getElementById('route').value = d.Route;
                document.getElementById('velocity').value = 0;




            })
            .on('mouseout',function(d){
                d3.select(this).style('stroke-width','0px');
            })
            .on('click',function(d){
                console.log(d.BusID)
                busInfo(d.BusID)
            })

        var station_mark_x = {'OTTC':0,'KJTC':0,'CTH':0,'JRPR':0,'KPR':0,'EH':0,'GS':0}
        var station_mark_y = {'OTTC':0,'KJTC':0,'CTH':0,'JRPR':0,'KPR':0,'EH':0,'GS':0}

        rect.append("text")
            .text(function(d,i) {
                return d.BusID
            })
            .attr('x', function (d,i) {
                temp = charg_station.filter(function(ele){
                    return ele.StationName==d.StationName
                })
                pos = station_mark_x[d.StationName];
                station_mark_x[d.StationName]=station_mark_x[d.StationName]+1;
                return temp[0].x-48+25*parseInt(pos%6)
            })
            .attr('y',function (d) {
                temp = charg_station.filter(function(ele){

                    return ele.StationName==d.StationName
                })
                pos_y = station_mark_y[d.StationName];
                station_mark_y[d.StationName]=station_mark_y[d.StationName]+1;
                return temp[0].y-15-parseInt(pos_y/6)*22
            })
            .attr('font-size',12)
    }



    var circle1 = svg_container.selectAll("circle")
        .data(route_data)
        .enter()
        .append('g')

    circle1
        .append('circle')
        .attr("cx", function (d,i) { return i*50+70 })
        .attr("cy", 20)
        .attr("r", 15)
        .style("fill", function(d) { return routeColor(d); })
        .style('stroke','black')
        .style('stroke-width','0px')
        .on('mouseover',function(d){
                d3.select(this).style('stroke-width','2px').style("cursor", "pointer");
        })
        .on('mouseout',function(d){
                d3.select(this).style('stroke-width','0px')
        })
        .on('click',function(d){
            var e = document.getElementById("time");
            var time_line = (parseInt(e.options[e.selectedIndex].value)+1).toString();

            route_num = d/10;
            bus_info = bus_data_row.filter(function(d){
                if (route_num==0){
                    return d[time_line]=='1'
                }else{
                    return d.Route == route_num.toString() && d[time_line]=='1'

                }
            })
            transport_update(bus_info);
        })

    circle1.append("text")
        .text(function(d,i) {
            if(i==0){
                return 'Routes'
            }
            return d/10;
        })
        .attr('x', function (d,i) {
            if(i==0){
                return 50
            }

            return i*50+70 })
        .attr('y', 50)
        .attr('font-size',15)



    var images = svg_container.selectAll("image")
        .data(charg_station)
        .enter()
        .append('g')

    images.append('image')
        .attr('xlink:href', 'image/2.png')
        .attr("id", function(d){
            return d.StationName
        })
        .attr('x',function(d){
            return d.x
        })
        .attr('y',function(d){
            return d.y
        })
        .attr('width',35)
        .attr('height',35)

    images.append('text')
        .text(function(d){
            return 'Station '+d.id+": "+d.StationName
        })
        .attr('x',function(d){
            return d.x-30
        })
        .attr('y',function(d){
            return d.y+50
        })
        .attr('font-size',15)

    svg_container.selectAll("circle").enter().append('circle')
        .attr('cx',100)
        .attr("cy", 20)
        .attr("r", 15)
        .style("fill", function(d) { return routeColor(d); })
        .style('stroke','black')






}

function clear_svg(id){
    d3.select("#"+id).selectAll("*").remove();
}


// drop box change function
d3.select('#time')
    .on('change', function() {
        var e = document.getElementById("time");
        var time_line = (parseInt(e.options[e.selectedIndex].value)+1).toString();
        console.log(time_line)
        route_num = 0;
        bus_info = bus_data_row.filter(function(d){
            if (route_num==0){
                return d[time_line]=='1'
            }else{
                return d.Route == route_num.toString() && d[time_line]=='1'

            }
        })
        transport_update(bus_info);
    });


//button listener to plot velocity of bus
document.getElementById("s_veloctiy").addEventListener("click", function(){
    let bus_id = document.getElementById('id').value;
    console.log(bus_id);
    let e = document.getElementById("time");
    let time_line = (parseInt(e.options[e.selectedIndex].value)+1).toString();
    d3.csv("../Data/BusV.csv", function(data) {
        let busData = data.filter(function(d){return d.BusID==bus_id});
        console.log(busData)
        let time_value = busData.filter(function(d){
            return parseFloat(d[time_line])>0
        })
        console.log(time_value.length)
        if (time_value.length>0){
            document.getElementById('velocity').value = time_value[0][parseInt(time_line)];
        }else{
            document.getElementById('velocity').value = 0;

        }


    })


});


transport_update();


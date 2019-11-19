
var test = document.getElementsByClassName('col-6')[0];
page_Width = test.offsetWidth;
page_4 = document.getElementsByClassName('col-6')[0].offsetWidth;
var margin = {top: 0, right: 20, bottom: 0, left: 0},
    width = page_Width - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom;


var div = d3.select("#power").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// append the svg object to the body of the page
var svg = d3.select("#power")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


var myimage1 = svg.append('image')
    .attr('xlink:href', 'image/2.png')
    .attr('x',20)
    .attr('y',10)
    .attr('width', 18)
    .attr('height', 18);

var myimage2 = svg.append('image')
    .attr('xlink:href', 'image/1.png')
    .attr('x',20)
    .attr('y',50)
    .attr('width', 18)
    .attr('height', 18);

var myimage3 = svg.append('image')
    .attr('xlink:href', 'image/3.jpeg')
    .attr('x',20)
    .attr('y',90)
    .attr('width', 18)
    .attr('height', 18)

var chargeStation = svg.append("text").attr("x", 40).attr("y", 20)
    .text("Charging Stations")
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")
    .on("mouseover", function() {
        d3.select(this)
          .attr('fill','red')
            .style("cursor", "pointer");
    })
    .on('mouseout',function(){
        d3.select(this)
            .attr('fill','black')
            .style("cursor", "default");
    })
    .on('click',function(){
        table_plot();
    });
svg.append("text").attr("x", 40).attr("y", 60).text("First Station").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 40).attr("y", 100).text("Normal Stations").style("font-size", "15px").attr("alignment-baseline","middle")



var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-160))
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(19))
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2))



d3.json("graph.json", function(error, graph) {
    if (error) throw error;


    nodes_current = [];
    d3.csv("../Data/MaximumLineCurrent.csv", function(data){

        for (i = 0; i < data.length;i++){
            nodes_current.push(data[i])
        }
    })
    var link = svg.append("g")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .on('mouseover',function(d){
            link_temp = d;
            value = nodes_current.filter(function(d){
                return d.from==link_temp['source'].id && d.to==link_temp['target'].id
            })
            d3.select(this)
                .attr('class','link_hover')
                .style("cursor", "pointer");
            div.transition()
                .duration(100)
                .style("opacity", .9);
            div	.html(d['source'].id+" -> "+d['target'].id+"<br/>"+"MaximumLineCurrent: "+value[0].Imax)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

        })
        .on('mouseout',function(d){
            d3.select(this)
                .attr('class',"link")
                .style("cursor", "default");

            div.transition()
                .duration(200)
                .style("opacity", 0)
                .style("cursor", "default");
        })
        .on('click',function(d){
            activePowerFlow(d);
            Current(d);
        })

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter().append("g")


    var labels = node.append("text")
        .text(function(d) {
            return d.id;
        })
        .attr('x', 13)
        .attr('y', 15)
        .attr('font-size',12)


    image = node.append("image")
        .attr("xlink:href", function(d, i) {
              if (d.id == "n2" || d.id == "n9" ||d.id == "n13" ||d.id == "n8" ||d.id == "n25" ||d.id == "n31" ||d.id == "n33" ) {
                return "image/2.png";
            } else if(d.id=='n1'){
                  return "image/1.png"
              }else {
                return "image/3.jpeg";
            }
        })
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 18)
        .attr("height", 18)
        .on("mouseover", function(d) {
            d3.select(this)
                .attr("width", 26)
                .attr("height", 26)
                .style("cursor", "pointer");

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .attr("width", 18)
                .attr("height", 18);

        })
        .on('click',function(d){
            powerInfo(d.id)
        })


    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);
    simulation.force("link")
        .links(graph.links);
    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        node
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
    }

});




function distance() {
    return 30;
}

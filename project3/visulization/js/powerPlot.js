
// activeLoad
function activeLoad_plot(data){

    //hide charging station table
    document.getElementById("table").style.display = "none";
    document.getElementById("charging").style.display = "none";

    document.getElementById("activeLoad").style.display = "block";

    var node_name = 'Active power demand at '+ data[0][1]+" (in kW)"
    // based on prepared DOM, initialize echarts instance

    echarts.init(document.getElementById('activeLoad')).dispose();
    var myChart = echarts.init(document.getElementById('activeLoad'));


// specify chart configuration item and data

    data.shift()
    var dateList = data.map(function (item) {
        return item[0];
    });
    var valueList = data.map(function (item) {
        return item[1];
    });

    option = {

        // Make gradient line here
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
        }],


        title: [{
            left: 'center',
            text: node_name,
            textStyle: {
                fontWeight: '6'
            }
        }],
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            data: dateList
        }],
        yAxis: {
            scale: true,
            axisLabel: {
                show: true,    //这行代码控制着坐标轴x轴的文字是否显示
                textStyle: {
                    fontSize:'9'
                }
            }},
        dataZoom:{
            height:20
        },
        grid: [{
            bottom: '20%'
        }],
        series: [{
            type: 'line',
            areaStyle: {},
            showSymbol: false,
            data: valueList,
            markPoint : {
                symbol:'diamond',
                symbolSize: 10,
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            color: 'black',//气泡中字体颜色
                        }
                    }
                },

                data : [
                    {type : 'max', name: 'Maximum Value'},
                    {type : 'min', name: 'Minimal Value'}
                ]
            }

        }]
    };


// use configuration item and data specified to show chart
    myChart.setOption(option);
}

//voltage
function voltage_plot(data){

    document.getElementById("voltage").style.display = "block";

    var node_name = "Voltage at "+ data[0][1] +" (in kV)"
    // based on prepared DOM, initialize echarts instance

    echarts.init(document.getElementById('voltage')).dispose();
    var myChart = echarts.init(document.getElementById('voltage'));


// specify chart configuration item and data

    data.shift()
    var dateList = data.map(function (item) {
        return item[0];
    });
    var valueList = data.map(function (item) {
        return item[1];
    });

    option = {

        // Make gradient line here
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
        }],


        title: [{
            left: 'center',
            text: node_name,
            textStyle: {
                fontWeight: '6'
            }
        }],
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            data: dateList
        }],
        yAxis: {
            scale: true,
            axisLabel: {
                show: true,    //这行代码控制着坐标轴x轴的文字是否显示
                textStyle: {
                    fontSize:'9'
                }
            }
        },
        dataZoom: {
            height:20,
        },
        grid: [{
            bottom: '20%'
        }],
        series: [{
            type: 'line',
            showSymbol: false,
            data: valueList,
            markPoint : {
                symbol:'diamond',
                symbolSize: 10,
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            color: 'black',//气泡中字体颜色
                        }
                    }
                },

                data : [
                    {type : 'max', name: 'Maximum Value'},
                    {type : 'min', name: 'Minimal Value'}
                ]
            },
            lineStyle: {color: '#171399'}
        }]
    };


// use configuration item and data specified to show chart
    myChart.setOption(option);
}

//table station
function table_plot(){
    echarts.init(document.getElementById('activeLoad')).dispose();
    echarts.init(document.getElementById('voltage')).dispose();
    document.getElementById("activeLoad").style.display = "none";
    document.getElementById("voltage").style.display = "none";
    document.getElementById("table").style.display = "block";
    document.getElementById("charging").style.display = "none";


}

//charging station

function chargingStation(station){
    document.getElementById("charging").style.display = "block";

    d3.csv("../Data/chargingStation.csv", function(data) {
        result = data.filter(function(d){
            return d.station==station;
        });
        data=[]
        for (var ele in result[0]){
            if (ele=='station'){
                data.push([ele,result[0][ele]])
            }else{
                data.push([ele,+result[0][ele]])
            }
        }


        echarts.init(document.getElementById('charging')).dispose();
        var myChart3 = echarts.init(document.getElementById('charging'));

        var node_name = " Active power at "+station+ " (in kW)"
// specify chart configuration item and data
        data.shift()
        var dateList = data.map(function (item) {
            return item[0];
        });
        var valueList = data.map(function (item) {
            return item[1];
        });

        option = {

            // Make gradient line here
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }],


            title: [{
                left: 'center',
                text: node_name,
                textStyle: {
                    fontWeight: '6'
                }
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: dateList
            }],
            yAxis: {
                scale: true,
                axisLabel: {
                    show: true,    //这行代码控制着坐标轴x轴的文字是否显示
                    textStyle: {
                        fontSize:'9'
                    }
                }
            },
            dataZoom: {
                height:20,
                bottom:'0%'
            },
            grid: [{
                bottom: '20%'
            }],
            series: [{
                type: 'line',
                showSymbol: false,
                data: valueList,
                markPoint : {
                    symbol:'diamond',
                    symbolSize: 10,
                    itemStyle:{
                        normal:{
                            label:{
                                show: true,
                                color: 'black',//气泡中字体颜色
                            }
                        }
                    },

                    data : [
                        {type : 'max', name: 'Maximum Value'},
                        {type : 'min', name: 'Minimal Value'}
                    ]
                },
                lineStyle: {color: '#171399'}
            }]
        };


// use configuration item and data specified to show chart
        myChart3.setOption(option);
    });
}

function activePowerFlow(data){
    document.getElementById("table").style.display = "none";
    document.getElementById("charging").style.display = "none";
    document.getElementById("activeLoad").style.display = "block";
    var node1 = data['source'].id;
    var node2 = data['target'].id;
    var flow_name = "Power flow from "+ node1 + " to "+node2+" (in kW)"

    d3.csv("../Data/ActivePowerFlow.csv", function(data){
        result = data.filter(function(d){
            return d.From==node1 && d.To==node2;
        });

        data=[]
        for (var ele in result[0]){
            if (ele=='station'){
                data.push([ele,result[0][ele]])
            }else{
                data.push([ele,+result[0][ele]])
            }
        }

        echarts.init(document.getElementById('activeLoad')).dispose();
        var myChart4 = echarts.init(document.getElementById('activeLoad'));
        data.shift()
        data.shift()

        var dateList = data.map(function (item) {
            return item[0];
        });
        var valueList = data.map(function (item) {
            return item[1];
        });

        option = {

            // Make gradient line here
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }],


            title: [{
                left: 'center',
                text: flow_name,
                textStyle: {
                    fontWeight: '6'
                }
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: dateList
            }],
            yAxis: {
                scale: true ,
                axisLabel: {
                    show: true,    //这行代码控制着坐标轴x轴的文字是否显示
                    textStyle: {
                        fontSize:'9'
                    }
                }},
            dataZoom:{
                height:20
            },
            grid: [{
                bottom: '20%'
            }],
            series: [{
                type: 'line',
                areaStyle: {},
                showSymbol: false,
                data: valueList,
                markPoint : {
                    symbol:'diamond',
                    symbolSize: 10,
                    itemStyle:{
                        normal:{
                            label:{
                                show: true,
                                color: 'black',//气泡中字体颜色
                            }
                        }
                    },

                    data : [
                        {type : 'max', name: 'Maximum Value'},
                        {type : 'min', name: 'Minimal Value'}
                    ]
                }

            }]
        };


// use configuration item and data specified to show chart
        myChart4.setOption(option);
    })

}

function Current(data){
    document.getElementById("table").style.display = "none";
    document.getElementById("charging").style.display = "none";
    document.getElementById("voltage").style.display = "block";
    var node1 = data['source'].id;
    var node2 = data['target'].id;
    var flow_name = "The Current flow "+ node1 + " to "+node2+" in (A)"

    d3.csv("../Data/Current.csv", function(data){
        result = data.filter(function(d){
            return d.From==node1 && d.To==node2;
        });

        data=[]
        for (var ele in result[0]){
            if (ele=='station'){
                data.push([ele,result[0][ele]])
            }else{
                data.push([ele,+result[0][ele]])
            }
        }

        echarts.init(document.getElementById('voltage')).dispose();
        var myChart5 = echarts.init(document.getElementById('voltage'));
        data.shift()
        data.shift()

        var dateList = data.map(function (item) {
            return item[0];
        });
        var valueList = data.map(function (item) {
            return item[1];
        });

        option = {

            // Make gradient line here
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }],


            title: [{
                left: 'center',
                text: flow_name,
                textStyle: {
                    fontWeight: '6'
                }
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: dateList
            }],
            yAxis: {
                scale: true,
                axisLabel: {
                    show: true,    //这行代码控制着坐标轴x轴的文字是否显示
                    textStyle: {
                        fontSize:'9'
                    }
                }
            },
            dataZoom:{
                height:20
            },
            grid: [{
                bottom: '20%'
            }],
            series: [{
                type: 'line',
                showSymbol: false,
                data: valueList,
                markPoint : {
                    symbol:'diamond',
                    symbolSize: 10,
                    itemStyle:{
                        normal:{
                            label:{
                                show: true,
                                color: 'black',//气泡中字体颜色
                            }
                        }
                    },
                    data : [
                        {type : 'max', name: 'Maximum Value'},
                        {type : 'min', name: 'Minimal Value'}
                    ]
                },
                lineStyle: {color: '#171399'}

            }]
        };


// use configuration item and data specified to show chart
        myChart5.setOption(option);
    })

}
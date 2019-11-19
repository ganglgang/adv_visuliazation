


function BEBenergy_plot(data){


    document.getElementById("BEBenergy").style.display = "block";

    var node_name = 'The energy profile of '+ data[0][1]+" (in kWh)"
    // based on prepared DOM, initialize echarts instance

    echarts.init(document.getElementById('BEBenergy')).dispose();
    var myChart = echarts.init(document.getElementById('BEBenergy'));


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

function BEBpower_plot(data){

    document.getElementById("BEBpower").style.display = "block";

    var node_name = 'The power profile of '+ data[0][1]+" (in kWh)"
    // based on prepared DOM, initialize echarts instance

    echarts.init(document.getElementById('BEBpower')).dispose();
    var myChart = echarts.init(document.getElementById('BEBpower'));


// specify chart configuration item and data

    data.shift()
    var dateList = data.map(function (item) {
        return item[0];
    });
    var valueList = data.map(function (item) {
        return item[1];
    });

    console.log(dateList)
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
            lineStyle: {color: '#000000'}

        }]
    };


// use configuration item and data specified to show chart
    myChart.setOption(option);
}
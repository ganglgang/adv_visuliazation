

function powerInfo(id){
    d3.csv("../Data/ActiveLoad.csv", function(data) {
        result = data.filter(function(d){
            return d.nodes==id;
        });
        data=[]
        for (var ele in result[0]){
            if (ele=='nodes'){
                data.push([ele,result[0][ele]])
            }else{
                data.push([ele,+result[0][ele]])
            }
        }
        activeLoad_plot(data);
    });

    d3.csv("../Data/Voltage.csv", function(data) {
        result = data.filter(function(d){
            return d.nodes==id;
        });
        data_voltage=[]
        for (var ele in result[0]){
            if (ele=='nodes'){
                data_voltage.push([ele,result[0][ele]])
            }else{
                data_voltage.push([ele,+result[0][ele]])
            }
        }
        voltage_plot(data_voltage);

    });

}

function busInfo(id){
    d3.csv("../Data/BEBenergy.csv", function(data) {
        result = data.filter(function(d){
            return d.bus=='BEB'+id;
        });
        data_energy=[]
        for (var ele in result[0]){
            if (ele=='bus'){
                data_energy.push([ele,result[0][ele]])
            }else{
                data_energy.push([ele,+result[0][ele]])
            }
        }
        BEBenergy_plot(data_energy);
    });

    d3.csv("../Data/BEBpower.csv", function(data) {
        result = data.filter(function(d){
            return d.bus=='BEB'+id;
        });
        data_power=[]
        for (var ele in result[0]){
            if (ele=='bus'){
                data_power.push([ele,result[0][ele]])
            }else{
                data_power.push([ele,+result[0][ele]])
            }
        }
        BEBpower_plot(data_power);

    });

}
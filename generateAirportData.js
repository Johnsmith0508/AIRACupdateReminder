var allAirports = require('./allAirports.json');
var artccAirports = require('./ARTCCairportsList.json');
var fs = require('fs');
var znyAirporsWithCharts = {};

for(var state in allAirports)
{
    for(var city in allAirports[state])
    {
        for(var airport in allAirports[state][city])
        {
            for(var i in artccAirports.airports)
            {
                if (allAirports[state][city][airport].faaID == artccAirports.airports[i])
                {
                    znyAirporsWithCharts[i] = allAirports[state][city][airport];
                }
            }
        }
    }
}


try {
    fs.writeFileSync('./ARTCCairports.json',JSON.stringify(znyAirporsWithCharts));
} catch (err) {
    console.error(err);
}
// console.log(JSON.stringify(znyAirporsWithCharts));
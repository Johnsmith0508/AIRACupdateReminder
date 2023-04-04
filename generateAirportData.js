var allAirports = require('./allAirports.json');
var artccAirports = require('./ARTCCairportsList.json');
var fs = require('fs');
var znyAirporsWithCharts = {};

for(const airport in allAirports)
{
    for( i in artccAirports.airports)
    {
        if(allAirports[airport].faaID == artccAirports.airports[i])
        {
            znyAirporsWithCharts[i] = allAirports[airport];
        }
    }
}


try {
    fs.writeFileSync('./ARTCCairports.json',JSON.stringify(znyAirporsWithCharts));
} catch (err) {
    console.error(err);
}
// console.log(JSON.stringify(znyAirporsWithCharts));
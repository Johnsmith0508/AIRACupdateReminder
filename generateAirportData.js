var allAirports = require('./allAirports.json');
var artccAirports = require('./ARTCCairportsList.json');
var fs = require('fs');

const generateAirportData = () => {
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
        console.log("Done!");
    } catch (err) {
        console.error(err);
    }
};
module.exports = generateAirportData;
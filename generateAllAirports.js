var fs = require('fs');
var parsedJson = require('./d-TPP_metafile.json');
var allAirports = {};
//loop through all states
for(var stateIndex in parsedJson.digital_tpp.state_code)
{
    //stateID is the 2 letter identifer for each state
    var stateID =parsedJson.digital_tpp.state_code[stateIndex]['@_ID'];
    if(stateID == "DC") continue;

    //console.log("\n--- " + parsedJson.digital_tpp.state_code[stateIndex]['@_state_fullname']);

    allAirports[stateID] = {};
    //for every city in that state
    for(var cityIndex in parsedJson.digital_tpp.state_code[stateIndex].city_name)
    {
        var airportName, airportID, chartRefNum, cityName = parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex]['@_ID'];
        //console.log(parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex]['@_ID'] + ", " + parsedJson.digital_tpp.state_code[stateIndex]['@_ID']);
        //if the airport's identifer exists. this will only be true if there is one airport in the city
        allAirports[stateID][cityName] = [];
        if(parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_alnum'])
        {

            allAirports[stateID][cityName][0] =
            {
                'name' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_ID'],
                'faaID' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_apt_ident'],
                'icaoID' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_icao_ident'],
                'refNum' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_alnum'].toString().padStart(5,'0'),
                'charts' : []
            }
            for(var chart in parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name.record)
            {
                //console.log(chart);
                allAirports[stateID][cityName][0]['charts'][chart] = parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name.record[chart]['chart_name'];
            }


            //if the city has more than one airport
        } else
        {
            for(k in parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name)
            {

                allAirports[stateID][cityName][k] =
                {
                    'name' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_ID'],
                    'faaID' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_apt_ident'],
                    'icaoID' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_icao_ident'],
                    'refNum' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_alnum'].toString().padStart(5,'0'),
                    'charts' : []
                }
                for(var chart in parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k].record)
                {
                    //console.log(chart);
                    allAirports[stateID][cityName][0]['charts'][chart] = parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k].record[chart]['chart_name'];
                }

                // airportName = parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_ID'];
                // airportID = parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_apt_ident'];
                // chartRefNum = parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_alnum'];
                //print the airport info
                //console.log(`   ${airportName} (${airportID}) - ${chartRefNum.toString().padStart(5,'0')}`);
            }
        }
        
    }
}


try {
    fs.writeFileSync("./allAirports.json",JSON.stringify(allAirports));
} catch (err) {
    console.error(err);
}
// console.log(JSON.stringify(allAirports));
//console.log(parsedJson.digital_tpp.state_code[31].city_name[5]);
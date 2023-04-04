let fs = require('fs');
let parsedJson = require('./d-TPP_metafile.json');

const generateAllAirports = (parsedJson) =>
{
    console.log("> Generating allAirports.json...");
    let allAirports = [];
    //loop through all states
    for(const stateIndex in parsedJson.digital_tpp.state_code)
    {
        //stateID is the 2 letter identifer for each state
        let stateID =parsedJson.digital_tpp.state_code[stateIndex]['@_ID'];

        //TODO: something about the way DC's data is presented is breaking everything. there is only three (3) airports listed (none of which are in DC proper, but whatever) so we can skip for now
        if(stateID == "DC") continue;

        //for every city in that state
        for(const cityIndex in parsedJson.digital_tpp.state_code[stateIndex].city_name)
        {
            let cityName = parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex]['@_ID'];

            //if the airport's identifer exists. this will only be true if there is one airport in the city
            if(parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_alnum'])
            {
                let procedureNames = [];
                for(var chart in parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name.record)
                {
                    //console.log(chart);
                    procedureNames.push(parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name.record[chart]['chart_name']);
                }

                allAirports.push
                ({
                    'name' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_ID'],
                    'faaID' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_apt_ident'],
                    'icaoID' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_icao_ident'],
                    'refNum' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name['@_alnum'].toString().padStart(5,'0'),
                    'state' : stateID,
                    'stateLong' : parsedJson.digital_tpp.state_code[stateIndex]['@_state_fullname'],
                    'city' : cityName,
                    'procedures' : procedureNames
                });


                //if the city has more than one airport
            } else
            {
                for(k in parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name)
                {
                    let procedureNames = [];
                    for(var chart in parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k].record)
                    {
                        //console.log(chart);
                        procedureNames.push(parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k].record[chart]['chart_name']);
                    }

                    allAirports.push
                    ({
                        'name' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_ID'],
                    'faaID' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_apt_ident'],
                    'icaoID' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_icao_ident'],
                    'refNum' : parsedJson.digital_tpp.state_code[stateIndex].city_name[cityIndex].airport_name[k]['@_alnum'].toString().padStart(5,'0'),
                    'state' : stateID,
                    'stateLong' : parsedJson.digital_tpp.state_code[stateIndex]['@_state_fullname'],
                    'city' : cityName,
                    'procedures' : procedureNames
                    });

                }
            }
            
        }
    }


    try {
        fs.writeFileSync("./allAirports.json",JSON.stringify(allAirports));
        console.log("Done!");
    } catch (err) {
        console.error(err);
    }
};
module.exports = generateAllAirports;
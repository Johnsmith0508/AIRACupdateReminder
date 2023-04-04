const https = require('https');
const fs = require('fs');
const {XMLParser} = require('fast-xml-parser');
const nyAirports = require('./ARTCCairports.json');


const getUpdates = (nextAIRAC) => {
    const parserOptions = {
        ignoreAttributes: false,
        attributeNamePrefix : "@_"
    };
    const parser = new XMLParser(parserOptions);
    const request = https.get("https://aeronav.faa.gov/d-tpp/"+nextAIRAC+"/compare_pdf/", (res)=> {
        let rawUpdateLog = "";
        res.on('data',(chunk) => {
            rawUpdateLog += chunk.toString();
        });
        res.on('error',(e)=> {
            console.error(e);
        });
        res.on('end',()=>{
            //lets... not talk about how many ways this can break
            let updates = parser.parse(rawUpdateLog.replace(/<br>/g,"<br></br>")).html.body.hr.pre.A;
            // console.log(JSON.stringify(updates));
            let znyUpdates = {};

            for (i in nyAirports){
                znyUpdates[nyAirports[i].faaID] = [];
                for (j in updates){
                    if (updates[j]['#text'].startsWith(nyAirports[i].refNum)) {
                        znyUpdates[nyAirports[i].faaID].push("https://aeronav.faa.gov"+ updates[j]['@_HREF']);
                    }
                }
                //remove airports that have no pending updates
                if(!znyUpdates[nyAirports[i].faaID].length) {delete znyUpdates[nyAirports[i].faaID];}
            }
            console.log(JSON.stringify(znyUpdates));
        });
    });
};
module.exports = getUpdates;
const https = require('https');
const fs = require('fs');
const {XMLParser} = require('fast-xml-parser');
const nyAirports = require('./ARTCCairports.json');

const nextAIRAC = "2304"

const parser = new XMLParser();
//TODO: take input of next airac cycle
const request = https.get("https://aeronav.faa.gov/d-tpp/"+nextAIRAC+"/compare_pdf/", (res)=> {
    let rawUpdateLog = "";
    res.on('data',(chunk) => {
        rawUpdateLog += chunk.toString();
    });
    res.on('error',(e)=> {
        console.error(e);
    });
    res.on('end',()=>{
        let updates = parser.parse(rawUpdateLog.replace(/<br>/g,"<br></br>")).html.body.hr.pre.A;
        let znyUpdates = {};

        for (i in nyAirports){
            znyUpdates[nyAirports[i].faaID] = [];
            for (j in updates){
                if (updates[j].startsWith(nyAirports[i].refNum)) {
                    znyUpdates[nyAirports[i].faaID].push("https://aeronav.faa.gov/d-tpp/"+nextAIRAC+"/compare_pdf/" + updates[j]);
                }
            }
            if(!znyUpdates[nyAirports[i].faaID].length) {delete znyUpdates[nyAirports[i].faaID];}
        }
        console.log(JSON.stringify(znyUpdates));
    });
});
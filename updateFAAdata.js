const https = require('https');
const fs = require('fs');
const {XMLParser} = require('fast-xml-parser');


const updateFaaData = (nextAIRAC)=>{
    const parserOptions = {
        ignoreAttributes: false,
        attributeNamePrefix : "@_"
    };
    const parser = new XMLParser(parserOptions);
    let request = new Promise((resolve,reject) =>
    { 
        https.get("https://aeronav.faa.gov/d-tpp/"+nextAIRAC+"/xml_data/d-TPP_Metafile.xml", (res)=>
        {
            let rawData = [];
            console.log("> Downloading FAA metadata...")
            res.on('data',(chunk) => {
                rawData.push(chunk);
            });
            res.on('error',(e)=> {
                reject(e);
            });
            res.on('end',()=>{
                let formatedData = parser.parse(Buffer.concat(rawData).toString());
                resolve(formatedData);
                // try {
                //     fs.writeFileSync("./d-TPP_metafile.json");
                // } catch (err) {
                //     console.error(err);
                // }
            });
        });
    });
    return request;
};
module.exports = updateFaaData;
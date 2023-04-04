const generateAirportData = require('./generateAirportData');
const generateAllAirports = require('./generateAllAirports');
const getUpdates = require('./getUpdates');
const updateFAAdata = require('./updateFAAdata');
const invalidArgument = () => {
    console.error("Invalid argument. Usage: \n\ncharts <AIRAC>: generates list of updates at ARTCC airports in specified AIRAC cycle\n"+
    "data <AIRAC>: Updates FAA airport database to specified AIRAC cycle.\n"+
    "ARTCCdata: generates ARTCCairports.json based on ARTCCairportsList.json");
    process.exit(1);
};

if (process.argv.length < 3)
{
    invalidArgument();
}

switch(process.argv[2].toLowerCase())
{
    case "data":
        if (process.argv.length < 4) invalidArgument();
        updateFAAdata(process.argv[3]).then((response)=>
        {
            generateAllAirports(response);
            // console.log(JSON.stringify(response));
        });
        break;
    case "artccdata":
        console.log("> Generating ARTCCairports.json");
        generateAirportData();
        break;
    case "charts":
        if (process.argv.length < 4) invalidArgument();
        getUpdates(process.argv[3]);
        // console.log("charts");
        break;
    default:
        invalidArgument();
}
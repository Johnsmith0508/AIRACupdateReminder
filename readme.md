# ZNY Airac Update Helper


# FOR SIMULATION USE ONLY. DO NOT USE FOR REAL WORLD NAVIGATION.

This project is designed to help notify of upcoming changes to procedures in the next AIRAC cycle. The FAA publishes a webpage with a list of all procedure changes planed for future AIRAC cycles in the form of PDFs that highlight changes. Unfortunatly, as this webpage is not public-facing, there is very little human-readable information, and all of the charts are only marked with the "Chart Reference Number" which is useless by itself. This project is a very roundabout way of filtering all of the updates into only the ones that are relevant to ZNY, and makes the output *slightly* more human readable.

## How to use

occasionaly (like once per year), `node update.js data <AIRAC>` should be run. this will generate `allAirports.json`, this will update the information stored about all NAS airports. the data stored in this JSON file (with the exception of the crn) have no bearing on later steps. the purpose of this step is mainly to update the list of NAS airports


by default, this project is set up to handle airports in the ZNY ARTCC. if for some reason you are using this for a different ARTCC, you will first need to compile a list of all airports (towered and non-towered) for `ARTCCairportsList.json`. You can then use `node update.js ARTCCdata <AIRAC>` to create `ARTCCairports.json`(I'm great at naming things). 


The second JSON file is a subset of the first one, only containing data about airports in the d-TPP that are also in the ARTCC. as such, the `ARTCCdata` command need not be run frequently, unless there is a change in the number of airports in the ARTCC.



A few days before the AIRAC cycle rolls over, run `node update.js charts <AIRAC>`. This will pull the most up to date list of changes, and output a JSON formated array of airports with changes, as well as links to all relevent changes.
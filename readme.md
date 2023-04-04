# ZNY Airac Update Helper


# FOR SIMULATION USE ONLY. DO NOT USE FOR REAL WORLD NAVIGATION.

This project is designed to help notify of upcoming changes to procedures in the next AIRAC cycle. The FAA publishes a webpage with a list of all procedure changes planed for future AIRAC cycles in the form of PDFs that highlight changes. Unfortunatly, as this webpage is not public-facing, there is very little human-readable information, and all of the charts are only marked with the "Chart Reference Number" which is useless by itself. This project is a very roundabout way of filtering all of the updates into only the ones that are relevant to ZNY, and makes the output *slightly* more human readable.

## How to use

by default, this project is set up to handle airports in the ZNY ARTCC. if for some reason you are using this for a different ARTCC, you will first need to compile a list of all airports (towered and non-towered) for `ARTCCairportsList.json`. You can then use `generateAirportData.js` to create `ARTCCairports.json`(I'm great at naming things). 


The second JSON file is useful by itself, as it contains information such as the airports' chart reference number, as well as an array of the names of all procedures published for a given airport. This information is pulled from the metadata that is provided from the FAA in the digital terminal procedures publication. at the moment the d-TPP metadata is not updatable, however this is not strictly requred. `ARTCCairports.json` does not need to be updated frequently, as the only information needed for later steps is the crn.


A few days before the AIRAC cycle rolls over, run `getUpdates.js`. This will pull the most up to date list of changes, and output a JSON formated array of airports with changes, as well as links to all relevent changes.
// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, cler out existing data
    tbody.html("");

    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach(dataRow) => {
        // append a row to the table body
        let row = tbody.append("tr");

        // Loop trough each field in the dataRow and add
        //each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

// Keep track of all the filters
var filters = {};


function updateFilters() {

    //Save the element, value, and id of the filter that was changed
    let changedElement = d3.select(this);
    let elementValue = changedElement.property("value");
    let filterId = changedElement.attr("id");

    // if a filter value was entered then add that filterId and value
    // to filters list. Otherwise, clear that filter fro filters object
    if (elementValue) {
        filters[filterId] = elementValue;
    } else {
        delete filters[filterId];
    }

// Call function to apply all filters and rebuild the value
filterTable();


}

function filterTable() {

    // set the filteredData to the tableData
    let filteredData = tableData;

    //Loop through all of the filters and keep any data that
    // matches the filter values

    for (var keys in filters) {
        filteredData = filteredData.filter(row => row[keys] === filters[keys]);
    }

    // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);

//[Environment Setup and Test ----importing local json file using d3.json: 1.run git bash(git commend) on window and type "python -m http.server" 2.type d3.json code(see below) and open index.html page 3. update html address using Google Browser from C://...to http://localhost:8000/Interactive-Web-Visualizations-Challenge/StarterCode/index.html 4. refresh the html page and open Console to check json data  5. read json file on html console
// d3.json("samples.json").then(function(data){console.log(data)]

//Create a dropdown menu to display the top 10 OTUs found in that individual//
function init() {
    d3.json("samples.json").then(data => {
        
// create array of Test Subject ID No., Subject ID data comes from samples.json.names dictionary//
    let testSubject = data.names;
// start from the first item and then loop//
    let firstData = testSubject[0];
        // console.log(firstData)

    updatePlotly(firstData)
    });
}
// Initialize the dashboard, without it, all data is not able to show on the dashboard
init();

d3.selectAll("#selDataset").on("change", updatePlotly);
d3.json("samples.json").then(data =>{
    // console.log(data)
    let select = document.getElementById("selDataset")
    let dropdownMenu = data.names;
    // console.log(dropdownMenu);
// Prototypical use case increments loop counter by one on each iteration for dropdown menus//
    for (let i = 0; i < dropdownMenu.length; i++) {
        let selectionName =  dropdownMenu[i];
        let main = document.createElement("option");
        main.text = selectionName;
        main.value = selectionName;
        select.add(main);
    };
});

// Set up all values for creating bar chart, bubble chart, demopgraphic info 
function updatePlotly() {
    d3.json("samples.json").then(data => {
// get the value of the selection//
    let id = d3.select("#selDataset").property("value");

//use id to filter top 10 values (step 1-3 below)//
    let filteredId = data.samples.filter((items) => items.id === id);
    console.log(filteredId);



//1. retreive the sample_values//
    let sortValues = filteredId.map(items => items.sample_values).sort();
// get the top 10 sample_values
    let topSamples = sortValues[0].slice(0, 10).reverse();
    // console.log(topSamples);
//2.retreive the otu_ids//
    let otuIds = filteredId.map(items => items.otu_ids).sort();
// get the top 10 otu_ids for bar chart//
    let topIds = otuIds[0].slice(0, 10).reverse().toString().split(",").map((idnumber) => `OTU ${idnumber}`);
    // console.log(topIds);
//3. retrieve the otu_label//
    let otuLabels = filteredId.map(items => items.otu_labels).sort();
// get the top 10 otu_labels for bar chart//
    let topLabels = otuLabels[0].slice(0, 10).reverse();
    // console.log(topLabels);
// all needed elements from samples dictionary include all values,all ids,and all labels for bubble chart
    let allvalues = sortValues[0];
    let iDs = otuIds[0];
    let labels = otuLabels[0];

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    let trace1 = {
        x: topSamples,
        y: topIds,
        text: topLabels,
        type: "bar",
        orientation: "h",
        
    };

    let traceData = [trace1];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            b: 100,
        }
    };

    Plotly.newPlot("bar", traceData, layout);

// Create a bubble chart that displays each sample,colorscale resource website: https://plotly.com/javascript/colorscales/
    let trace2 = {
        x: iDs,
        y: allvalues,
        mode: "markers",
        text: labels,
        type: "bubble",
        marker: {size: allvalues,color: iDs,colorscale: "Earth"}
    };
    
    let traceData2 = [trace2];

    let layout2 = {
        height: 600,
        width: 1200,
        xaxis: {title: "OTU ID"}
    };
    
    Plotly.newPlot("bubble", traceData2, layout2);

// filter metadata for connecting dropdown menu//
    let metadata = data.metadata.filter((items) => items.id == id);
    console.log(metadata)
//Display the sample metadata, i.e., an individual's demographic information//
// the data of Demographic Info comes from sample.json.metadata distionary, in order to show the data on Demographic Info box, write this code below to show the first id and then create a loop://
    demographicData = metadata[0]
    // console.log(demographicData)
//Javascript Object.keys, values, entries resource: https://javascript.info/keys-values-entries//,for example "id" is {key}: 940 is {value}; "ethnicity" is {key}: "Caucasian" is {value} etc.
//.join("") function at the end is for delete all space and comma between each key:value
    detailedInfo = Object.entries(demographicData).map(([key, value]) => `<p>${key}: ${value}</p>`).join("");
    // console.log(dataInfo)
//read json inner text: check this learning resource https://www.youtube.com/watch?v=C3dfjyft_m4
    document.getElementById("sample-metadata").innerHTML = detailedInfo

    });
};


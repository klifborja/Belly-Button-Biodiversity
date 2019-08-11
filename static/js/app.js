// @TODO: Complete the following function that builds the metadata panel
function buildMetadata(sample) {
  var url = `/samples/${sample}`;

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function (data) {
    console.log("url");
    console.log(url);
    console.log("first sample");
    console.log(sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    var metaData = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metaData.html("");
    console.log("meta sample");
    console.log(metaData);

    // Use `Object.entries` to add each key and value pair to the panel

    Object.entries(sample).forEach(function ([key, value]) {
      var dataValues = metaData.append("p");
      dataValues.text(`${key}: ${value}`);
      console.log("dataValues");
      console.log(dataValues);
      console.log("key, value");
      console.log(key, value);
    })
  });


};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var selectMetadata = `/samples/${sample}`;
  d3.json(selectMetadata).then(function (response) {
    console.log(response)

    var otuIds = response.otu_ids;
    var sampleValues = response.sample_values;
    var otuLabels = response.otu_labels;

    // @TODO: Build a Bubble Chart using the sample data
    var bubbleTrace = {
      x: otuIds,
      y: sampleValues,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds
      }
    };

    var bubbleData = [bubbleTrace];


    Plotly.newPlot("bubble", bubbleData);

    // @TODO: Build a Pie Chart
    // Use slice() to grab the top 10 sample_values, otu_ids, and labels (10 each).

    var pieTrace = {
      labels: otuIds.slice(0, 10),
      values: sampleValues.slice(0, 10),
      type: "pie"
    };

    var pieData = [pieTrace];

    var pieLayout = {
      title: "Pie Chart",
    };

    Plotly.newPlot("pie", pieData, pieLayout, { showSendToCloud: true });
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var dropDown = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      dropDown
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);

}

// Initialize the dashboard
init();



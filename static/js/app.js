function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url = `/samples/${sample}`;

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function (data) {
    var dataPanel = [data];

    // Use d3 to select the panel with id of `#sample-metadata`
    var metaData = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metaData.html("");

    // Use `Object.entries` to add each key and value pair to the panel

    dataValues = []
    Object.entries(dataPanel).forEach(([key, value]) => {
      dataValues.push(key, value);
    });

    var valuePair = Object.entries(dataValues[1]);
    console.log(valuePair)
    metaData.selectAll('p').data(valuePair).enter().append('p')
      .text(function (d) {
        console.log(d[0])
        return `${d[0]}:${d[1]}`
      })

  })
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(selectMetadata).then(function (response) {
    var response = [response];
    var otuIds = response[0].otu_ids;
    var otuLabels = response[0].otu_labels;
    var sampleValues = response[0].sample_values;

    // @TODO: Build a Bubble Chart using the sample data
    var bubbleTrace = {
      x: otuIds,
      y: sampleValues,
      mode: 'markers',
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
      type: 'pie'
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



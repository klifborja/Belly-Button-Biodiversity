function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  var selectMetadata = d3.select('#sample-metadata');
  // Use `.html("") to clear any existing metadata
  d3.json(`/samples/${sample}`).then(data => {
    selectMetadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    console.log(Object.entries(data));
    Object.entries(data).forEach(([key, value]) => {
      selectMetadata
      d3.append('p').text(`${key} : ${value}`)
      d3.append('hr')
    });
  })

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

      // // @TODO: Build a Pie Chart
      // // HINT: You will need to use slice() to grab the top 10 sample_values,
      // // otu_ids, and labels (10 each).

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
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
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

};

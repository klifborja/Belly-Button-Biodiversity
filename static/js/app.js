function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  var selectMetadata = d3.select('#sample-metadata');
  // Use `.html("") to clear any existing metadata
  d3.json(`/metadata/${sample}`).then(data => {
    selectMetadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    console.log(Object.entries(data));
    Object.entries(data).forEach(([key, value]) => {
      selectMetadata
        .append('p').text(`${key} : ${value}`)
        .append('hr')
    });
  })
  // function buildMetadata(sample) {
  //   var url1 = `/samples/${sample}`;
  //   // @TODO: Complete the following function that builds the metadata panel
  //   // Use `d3.json` to fetch the metadata for a sample
  //   d3.json(url1).then(function (data) {

  //     var dataA = [data];
  //     // Use d3 to select the panel with id of `#sample-metadata`
  //     var dataM = d3.select("#sample-metadata");
  //     // Use `.html("") to clear any existing metadata
  //     dataM.html("");
  //     // Use `Object.entries` to add each key and value pair to the panel
  //     // Hint: Inside the loop, you will need to use d3 to append new
  //     // tags for each key-value in the metadata.

  //     dataP = []
  //     Object.entries(dataA).forEach(([key, value]) => {
  //       dataP.push(key, value);
  //     });

  //     var skup = Object.entries(dataP[1]);
  //     console.log(skup)
  //     dataM.selectAll('p').data(skup).enter().append('p')
  //       .text(function (d) {
  //         console.log(d[0])
  //         return `${d[0]}:${d[1]}`
  //       })

  //   })
  // }

  function buildCharts(sample) {
    var urls = `/samples/${sample}`;
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(urls).then(function (response) {
      var response = [response];
      var otuI = response[0].otu_ids;
      var otuL = response[0].otu_labels;
      var sampleV = response[0].sample_values;
      // @TODO: Build a Bubble Chart using the sample data
      var traceb = {
        x: otuI,
        y: sampleV,
        mode: 'markers',
        marker: {
          size: sampleV,
          color: otuI
        }
      };

      var datab = [traceb];


      Plotly.newPlot("bubble", datab);

      // // @TODO: Build a Pie Chart
      // // HINT: You will need to use slice() to grab the top 10 sample_values,
      // // otu_ids, and labels (10 each).

      var tracep = {
        labels: otuI.slice(0, 10),
        values: sampleV.slice(0, 10),
        type: 'pie'
      };

      var datap = [tracep];

      var layoutp = {
        title: "Pie Chart",
      };

      Plotly.newPlot("pie", datap, layoutp, { showSendToCloud: true });
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
// function buildMetadata(sample) {

//   // @TODO: Complete the following function that builds the metadata panel

//   // Use `d3.json` to fetch the metadata for a sample
//   // Use d3 to select the panel with id of `#sample-metadata`
//   var selectMetadata = d3.select('#sample-metadata');
//   // Use `.html("") to clear any existing metadata
//   d3.json(`/metadata/${sample}`).then(data => {
//     selectMetadata.html("");
//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//     console.log(Object.entries(data));
//     Object.entries(data).forEach(([key, value]) => {
//       selectMetadata
//         .append('p').text(`${key} : ${value}`)
//         .append('hr')
//     });
//   })

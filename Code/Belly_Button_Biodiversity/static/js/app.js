function buildMetadata(sample) {
  var url1 = `/samples/${sample}`;
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url1).then(function (data) {

    var dataA = [data];
    // Use d3 to select the panel with id of `#sample-metadata`
    var dataM = d3.select("#sample-metadata");
    // // // Use `.html("") to clear any existing metadata
    dataM.html("");
    // // // Use `Object.entries` to add each key and value pair to the panel
    // // // Hint: Inside the loop, you will need to use d3 to append new
    // // // tags for each key-value in the metadata.

    dataP = []
    Object.entries(dataA).forEach(([key, value]) => {
      dataP.push(key, value);
    });

    var skup = Object.entries(dataP[1]);
    console.log(skup)
    dataM.selectAll('p').data(skup).enter().append('p')
      .text(function (d) {
        console.log(d[0])
        return `${d[0]}:${d[1]}`
      })

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  })
}

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
//   // BONUS: Build the Gauge Chart
//   Plotly.d3.json(url4, function (error, guageData) {
//     var WFREQ = guageData.WFREQ;
//     console.log(guageData.WFREQ);
//     plotGuage(WFREQ);
//   });
//   // buildGauge(data.WFREQ);
//   function plotGuage(WFREQ) {

//     // Enter a speed between 0 and 180
//     var level0 = WFREQ;
//     var level = level0 * 18

//     // Trig to calc meter point
//     var degrees = 180 - level,
//       radius = .5;
//     var radians = degrees * Math.PI / 180;
//     var x = radius * Math.cos(radians);
//     var y = radius * Math.sin(radians);

//     // Path: may have to change to create a better triangle
//     var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
//       pathX = String(x),
//       space = ' ',
//       pathY = String(y),
//       pathEnd = ' Z';
//     var path = mainPath.concat(pathX, space, pathY, pathEnd);

//     var data = [{
//       type: 'scatter',
//       x: [0], y: [0],
//       marker: { size: 14, color: '850000' },
//       showlegend: false,
//       name: 'Washing Frequency',
//       text: level0,
//       hoverinfo: 'text+name'
//     },
//     {
//       values: [50 / 5, 50 / 5, 50 / 5, 50 / 5, 50 / 5, 50],
//       rotation: 90,
//       text: ['VERY HIGH!', 'High', 'Average', 'Low',
//         'VERY LOW!'],
//       textinfo: 'text',
//       textposition: 'inside',
//       marker: {
//         colors: ['rgba(rgba(0, 255, 0, .75)',
//           'rgba(200, 255, 150, .75)', 'rgba(255, 255, 42, .75)',
//           'rgba(255, 140, 0, .75)', 'rgba(255, 0, 0, .75)',
//           'rgba(255, 255, 255, 0)']
//       },
//       labels: ['more than 9', 'more than 6 to 8', 'more than 4 to 6', 'more than 2 to 4', '0 to 2', ''],
//       hoverinfo: 'label',
//       hole: .5,
//       type: 'pie',
//       showlegend: false
//     }];

//     var layout = {
//       shapes: [{
//         type: 'path',
//         path: path,
//         fillcolor: '850000',
//         line: {
//           color: '850000'
//         }
//       }],
//       title: '<b>Washing Frequency Gauge!</b> <br> Frequency 0-10 times/week ',
//       height: 500,
//       width: 500,
//       xaxis: {
//         zeroline: false, showticklabels: false,
//         showgrid: false, range: [-1, 1]
//       },
//       yaxis: {
//         zeroline: false, showticklabels: false,
//         showgrid: false, range: [-1, 1]
//       }
//     };

//     Plotly.newPlot('plot4', data, layout);

//   function buildCharts(sample) {

//     // @TODO: Use `d3.json` to fetch the sample data for the plots
//     // HINT: You will need to use slice() to grab the top 10 sample_values,
//     // otu_ids, and labels (10 each).
//     var fetch = `/samples/${sample}`;
//     d3.json(fetch).then(function (response) {
//       var Response = [response];
//       var otuId = response[0].otu_ids;
//       var otuLabel = response[0].otu_labels;
//       var sampleValue = response[0].sample_values;
//       var traceb = {
//         x: otuId,
//         y: sampleValue,
//         mode: "markers",
//         marker: {
//           size: sampleValue,
//           color: otuId
//         }
//       };
//       // @TODO: Build a Bubble Chart using the sample data

//       // @TODO: Build a Pie Chart
//       Plotly.d3.json(url3, function (error, pieData) {

//         var labels0 = pieData['otu_id']

//         var values0 = pieData['sample_values']

//         var data = [{
//           values: values0,
//           labels: labels0,
//           type: "pie"
//         }];

//         var layout = {
//           height: 500,
//           width: 700,
//           title: "Germ Diversity Pie Chart",
//         };
//         Plotly.newPlot("plot1", data, layout);

//       });

//     }

// function init() {
//         // Grab a reference to the dropdown select element
//         var selector = d3.select("#selDataset");

//         // Use the list of sample names to populate the select options
//         d3.json("/names").then((sampleNames) => {
//           sampleNames.forEach((sample) => {
//             selector
//               .append("option")
//               .text(sample)
//               .property("value", sample);
//           });

//           // Use the first sample from the list to build the initial plots
//           const firstSample = sampleNames[0];
//           buildCharts(firstSample);
//           buildMetadata(firstSample);
//         });
//       }

// function optionChanged(newSample) {
//         // Fetch new data each time a new sample is selected
//         buildCharts(newSample);
//         buildMetadata(newSample);
//       }

// // Initialize the dashboard
// init();

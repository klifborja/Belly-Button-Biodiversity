// BONUS: Build the Gauge Chart
Plotly.d3.json(url4, function (error, guageData) {
    var WFREQ = guageData.WFREQ;
    console.log(guageData.WFREQ);
    plotGuage(WFREQ);
});

// buildGauge(data.WFREQ);
function plotGuage(WFREQ) {

    // Enter a speed between 0 and 180
    var level0 = WFREQ;
    var level = level0 * 18

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [{
        type: 'scatter',
        x: [0], y: [0],
        marker: { size: 14, color: '850000' },
        showlegend: false,
        name: 'Washing Frequency',
        text: level0,
        hoverinfo: 'text+name'
    },
    {
        values: [50 / 5, 50 / 5, 50 / 5, 50 / 5, 50 / 5, 50],
        rotation: 90,
        text: ['VERY HIGH!', 'High', 'Average', 'Low',
            'VERY LOW!'],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
            colors: ['rgba(rgba(0, 255, 0, .75)',
                'rgba(200, 255, 150, .75)', 'rgba(255, 255, 42, .75)',
                'rgba(255, 140, 0, .75)', 'rgba(255, 0, 0, .75)',
                'rgba(255, 255, 255, 0)']
        },
        labels: ['more than 9', 'more than 6 to 8', 'more than 4 to 6', 'more than 2 to 4', '0 to 2', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
    }];

    var layout = {
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        title: '<b>Washing Frequency Gauge!</b> <br> Frequency 0-10 times/week ',
        height: 500,
        width: 500,
        xaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        },
        yaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        }
    };

    Plotly.newPlot('plot4', data, layout);

};

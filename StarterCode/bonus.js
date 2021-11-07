//build gauge chart by using javascript pie chart, resource:https://www.instructables.com/Showing-Charts-and-Gauges-of-IOT-Device-Data-Using/

var trace3 =[
    {   type: "scatter",
        x: [0], y:[0],
        marker: {size: 12, color:"darkred"},
        showlegend: false
    },  
    {   
        type: "pie",
        hole: 0.5,
        rotation: 90,
        values: [80/9, 80/9, 80/9, 80/9, 80/9, 80/9, 80/9, 80/9, 80/9, 80],
        text: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9", ""],
        direction:"clockwise",
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: ["rgba(218, 220, 219, 0.31)","rgba(218, 220, 219, 0.69)","rgba(218, 220, 183, 1)","rgba(218, 208, 0, 0.45)","rgba(133, 204, 125, 0.44)","rgba(102, 148, 56, 0.44)","rgba(41, 185, 24, 0.71)","rgba(28, 121, 18, 0.71)", "rgba(19, 79, 12, 0.71)","white"],
            // labels: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9", ""],
            // hoverinfo: "label"
        }
    },
];
var level = 2.0//adjust the angle and direction of the marker
var degrees = 180-level*20,radius = 0.5
var radians = degrees * Math.PI / 180
var x = radius * Math.cos(radians)
var y = radius * Math.sin(radians)
var mainPath = "M -.0 -0.030 L .0 0.030 L",
    pathX = String(x),
    space = " ",
    pathY = String(y),
    pathEnd = "Z"
var path = mainPath.concat(pathX,space,pathY,pathEnd)

var layout3 = {
    title: {text:"<b>Belly Button Washing Frequency</b> <br> Scrubs per Week", font:{size:18}},
    height: 500,
    width: 500,
    shapes:[{type: "path", 
        path:path,
        line:{color: 'darkred',width:6}
    }],
    
    xaxis: {
        visible: false,
        showgrid: false,
        range: [-1, 1]
    },
    yaxis: {
        visible: false,
        showgrid: false,
        range: [-1, 1]
    }
};

Plotly.newPlot("gauge", trace3, layout3);
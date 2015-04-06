// Config
var PATH_CHARTS = 'charts.json',

    DEFAULT_OPTIONS = {
      'line': {
        fillColor: "rgba(144,54,69,0.2)",
        strokeColor: "rgba(144,54,69,1)",
        pointColor: "rgba(144,54,69,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(144,54,69,1)"
      },
      'bar': {
        fillColor: "rgba(144,54,69,0.5)",
        strokeColor: "rgba(144,54,69,0.8)",
        highlightFill: "rgba(144,54,69,0.75)",
        highlightStroke: "rgba(144,54,69,1)"
      },
      'radar': {
        fillColor: "rgba(144,54,69,0.2)",
        strokeColor: "rgba(144,54,69,1)",
        pointColor: "rgba(144,54,69,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)"
      }
    };

Chart.defaults.global.animation = false;

// Get data
var jsonXHR = new XMLHttpRequest();
jsonXHR.open('GET', PATH_CHARTS);
jsonXHR.onload = function(e) {

  // Parse result
  var chartsData = JSON.parse(e.currentTarget.response);

  // Get chart num from GET param
  var num = parseInt(window.location.search.substring(1));
  if (!num) num = 0; // For testing
  chartData = chartsData[num];

  // Draw chart
  var chartDOM = document.getElementById('chart'),
      ctx = chartDOM.getContext('2d'),
      chart = new Chart(ctx);

  // Merge presets into datasets
  for (var i = 0; i < chartData.data.datasets.length; i++) {
    chartData.data.datasets[i] = merge(clone(DEFAULT_OPTIONS[chartData.type]), chartData.data.datasets[i]);
  }

  switch (chartData.type) {

    case 'line':
      chart.Line(chartData.data);
      break;

    case 'bar':
      chart.Bar(chartData.data);
      break;

    case 'radar':
      chart.Radar(chartData.data);
      break;

    default:
      console.log('Unsupported chart type');

  }
}

// Send request
jsonXHR.send();


// Utility functions
////////////////////////////////////////////////////
function merge(obj1, obj2) {
  for (var attr in obj2) {
    obj1[attr] = obj2[attr];
  }
  return obj1;
}

function clone(obj) {
  if(obj == null || typeof(obj) != 'object')
    return obj;

  var temp = obj.constructor();

  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      temp[key] = clone(obj[key]);
    }
  }
  return temp;
}
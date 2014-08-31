// config
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

// get data
var jsonXHR = new XMLHttpRequest();
jsonXHR.open('GET', PATH_CHARTS);
jsonXHR.onload = function(e) {

	// parse result
	var chartsData = JSON.parse(e.currentTarget.response);

	// get chart num from GET param
	var num = parseInt(window.location.search.substring(1));
	if (!num) num = 0; // for testing
	chartData = chartsData[num];

	// draw chart
	var chartDOM = document.getElementById('chart'),
			ctx = chartDOM.getContext('2d'),
			chart = new Chart(ctx);

	// merge presets into datasets
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

// send request
jsonXHR.send();


// utility functions
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

  var temp = obj.constructor(); // changed

  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      temp[key] = clone(obj[key]);
    }
  }
  return temp;
}
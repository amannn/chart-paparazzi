// config
var URL_RENDER = 'http://localhost:8080/',
		URL_JSON = URL_RENDER + 'charts.json',
		PATH_SCREENSHOTS = 'screenshots/',
		FILE_PREFIX = 'screenshot-',
		ID_LENGTH = 4;

var renderPage = require('webpage').create();
var jsonFile = require('webpage').create();

// prints console.log statements to console
jsonFile.onConsoleMessage = function (msg) { console.log(msg); };

jsonFile.open(URL_JSON, function () {

  var chartsData = JSON.parse(jsonFile.plainText);
  var i = 0;

	// recursively calls itslef after screenshot is made	
	function screenshotChart(num) {

  	// open webpage like localhost:8080?23
		renderPage.open(URL_RENDER + '?' + i, function(status) {

			if(status !== 'success') {
				console.log('Error loading chart at pos ' + i)
			} else {
				var fileName = FILE_PREFIX
		  		+ (new Array(ID_LENGTH - String(i).length + 1)).join('0') // prefixes with 0s
		  		+ i + '.png';

				// create screenshot
  			console.log('capturing ' + fileName);
		  	renderPage.render(PATH_SCREENSHOTS + fileName);
			}
	  	
	  	// go for the next screenshot if there is another one or exit
	  	if(i != chartsData.length - 1)
	    	screenshotChart(++i);
	    else {
	    	console.log('\n** Captured ' + (i+1) + ' screenshots **\n');
				phantom.exit();
	    }
		});
	}

	// prod first domino
	screenshotChart(i);
});
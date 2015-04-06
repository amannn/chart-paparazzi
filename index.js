// Config
var URL_RENDER = 'http://lOcalhost:8080/',
    URL_JSON = URL_RENDER + 'charts.json',
    PATH_SCREENSHOTS = 'screenshots/',
    FILE_PREFIX = 'screenshot-',
    ID_LENGTH = 4;

var renderPage = require('webpage').create();
var jsonFile = require('webpage').create();

// Prints console.log statements to console
jsonFile.onConsoleMessage = function (msg) { console.log(msg); };

jsonFile.open(URL_JSON, function () {

  var chartsData = JSON.parse(jsonFile.plainText);
  var i = 0;

  // Recursively calls itslef after screenshot is made  
  function screenshotChart(num) {

    // Open webpage like localhost:8080?23
    renderPage.open(URL_RENDER + '?' + i, function(status) {

      if(status !== 'success') {
        console.log('Error loading chart at pos ' + i)
      } else {
        var fileName = FILE_PREFIX
          + (new Array(ID_LENGTH - String(i).length + 1)).join('0') // Prefixes with 0s
          + i + '.png';

        // Create screenshot
        console.log('capturing ' + fileName);
        renderPage.render(PATH_SCREENSHOTS + fileName);
      }
      
      // Go for the next screenshot if there is another one or exit
      if(i !== chartsData.length - 1)
        screenshotChart(++i);
      else {
        console.log('\n** Captured ' + (i+1) + ' screenshots **\n');
        phantom.exit();
      }
    });
  }

  // Prod first domino
  screenshotChart(i);
});
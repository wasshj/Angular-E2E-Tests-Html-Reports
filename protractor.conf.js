exports.config = {
  directConnect: true ,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: (['--headless']) 
    }
  },
  baseUrl: 'https://testing-angular-applications.github.io',
  specs: ['e2e/**/*.e2e-spec.ts'],
  onPrepare: () => {
      let jasmineReporters = require('jasmine-reporters');
      let junitReporter = new jasmineReporters.JUnitXmlReporter({
        savePath: 'output/',
        consolidateAll: false
      });
      jasmine.getEnv().addReporter(junitReporter);
    require('ts-node').register({
      project: 'e2e'
    });

  },
  onComplete: function() {
     var browserName, browserVersion;
     var capsPromise = browser.getCapabilities();
 
     capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');
        platform = caps.get('platform');
 
        var HTMLReport = require('protractor-html-reporter-2');
 
        testConfig = {
            reportTitle: 'Protractor Test Execution Report',
            outputPath: 'output/',
            outputFilename: 'ProtractorTestReport',
            screenshotPath: './screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true,
            testPlatform: platform
        };
        new HTMLReport().from('output/junitresults-testaddingafavorite.xml', testConfig);
        new HTMLReport().from('output/junitresults-testeditacontact.xml', testConfig);
    });
 }
};

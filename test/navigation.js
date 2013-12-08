var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');

// mocha --reporter spec

test.describe('Navigation Tests', function() {
    var driver;
    
    test.beforeEach(function() {
        driver = new webdriver.Builder().
           withCapabilities(webdriver.Capabilities.chrome()).
           build();
    });
    
    test.it('should navigate from forms page to grid page and then back again', function() {
        driver.get('http://127.0.0.1/~djohn3/selenium-demo/forms.html');
        
        driver.findElement(webdriver.By.className('gridPageLink')).click();
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return title === 'Grid';
            });
        }, 1000);
        
        driver.getTitle().then(function(title) {
            assert.equal(title, 'Grid');
        });
        
        driver.findElement(webdriver.By.className('formsPageLink')).click();
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return title === 'Forms';
            });
        }, 1000);
        
        driver.getTitle().then(function(title) {
            assert.equal(title, 'Forms');
        });
    });
    
    test.afterEach(function() {
        driver.quit();
    });
});
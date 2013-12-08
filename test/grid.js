var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');

// mocha --reporter spec

test.describe('Grid Tests', function() {
    var driver;
    
    test.beforeEach(function() {
        driver = new webdriver.Builder().
           withCapabilities(webdriver.Capabilities.chrome()).
           build();
    });
    
    test.it('should load initial grid', function() {
        driver.get('http://127.0.0.1/~djohn3/selenium-demo/grid.html');
        
        driver.getTitle().then(function(title) {
            assert.equal(title, 'Grid');
        });
        
        // wait for initial grid to load
        driver.wait(function() {
            return driver.findElements(webdriver.By.css('tbody tr')).then(function(elements) {
                return elements.length === 3;
            });
        }, 5000);
        
        // test sample data from each row
        driver.findElement(webdriver.By.css('tbody tr:nth-child(1) td:nth-child(1)')).getText().then(function(text) {
            assert.equal(text, '1');
        });
        
        driver.findElement(webdriver.By.css('tbody tr:nth-child(2) td:nth-child(2)')).getText().then(function(text) {
            assert.equal(text, 'Ella');
        });
        
        driver.findElement(webdriver.By.css('tbody tr:nth-child(3) td:nth-child(3)')).getText().then(function(text) {
            assert.equal(text, 'Johnson');
        });
    });
    
    test.it('should refresh grid', function() {
        driver.get('http://127.0.0.1/~djohn3/selenium-demo/grid.html');
        
        driver.getTitle().then(function(title) {
            assert.equal(title, 'Grid');
        });
        
        // wait for initial grid to load
        driver.wait(function() {
            return driver.findElements(webdriver.By.css('tbody tr')).then(function(elements) {
                return elements.length === 3;
            });
        }, 5000);
        
        // click refresh link
        driver.findElement(webdriver.By.id('refreshGrid')).click();
        
        // wait for new data to be loaded into grid
        driver.wait(function() {
            return driver.findElements(webdriver.By.css('tbody tr')).then(function(elements) {
                return elements.length === 4;
            });
        }, 5000);
        
        // test sample data in the row
        driver.findElement(webdriver.By.css('tbody tr:nth-child(4) td:nth-child(1)')).getText().then(function(text) {
            assert.equal(text, '4');
        });
    });
    
    test.afterEach(function() {
        driver.quit();
    });
});
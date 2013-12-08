var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');

// mocha --reporter spec

test.describe('Forms Page', function() {
    var driver;
    
    test.beforeEach(function() {
        driver = new webdriver.Builder().
           withCapabilities(webdriver.Capabilities.chrome()).
           build();
    });
    
    test.it('name form should set displayName field', function() {
        driver.get('http://127.0.0.1/~djohn3/selenium-demo/forms.html');
        
        var firstNameField = driver.findElement(webdriver.By.name('firstName'));
        firstNameField.sendKeys('Dan');
        firstNameField.getAttribute("value").then(function(value) {
            assert.equal(value, 'Dan');
        });
        
        var lastNameField = driver.findElement(webdriver.By.name('lastName'));
        lastNameField.sendKeys('Johnson');
        lastNameField.getAttribute("value").then(function(value) {
            assert.equal(value, 'Johnson');
        });
    
        driver.findElement(webdriver.By.id('nameForm')).submit();
        
        driver.findElement(webdriver.By.id('displayName')).getText().then(function(value) {
            assert.equal(value, 'Dan Johnson');
        });
    });
    
    test.it('color form should set displayColor field', function() {
        driver.get('http://127.0.0.1/~djohn3/selenium-demo/forms.html');
        
        driver.findElement(webdriver.By.name('color')).click();
        
        driver.findElement(webdriver.By.xpath('//select[@name="color"]/option[@value="red"]')).click();
        
        driver.findElement(webdriver.By.id('colorForm')).submit();
        
        driver.findElement(webdriver.By.id('displayColor')).getText().then(function(value) {
            assert.equal(value, 'red');
        });
    });
    
    test.it('should not allow contact form to be submitted with blank email', function() {
        driver.get('http://127.0.0.1/~djohn3/selenium-demo/forms.html');
        
        // submit empty form
        driver.findElement(webdriver.By.id('contactForm')).submit();
        
        // check that we are still on the forms page
        driver.getTitle().then(function(title) {
            assert.equal(title, 'Forms');
        });
        
        // another way to check that we are still on the forms page
        driver.getCurrentUrl().then(function(url) {
            assert.equal(url, 'http://127.0.0.1/~djohn3/selenium-demo/forms.html');
        });
        
        // wait for error box to fade in
        driver.wait(function() {
            return driver.executeScript('return $("#formErrors").is(":animated")').then(function(result) {
                return result === false;
            });
        }, 3000); // set to 3 seconds because the animation takes 2 seconds
                
        // check that first validation message is present
        driver.isElementPresent(webdriver.By.css('#formErrors .alertContent span:first-child')).then(function(present) {
            assert.equal(present, true);
        });
        
        // check length of validation messages
        driver.findElements(webdriver.By.xpath('//div[@class="alertContent"]/span')).then(function(elements) {
            assert.equal(elements.length, 1);
        });
        
        // check content of first validation message
        driver.findElement(webdriver.By.xpath('//div[@class="alertContent"]/span[1]')).getText().then(function(value) {
            assert.equal(value, 'Please fill in all required fields!');
        });
    });
    
    test.afterEach(function() {
        driver.quit();
    });
});
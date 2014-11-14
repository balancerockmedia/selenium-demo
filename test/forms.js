var webdriverio = require('webdriverio');
var assert = require('assert');

var client = {};

describe('Forms Page', function() {
    this.timeout(99999999);

    beforeEach(function(done) {
        client = webdriverio.remote({
            desiredCapabilities: {
                browserName: 'phantomjs'
            }
        });

        client.init();

        client.setViewportSize({
            width: 1024,
            height: 768
        });

        done();
    });

    it('name form should set displayName field', function(done) {
        client
            .url('http://127.0.0.1/~djohn3/selenium-demo/forms.html')
 
            .setValue('#nameForm input[name="firstName"]', 'Dan')
            .getValue('#nameForm input[name="firstName"]', function(err, value) {
                assert(value === 'Dan');
            })

            .setValue('#nameForm input[name="lastName"]', 'Johnson')
            .getValue('#nameForm input[name="lastName"]', function(err, value) {
                assert(value === 'Johnson');
            })

            .submitForm('#nameForm')

            .getText('#displayName', function(err, text) {
                assert.equal(text, 'Dan Johnson');
            })

            .call(done);
    });

    it('color form should set displayColor field', function(done) {
        client
            .url('http://127.0.0.1/~djohn3/selenium-demo/forms.html')

            .selectByValue('[name="color"]', 'red')

            .submitForm('#colorForm')

            .getText('#displayColor', function(err, text) {
                assert.equal(text, 'red');
            })

            .call(done);
    });

    it('should not allow contact form to be submitted with blank email', function(done) {
        client
            .url('http://127.0.0.1/~djohn3/selenium-demo/forms.html')

            // submit empty form
            .submitForm('#contactForm')

            // check that we are still on the forms page
            .getTitle(function(err, title) {
                assert.equal(title, 'Forms');
            })

            // pause 3 seconds because the error box animation takes 2 seconds
            .pause(3000)

            // check that first validation message is present
            .isExisting('#formErrors .alertContent span:first-child')

            // check length of validation messages
            .elements('#formErrors .alertContent span', function(err, els) {
                assert.equal(els.value.length, 1);
            })

            // check content of first validation message
            .getText('//div[@class="alertContent"]/span[1]', function(err, text) {
                assert.equal(text, 'Please fill in all required fields!');
            })

            .call(done);
    });

    afterEach(function(done) {
        client.end(done);
    });
});

const URL = "https://qa-engineer.herokuapp.com"

let EC = protractor.ExpectedConditions;

describe('QA Engineer Test', function() {

    beforeAll(function() {
        browser.ignoreSynchronization = true;
        browser.get(URL);
    });

    it('reach code page via Enter button, then lists page', () => 
    {
        let timeout = 3000;

        browser.wait(EC.textToBePresentInElement(browser.$('#enter'), "Enter"),  timeout,  'Expect to find button with Enter as text');
        browser.$('#enter').click();
        browser.wait(EC.urlIs('https://qa-engineer.herokuapp.com/code'), timeout);
        browser.$('input[type="hidden"]').getAttribute("value").then(function (valuex) {
            browser.$('input[type="text"]').sendKeys(valuex);
        }); 
        
        element(by.buttonText('Submit')).click();
        browser.wait(EC.urlIs('https://qa-engineer.herokuapp.com/lists'), timeout);
    });


    it('should verify quotes and categories', () => {
        let scores = $$('.score').getText().then(() => {
            console.log(scores);
        });
    });


});
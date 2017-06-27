const URL = "https://qa-engineer.herokuapp.com"

let EC = protractor.ExpectedConditions;

describe('QA Engineer Test', function() {

    beforeAll(function() {
        browser.ignoreSynchronization = true;
        browser.get(URL);
    });

    it('reach code page via Enter button, then lists page', () => {
        let timeout = 3000;

        browser.wait(EC.textToBePresentInElement(browser.$('#enter'), "Enter"), timeout, 'Expect to find button with Enter as text');
        browser.$('#enter').click();
        browser.wait(EC.urlIs('https://qa-engineer.herokuapp.com/code'), timeout);
        browser.$('input[type="hidden"]').getAttribute("value").then(function(valuex) {
            browser.$('input[type="text"]').sendKeys(valuex);
        });

        browser.$('input[type="checkbox"]').click();

        element(by.buttonText('Submit')).click();
        browser.wait(EC.urlIs('https://qa-engineer.herokuapp.com/lists'), timeout);
    });


    it('should verify quotes and categories', () => {

        let timeout = 3000;

        const famousQuotesToAssert = [
            `A classic is something that everyone wants to have read and nobody wants to read.`,
            `If your life was a horse, you'd have to shoot it.`,
            `You have taken yourself too seriously.`,
            `Yes there is a lot of people doing a great job out there.`,
            `You have the capacity to learn from mistakes. You'll learn a lot today.`
        ]

        const awesomeQuotesToAssert = [
            `Beware of low-flying butterflies.`,
            `Excellent time to become a missing person.`,
            `I love deadlines. I love the whooshing sound they make as they fly by.`,
            `Nothing so needs reforming as other people's habits.`,
            `Do something unusual today. Pay a bill.`
        ]


        let famousQuotesBlock = element(by.cssContainingText('body>ul>li', 'Famous Quotes'))
        browser.wait(EC.visibilityOf(famousQuotesBlock), timeout);
        let famousQuotes = famousQuotesBlock.$$('ul>li span:not(.score)').getText().then((texts) => {

            expect(texts.length).toEqual(5);

            texts.map((quote) => {
                expect(famousQuotesToAssert.indexOf(quote)).not.toEqual(-1);
            });
        });


        let awesomeQuotesBlock = element(by.cssContainingText('body>ul>li', 'Awesome Quotes'))
        browser.wait(EC.visibilityOf(famousQuotesBlock), timeout);
        let awesomeQuotes = awesomeQuotesBlock.$$('ul>li span:not(.score)').getText().then((texts) => {

            expect(texts.length).toEqual(5);

            texts.map((quote) => {
                expect(awesomeQuotesToAssert.indexOf(quote)).not.toEqual(-1);
            });
        });


        // checking the sum
        let scoresSumm = $$('span.score').getText().then(texts => {
            return texts.reduce((total, num) => { return (+total) + (+num) });
        })

        let totalScore = $('body').getText().then(text => {
            let matched = /Total score: (.*)/gm.exec(text)
            return +matched[1]
        })


    });

});

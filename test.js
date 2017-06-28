const URL_code = "https://qa-engineer.herokuapp.com/code"
const URL_lists = "https://qa-engineer.herokuapp.com/lists"
const timeout = 3000;
const numofQuotes = 5;

let EC = protractor.ExpectedConditions;

// this function asserts that the quotes are all present in the page (famous and awesome): it's called twice
let checkQuotes = (quotesType, QuotesToAssert) => {
    let QuotesBlock = element(by.cssContainingText('body>ul>li', quotesType))
    browser.wait(EC.visibilityOf(QuotesBlock), timeout, 'quotes display correctly');
    let Quotes = QuotesBlock.$$('ul>li span:not(.score)').getText().then((texts) => {
        expect(texts.length).toEqual(numofQuotes, 'number of quotes is not correct');
        QuotesToAssert.map((quote) => {
            expect(texts.indexOf(quote)).not.toEqual(-1, `The following quote did NOT appear among the ${quotesType}: \n ${quote} `);
        });
    });
}


describe('QA Engineer Test', function() {

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

    beforeAll(function() {
        browser.ignoreSynchronization = true;
        browser.get(URL);
    });


    it('should verify quotes and categories', () => {
        browser.wait(EC.textToBePresentInElement($('#enter'), "Enter"), timeout, 'Expect to find button with Enter as text');
        $('#enter').click();
        browser.wait(EC.urlIs(URL_code), timeout, 'URL did not match the expected one /code');
        $('input[type="hidden"]').getAttribute("value").then(function(valuex) {
            $('input[type="text"]').sendKeys(valuex);
        });

        let checkbox = $('input[type="checkbox"]');
        checkbox.isSelected().then(selected=> {
            if (selected){
                checkbox.click();
            }
        })

        element(by.buttonText('Submit')).click();
        browser.wait(EC.urlIs(URL_lists), timeout, 'URL did not match the expected one /lists');

        checkQuotes('Awesome Quotes', awesomeQuotesToAssert);
        checkQuotes('Famous Quotes', famousQuotesToAssert);

        // checking the sum of all scores next to each quote
        let scoresSumm = $$('span.score').getText().then(texts => {
            return texts.reduce((total, num) => { return (+total) + (+num) });
        })

        // getting the value of Total Score as a number - using regexes 
        let totalScore = $('body').getText().then(text => {
            let matched = /Total score: (.*)/gm.exec(text)
            return +matched[1]
        })

        // checking that total Scores actually matches the sum of all scores
        expect(totalScore).toBe(scoresSumm, '<total score> does NOT match with the sum of scores')
    });

});

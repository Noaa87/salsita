exports.config = {
  baseUrl: "https://qa-engineer.herokuapp.com",
  framework: 'jasmine',
  specs: ['test.js'],
  multiCapabilities: [{
    browserName: 'chrome'
  }],
  // using browser driver directly
  directConnect: 'true'
}

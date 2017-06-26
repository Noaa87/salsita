exports.config = {
  framework: 'jasmine',
  specs: ['test.js'],
  multiCapabilities: [{
    browserName: 'chrome'
  }],
  // using browser driver directly
  directConnect: 'true'
  // onPrepare: function() 
  // {
  // }
}
jest.dontMock('../stores/Article');

describe('test json data',function(){
  it('test',function(){
    var Article = require('../stores/Article')
    console.log("doctorq");
    Article.toJSON();

  });

});

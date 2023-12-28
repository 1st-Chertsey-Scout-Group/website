const Root = require("./models/root");

module.exports = {
  all: function(articles){
    let root = new Root().WithArticles(articles);
    return root;
  },
  transformYear: function(articles){
    let root = new Root().WithArticles(articles);
    return root.ByYear();
  },
  transformMonth: function(articles){
    let root = new Root().WithArticles(articles);
    return root.ByMonth();
  },
  transformDay: function(articles){
    let root = new Root().WithArticles(articles);
    return root.ByDay();
  }
}
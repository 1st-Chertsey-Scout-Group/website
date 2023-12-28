module.exports = class Base {
  constructor() {}

  articles;
  WithArticles(val) {
    this.articles = val;
    return this;
  }

  toJSON() {
    return {
      articles: this.articles,
    };
  }
};

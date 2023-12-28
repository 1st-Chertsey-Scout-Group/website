const { GroupBy } = require("../../utils/group-by");
const Base = require("./base");
const Day = require("./day");
const Month = require("./month");
const Year = require("./year");

module.exports = class Root extends Base {

    sort(col) {
      this.articles = this.articles.sort((a, b) => {
        if (a[col] > b[col]) {
          return -1;
        } else if (b[col] > a[col]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  
    ByDay() {
      let dates = [];
  
      let groups = GroupBy(this.articles, "date");
      for (const key in groups) {
        if (Object.hasOwnProperty.call(groups, key)) {
          const arr = groups[key];
  
          if (arr.length > 0) {
            let day = new Day()
              .WithDay(arr[0].date.getDate())
              .WithMonth(arr[0].date.getMonth() + 1)
              .WithYear(arr[0].date.getFullYear())
              .WithArticles(arr);
  
            dates.push(day);
          }
        }
      }
  
      return dates;
    }
  
    ByMonth() {
      let output = [];
  
      var groups = this.articles.reduce(function (rv, x) {
        (rv[x.date.getFullYear() + "-" + (x.date.getMonth() + 1)] =
          rv[x.date.getFullYear() + "-" + (x.date.getMonth() + 1)] ||
          []).push(x);
        return rv;
      }, {});
  
      for (const key in groups) {
        if (Object.hasOwnProperty.call(groups, key)) {
          let articles = groups[key];
    
          let month = new Month()
            .WithYear(key.split("-")[0])
            .WithMonth(key.split("-")[1])
            .WithArticles(articles);
  
          output.push(month);
        }
      }
  
      return output;
    }
  
    ByYear() {
      let output = [];
  
      var groups = this.articles.reduce(function (rv, x) {
        (rv[x.date.getFullYear()] = rv[x.date.getFullYear()] || []).push(x);
        return rv;
      }, {});
  
      for (const key in groups) {
        if (Object.hasOwnProperty.call(groups, key)) {
          let articles = groups[key];
    
          let year = new Year().WithYear(key).WithArticles(articles);
  
          output.push(year);
        }
      }
  
      return output;
    }  
  };
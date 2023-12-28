const Month = require("./month");

module.exports = class Day extends Month {
    constructor() {
      super();
    }
  
    day;
    WithDay(val) {
      if (val) {
        this.day = parseInt(("0" + val).slice(-2));
      }
      return this;
    }
  
    get date(){
      return new Date(this.year, (this.month - 1), this.day);
    }
  
    toJSON() {
      let obj = super.toJSON();
  
      obj["day"] = this.day;
      obj["date"] = this.date;
  
      return obj;
    }
  };
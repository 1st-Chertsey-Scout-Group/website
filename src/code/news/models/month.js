const Year = require("./year");

module.exports = class Month extends Year {
    constructor() {
      super();
    }
  
    month;
    WithMonth(val) {
      if (val) {
        this.month = parseInt(("0" + val).slice(-2));
      }
      return this;
    }
  
    toJSON() {
      let obj = super.toJSON();
  
      obj["month"] = this.month;
  
      return obj;
    }
  };
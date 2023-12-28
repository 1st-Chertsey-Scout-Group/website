const Base = require("./base");

module.exports = class Year extends Base {
    constructor() {
      super()
    }
  
    year;
    WithYear(val) {
      this.year = parseInt(val);
      return this;
    }
    
    toJSON() {
      let obj = super.toJSON();
  
      obj["year"] = this.year;
  
      return obj;
    }
}
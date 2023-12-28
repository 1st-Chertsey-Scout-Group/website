const pad = require("./pad.filter");

module.exports = function(value){

    let year = value.getFullYear();
    let month = (value.getMonth() + 1);
    let day = value.getDate();

    return `news-${year}-${pad(month)}-${day}`;
}
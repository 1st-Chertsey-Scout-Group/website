const dateFormat = require('dateformat');

module.exports = function(value, format) {
    var date;

    if (value instanceof Date) {
        date = value;
    } else {
        date = new Date(value);
    }

    return dateFormat(date, format);
}
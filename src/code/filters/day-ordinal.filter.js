module.exports = function(value){
    if (value > 3 && value < 21) return 'th';
    switch (value % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
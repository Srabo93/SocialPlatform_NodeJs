const { convert } = require("html-to-text");

module.exports = {
  formatDate: function (date) {
    return new Date(date).toDateString();
  },
  stripString: function (string) {
    const truncate = convert(string, {
      limits: { maxInputLength: 200 },
    });
    console.log(truncate.length);
    return truncate.length >= 165 ? truncate + "..." : truncate;
  },
};

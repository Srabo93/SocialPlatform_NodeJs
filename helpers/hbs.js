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
  editIcon: function (storyUser, loggedUser, storyId, floating = true) {
    if (storyUser._id.toString() === loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return "";
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</options"),
        ' selected="selected"$&'
      );
  },
};

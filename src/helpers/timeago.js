/*  */
/* para convertir las fechas a una mas clasica  */
const timeago = require("timeago.js");

const timeMod = {};

timeMod.timeago = (timestamp) => {
  return timeago.format(timestamp);
};

module.exports = timeMod;

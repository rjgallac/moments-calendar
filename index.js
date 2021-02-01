const googleAuth = require('./google-auth');
const {getBookable, getBooked} = require("./google-calendar-function");
const {splitSlots, removeConflicts} = require("./slot-util");

googleAuth.login()
.then(auth => Promise.all([getBookable(auth), getBooked(auth)])
.then(data => {
  console.log(removeConflicts(splitSlots(data[0]), data[1]));
}));  

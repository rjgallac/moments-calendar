const googleAuth = require('./google-auth');
const {getBookable, getBooked} = require("./google-calendar-function");
const {splitSlots, removeConflicts} = require("./slot-util");

var authen;
googleAuth.login()
.then(auth =>{
  authen = auth
  return getBookable(auth);
})
.then(bookableSlots => {
  slots = splitSlots(bookableSlots);
  getBooked(authen)
  .then(bookedData =>{
    console.log(slots)

    console.log(bookedData);
    const results = removeConflicts(slots, bookedData)
    console.log(results)
  })
});  

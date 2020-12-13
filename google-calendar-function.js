const {bookableSlotConfig, bookedSlotConfig} = require('./config.js')
const {google} = require('googleapis');


function getBookable(auth) {
  return new Promise((resolve, reject) => {
    const calendar = google.calendar({version: 'v3', auth});
    bookableSlotConfig.auth = auth;
    calendar.events.list(bookableSlotConfig, (err, res) => {
      if (err){
        console.log(err);
        return reject();
      }
      var bookableSlots = [];
      const events = res.data.items;
      if (events.length) {
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          bookableSlots.push({'start':event.start.dateTime, 'end': event.end.dateTime})
        });
        resolve(bookableSlots);
      } else {
        console.log('No upcoming events found.');
      }
    });
  })
}

function getBooked(auth) {
  return new Promise((resolve, reject) => {
    var bookedSlots = [];
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list(bookedSlotConfig, (err, res) => {
      if (err){
        console.log(err)
        return reject();
      } 
      const events = res.data.items;
      if (events.length) {
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          bookedSlots.push({'start':event.start.dateTime, 'end': event.end.dateTime})  
        });
        resolve(bookedSlots)
      } else {
        console.log('No upcoming events found.');
      }
    });
  })
}

module.exports = {getBookable, getBooked}
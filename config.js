const bookableSlotConfig = {
    calendarId: 's6pcf6q5u4jevd2a4f8ctc6m94@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: 'startTime',
}

const bookedSlotConfig = {
    calendarId: 'rltrvkru5so57skps3j876dscs@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: 'startTime',
  }

module.exports = {bookableSlotConfig, bookedSlotConfig}
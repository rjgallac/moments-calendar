const fs = require('fs');
const {google} = require('googleapis');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let jwtClient = new google.auth.JWT(
    process.env.client_email,
    null,
    process.env.private_key.replace(/\\n/gm, '\n'),
    ['https://www.googleapis.com/auth/calendar']); 

exports.login = function() {
    return new Promise((resolve, reject) => {
        jwtClient.authorize(function (err, tokens) {
            if (err) {
              console.log(err);
              reject();
            } else {
              console.log("Successfully connected!");
              resolve(jwtClient);
            }
           });
    })
}
  
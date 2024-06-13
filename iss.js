/*
* Makes a single API request to retrieve the user's IP address
* Input:
* - A callback (to pass an error or the Ip string)
* Returns (via callback):
* -an error, if any (nullable)
* -the IP address as a string (null if error). Example: "162.245.144.188"
*/
const needle = require("needle");

const fetchMyIP = function(callback) {
  //use request to fetch IP address from JSON API
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
     return callback(error, null);
     }
    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //if all is good, get ip address
    const ip = body.ip;
    callback(null, ip);
  });
};
  
//export
module.exports = { fetchMyIP }
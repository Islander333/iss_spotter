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

///////

const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    //check if 'success' is true or not
    if (!body.success) {
      const message = `success status was ${body.success}. Server says ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }
    //if all good, get latitude and longitude
    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});
  });
};


/////////

const fetchISSFlyOverTimes = function(coords, callback) {
  //get url for api request with coordinates lat and lon
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  //make htt get request
  needle.get(url, (error, response, body) => {
    //check for error with request, if error, pass error to callback
    if (error) {
      return callback(error, null);
    }
    //if status code not 200, make error msg and pass it to callback
    if (response.statusCode !== 200) {
      
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    
    const passes = body.response;
    callback(null, passes);
  });
};
  
//export
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

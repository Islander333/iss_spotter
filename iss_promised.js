const needle = require('needle');

//fetchMyIP
const fetchMyIP = function() {
return needle('get', 'https://api.ipify.org?format=json')
.then((response) => {
  const body = response.body; //retrieve the body value from the response object
  const ip = body.ip; //retrieve the ip from the body object
  return ip;
});
};

//fetchCoordsByIP
const fetchCoordsByIP = function(ip) {
return needle('get',`http://ipwho.is/${ip}`)
.then((response) => {
  const body = response.body; //get body from response
  const latitude = body.latitude; // retrieve latitude from body
  const longitude = body.longitude; //get longitude from body
  return {latitude, longitude};
});
};

const fetchISSFlyOverTimes = function(coords) {
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
  .then((response) => {
    const body = response.body;
    const passes = body.response;
    return passes;

  });
};

//nextISSTimesForMyLocation
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then((ip) => fetchCoordsByIP(ip))
  .then((coords) => fetchISSFlyOverTimes(coords))
  .then((passes) => {
    return passes;
  });
};

module.exports = { nextISSTimesForMyLocation };


/*const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss_promised")

fetchMyIP()
.then((ip) => fetchCoordsByIP(ip))
.then((coords) => fetchISSFlyOverTimes(coords))
.then(body => console.log(body));*/

const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');

nextISSTimesForMyLocation()
.then((passes) => {
  printPassTimes(passes);
})
/*.catch((error) => {
  console.log("it didn't work: ", error.message);
});*/
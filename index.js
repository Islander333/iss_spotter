const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");


fetchMyIP((error, ip) => {
  if (error) {
    console.log("it didn't work!", error);
    return;
  }
  console.log('it worked! returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("it didn't work!", error);
      return;
    }
    console.log("it worked! returned coordinates:", coords);

    fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
      if (error) {
        console.log("it didn't work!", error);
        return;
      }
      console.log("it worked! returned ISS flyover times:", flyOverTimes);
    });
  });
});
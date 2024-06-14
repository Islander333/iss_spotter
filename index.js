/*const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");


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
  });*/

  const { nextISSTimesForMyLocation } = require("./iss");

  const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };

  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    printPassTimes(passTimes);
  });




const { fetchCoordsByIP, fetchMyIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    //console.log("It didn't work!" , error);
    return;
  }

  //console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIP('192.80.166.158', (error, coordinates) => {
  if (error) {
    // console.log("It didn't work!" , error);
    return;
  }

  //console.log('It worked! Returned coordinates:' , coordinates);
});

fetchISSFlyOverTimes({ latitude: '49.oou', longitude: '-123.13000' }, (error, passTimes) => {
  if (error) {
    //console.log("It didn't work!" , error);
    return;
  }
  //console.log('It worked! Returned flyover times:' , passTimes);
});
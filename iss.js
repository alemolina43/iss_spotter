const needle = require('needle');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  
  needle.get(url, (error, response, body) => {
    if (error) return callback(error, null);
   
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching your IP`), null);
      return;
    }

    callback(null, body.ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  const url = 'http://ipwho.is/';
  
  needle.get(url + ip, (error, response, body) => {
    //console.log(error);
    //invalid domain, user offline, etc.
    if (error) return callback(error, null);
   
    // parse the returned body so we can check its information
    //const parsedBody = JSON.parse(body);
    if (!body.success || !body.latitude || !body.longitude) {
      callback(Error(`The transaction was not succesful`), null);
      return;
    }
    
    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  needle.get(url, (error, response, body) => {
    //console.log(error);
    //invalid domain, user offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // parse the returned body so we can check its information
    // const parsedBody = JSON.parse(body);
    // console.log(parsedBody);
    if (response.statusCode !== 200) {
      callback(Error(`Something went wrong check your coordinates`), null);
      return;
    }
    
    //const parsedBody = JSON.parse(body);
    callback(null, body.response);
  });
};

// * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
//  * Input:
//  *   - A callback with an error or results.
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The fly-over times as an array (null if error):
//  *     [ { risetime: <number>, duration: <number> }, ... ]
//  */

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};

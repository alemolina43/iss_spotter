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
  //'http://ipwho.is/192.80.166.158';
  
  needle.get(url + ip, (error, response, body) => {
    console.log(error);
    //invalid domain, user offline, etc.
    if (error) return callback(error, null);
   
    // parse the returned body so we can check its information
    //const parsedBody = JSON.parse(body);
    if (!body.success) {
      callback(Error(`The transaction was not succesful`), null);
      return;
    }
    
    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};

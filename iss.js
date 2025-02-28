const { error } = require('console');
const needle = require('needle');
const { callbackify } = require('util');
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
    //console.log(body);
    //console.log(error);
    if (error) return callback(error, null);
   
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    callback(null, body.ip);
  });
};

module.exports = { fetchMyIP };

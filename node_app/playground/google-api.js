const request = require('request');

/* start of the User Schema */
let user = {
  username: 'jayceazua',
  password: 'someHashPassword',
  firstName: 'Jayce',
  lastName: 'Azua',
  fullName () {
    return `${this.firstName} ${this.lastName}`
  },
  location: {
    address: '',
    city: '',
    state: '',
    zipcode: 10012
  },
  // this can be a prototype method for the user schema object
  fullAddress () {
    return `${this.location.address} ${this.location.city} ${this.location.state} ${this.location.zipcode}`
  }
}
/* end of the User Schema */

// This belongs in a Google Maps API Function module with the request npm package
const geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback('Unable to connect to Google servers.')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  });
}

/* demo function invoke */
geocodeAddress(user.fullAddress(), (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});

module.exports.geocodeAddress = geocodeAddress;

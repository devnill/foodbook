var readline = require('readline');

var googleapis = require('./lib/googleapis.js');
var OAuth2Client = googleapis.OAuth2Client;

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '582161825818.apps.googleusercontent.com';
var CLIENT_SECRET = 'yLLetsTg9xb9DSyNaVqHllsA';
var REDIRECT_URL = 'http://haveidoneit.com:8080/o';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken(oauth2Client, callback) {
  // generate consent page url
    var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/plus.me'
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function(code) {

    // request access token
    oauth2Client.getToken(code, function(err, tokens) {
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.credentials = tokens;
      callback && callback();
    });
  });
}

function getUserProfile(client, authClient, userId, callback) {
  client
    .plus.people.get({ userId: userId })
    .withAuthClient(authClient)
    .execute(callback);
}

function printUserProfile(err, profile) {
  if (err) {
    console.log('An error occurred');
  } else {
    console.log(profile.displayName, ':', profile.tagline);
  }
}

// load google plus v1 API resources and methods
googleapis
  .discover('plus', 'v1')
  .execute(function(err, client) {

  var oauth2Client =
    new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

  // retrieve an access token
  getAccessToken(oauth2Client, function() {
    // retrieve user profile
    getUserProfile(
      client, oauth2Client, 'me', printUserProfile);
  });

});
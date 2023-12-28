require("dotenv").config();
var ClientOAuth2 = require("client-oauth2");
const https = require("https");

var githubAuth = new ClientOAuth2({
  clientId: process.env.OSMClientId,
  clientSecret: process.env.OSMSecret,
  accessTokenUri: "https://www.onlinescoutmanager.co.uk/oauth/token",
  authorizationUri: "https://www.onlinescoutmanager.co.uk/oauth/authorize",
  redirectUri: "http://example.com/auth/github/callback",
  scopes: ["section:programme:read"],
});

githubAuth.credentials.getToken().then(function (user) {
  console.log(user.accessToken); //=> { accessToken: '...', tokenType: 'bearer', ... }

  const options = {
    hostname: "onlinescoutmanager.co.uk",
    port: 443,
    path: "",
    method: "GET",
  };

  


});

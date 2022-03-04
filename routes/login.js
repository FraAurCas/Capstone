var express = require('express');

const msal = require('@azure/msal-node');

var router = express.Router();



const config = {
  auth: {
      clientId: "2af32e58-e3c3-4bc4-a55a-e5ec1404f24a",
      authority: "https://login.microsoftonline.com/common",
      clientSecret: "arg7Q~5BhT6UTnA.UA9ouqp4h205ucLG48kaC"
  },
  system: {
      loggerOptions: {
          loggerCallback(loglevel, message, containsPii) {
              console.log(message);
          },
          piiLoggingEnabled: false,
          logLevel: msal.LogLevel.Verbose,
      }
  }
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);

router.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});
router.get('/login', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/login",
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});

  
  
module.exports = router;
var express = require('express');

const msal = require('@azure/msal-node');

var router = express.Router();

const REDIRECT_URI = "http://localhost:3000/main";
const SERVER_PORT = process.env.PORT || 3000;

const config = {
    auth: {
        clientId: "05dc3d66-2ef1-4682-93f4-6958136fee95", //05dc3d66-2ef1-4682-93f4-6958136fee95
        authority: "https://login.microsoftonline.com/32dd5fb3-e39e-467b-9c11-83929dcd4a1c/",
        clientSecret: "Xrs7Q~IuUSFFJlVgdjLkBEPGq6sM6RKRdyNMn"
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
const app = express();
router.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: REDIRECT_URI,
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});
// router.get('/login', (req, res) => {
//     const tokenRequest = {
//         code: req.query.code,
//         scopes: ["user.read"],
//         redirectUri: "http://localhost:3000/login",
//     };

//     cca.acquireTokenByCode(tokenRequest).then((response) => {
//         console.log("\nResponse: \n:", response);
//         res.sendStatus(200);
//     }).catch((error) => {
//         console.log(error);
//         res.status(500).send(error);
//     });
// });
router.get('/redirect', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: REDIRECT_URI,
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
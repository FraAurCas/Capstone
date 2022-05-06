var google = require('googleapis')
var keys = require('../data/oauth_keys.json');

const GOOGLE_CLIENT_ID = keys.web.client_id;
const GOOGLE_CLIENT_SECRET = keys.web.client_secret;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    /*
     * This is where Google will redirect the user after they
     * give permission to your application
     */
    "https://localhost:5000/main"
);


function getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes, // If you only need one scope you can pass it as string
    });
}
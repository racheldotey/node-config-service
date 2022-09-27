// NOTE: Should be placed as early as possible on startup.
var wasInitialized;

// Loads environment variables from a .env file into process.env. 
// https://www.npmjs.com/package/dotenv
if (!wasInitialized) {
    console.count('dotenv wasInitialized');
    require('dotenv').config();
    wasInitialized = true;
}
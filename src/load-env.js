// NOTE: Should be placed as early as possible on startup.
var wasConfigured;

// Loads environment variables from a .env file into process.env. 
// https://www.npmjs.com/package/dotenv
if(!wasConfigured) require('dotenv').config();

wasConfigured = true;
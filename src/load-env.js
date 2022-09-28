// NOTE: Should be placed as early as possible on startup.
// Loads environment variables from a .env file into process.env. 
// https://www.npmjs.com/package/dotenv
console.count('dotenv wasInitialized');
require('dotenv').config();

module.exports = process.env;
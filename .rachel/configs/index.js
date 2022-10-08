const fs = require('fs-extra');

// Get all folders in configs

// In each folder
// Does it have index?
// No: copy all files as is
// Yes: use module exports [{ file-name: <Buffer?> }]
// Does it have a package.json?
// No: n/a
// Yes: Merge it with others
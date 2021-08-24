const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.isPassword = false;

readline._writeToOutput = function _writeToOutput(stringToWrite) {
  if (!readline.isPassword) readline.output.write(stringToWrite);
};

module.exports = readline;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.isPassword = false;

readline._writeToOutput = (stringToWrite: string) => {
  if (!readline.isPassword) readline.output.write(stringToWrite);
};

module.exports = readline;

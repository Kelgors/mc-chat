// Command-Line Arguments
const { Command } = require('commander');
const program = new Command();
program
  .option('-d, --debug', 'Output json text message')
  .requiredOption('-h, --host <host>', 'Specify the Minecraft IP server')
  .option('-p, --port <port>', 'Specify the Minecraft port used by the server', 25565)
  .requiredOption('-u, --user <user>', 'Minecraft account email')
  .option('-t, --type <type>', 'Type of account (mojang|microsoft)', 'mojang')
  .option('-P, --password <password>', 'Minecraft account password');
program.parse(process.argv);
// Prepare client & console
const chalk = require('chalk');
const MC = require('minecraft-protocol');
const ChatComponents = require('./ChatComponents');
const readline = require('./readline.js')
// Check for password
const options = program.opts();
// Ask for password if not given
if (!options.password) {
  readline.question('Minecraft password: ', function (password) {
    options.password = password;
    readline.isPassword = false;
    readline.output.write('\n');
    run();
  });
  readline.isPassword = true;
} else {
  run();
}

function run() {
  const DEBUG = options.debug;
  // create connection
  console.log(`Connecting to ${chalk.cyan(options.host)}:${chalk.green(options.port)}...`);
  const client = MC.createClient({
    host: options.host,
    port: options.port,
    username: options.user,
    password: options.password,
    auth: options.type,
    profilesFolder: false,
  });
  // wait for chat message to log
  client.on('chat', function (packet) {
    const jsonMsg = JSON.parse(packet.message);
    if (DEBUG) console.log(JSON.stringify(jsonMsg));
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(ChatComponents.fromJson(jsonMsg).toString());
    readline.prompt(true);
  });
  // wait for message input
  readline.on('line', function (text) {
    if (text === 'exit') {
      process.exit();
    } else if (text.length > 0) {
      client.write('chat', { message: text });
    } else {
      readline.prompt(true);
    }
  });

  process.on('exit', () => {
    readline.close();
  });
  readline.prompt(true);
}

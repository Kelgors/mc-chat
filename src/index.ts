import readline from './readline';
import CommandManager from './CommandManager';
import ExitCommand from './Commands/ExitCommand';
import ClearCommand from './Commands/ClearCommand';
import HelpCommand from './Commands/HelpCommand';
import ChatComponents from './ChatComponents';
import { data as PacketVerboseList } from './packets';

const { version: PACKAGE_VERSION } = require('../package.json');
const chalk = require('chalk');
const MC = require('minecraft-protocol');
// Command-Line Arguments
const { Command } = require('commander');
console.log(`Welcome to mc-chat v${PACKAGE_VERSION}`);
const program = new Command();
program
  .option('-d, --debug', 'Output json text message')
  .requiredOption('-h, --host <host>', 'Specify the Minecraft IP server')
  .option('-p, --port <port>', 'Specify the Minecraft port used by the server', 25565)
  .requiredOption('-u, --user <user>', 'Minecraft account email')
  .option('-t, --type <type>', 'Type of account (mojang|microsoft)', 'mojang')
  .option('-P, --password <password>', 'Minecraft account password');
program.parse(process.argv);
// Check for password
const options = program.opts();
if (!options.password) {
  // Ask for password if not given
  readline.question('Minecraft password: ', function (password : string) {
    options.password = password;
    readline.isPassword = false;
    readline.output.write('\n');
    run();
  });
  readline.isPassword = true;
} else {
  run();
}

function onPacketDebugListener(data : any, metadata : any) {
  if (PacketVerboseList.includes(metadata.name)) return;
  console.log('Packet(name: %s) %o', metadata.name, data);
}

function onChatMessage(json: any) {
  // clear prompt
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  // log message
  console.log(ChatComponents.fromJson(json).toString());
  // reset prompt
  readline.prompt(true);
}
function onClientChat(packet : any) {
  onChatMessage(JSON.parse(packet.message))
}
function onClientDisconnected(packet : any) {
  onChatMessage(JSON.parse(packet.reason));
}

function run() {
  // create connection
  console.log(`Type ".help" for more information and ".exit" to quit\nConnecting to ${chalk.cyan(options.host)}:${chalk.green(options.port)}...`);
  const client = MC.createClient({
    host: options.host,
    port: options.port,
    username: options.user,
    password: options.password,
    auth: options.type,
    profilesFolder: false,
  });
  // wait for connection before doing anything
  client.on('connect', function () {
    const manager = new CommandManager();
    manager.setCommand('exit', new ExitCommand());
    manager.setCommand('clear', new ClearCommand());
    manager.setCommand('help', new HelpCommand());

    // wait for chat message to log
    if (options.debug) client.on('packet', onPacketDebugListener);
    client.on('chat', onClientChat);
    client.on('kick_disconnect', onClientDisconnected);
    client.on('disconnect', onClientDisconnected);
    client.on('end', process.exit.bind(process, 0));

    // wait for input
    readline.on('line', function (text : string) {
      if (text.length === 0 || manager.onCommand(text)) {
        readline.prompt(true);
      } else {
        client.write('chat', { message: text });
      }
    });
    readline.prompt(true);
  });



}

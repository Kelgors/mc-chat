const chalk = require("chalk");
const MC = require("minecraft-protocol");
const { Command } = require("commander");

import readline from "./readline";
import CommandManager from "./CommandManager";
import ExitCommand from "./Commands/ExitCommand";
import ClearCommand from "./Commands/ClearCommand";
import HelpCommand from "./Commands/HelpCommand";
import ChatComponents from "./ChatComponents";

import PacketManager from "./PacketManager";

const { version: PACKAGE_VERSION } = require("../package.json");

// Command-Line Arguments
console.log(`Welcome to mc-chat v${PACKAGE_VERSION}`);
const program = new Command();

program
  .option("-d, --debug", "Output json text message")
  .requiredOption("-h, --host <host>", "Specify the Minecraft IP server")
  .option(
    "-p, --port <port>",
    "Specify the Minecraft port used by the server",
    25565
  )
  .requiredOption("-u, --user <user>", "Minecraft account email")
  .option("-t, --type <type>", "Type of account (mojang|microsoft)", "mojang")
  .option("-P, --password <password>", "Minecraft account password");

program.parse(process.argv);
const options = program.opts();

// Check for password
if (!options.password) {
  // Ask for password if not given
  readline.question("Minecraft password: ", (password: string) => {
    options.password = password;
    readline.isPassword = false;
    readline.output.write("\n");
    run();
  });
  readline.isPassword = true;
} else {
  run();
}

function run() {
  // create connection
  console.log(
    `Type ".help" for more information and ".exit" to quit\nConnecting to ${chalk.cyan(
      options.host
    )}:${chalk.green(options.port)}...`
  );
  const client = MC.createClient({
    host: options.host,
    port: options.port,
    username: options.user,
    password: options.password,
    auth: options.type,
    profilesFolder: false,
  });

  // wait for connection before doing anything
  client.on("connect", () => {
    const packetManager = new PacketManager();
    const manager = new CommandManager();
    manager.setCommand("exit", new ExitCommand());
    manager.setCommand("clear", new ClearCommand());
    manager.setCommand("help", new HelpCommand());

    // wait for chat message to log
    client.on("chat", (packet: any) => {
      const jsonMsg = JSON.parse(packet.message);
      if (options.debug) console.log(JSON.stringify(jsonMsg));
      // clear prompt
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      // log message
      console.log(ChatComponents.fromJson(jsonMsg).toString());
      // reset prompt
      readline.prompt(true);
    });

    client.on("packet", (packet: any, packetMeta: any) => {
      packetManager.processPacket(packetMeta, packet);
    });

    // wait for input
    readline.on("line", (text: string) => {
      if (text.length === 0 || manager.onCommand(text)) {
        readline.prompt(true);
      } else {
        client.write("chat", { message: text });
      }
    });
    readline.prompt(true);
  });
}

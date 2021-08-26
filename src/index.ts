import mc from "minecraft-protocol";
const readline = require("./readline");

import { Command } from "commander";

import { initConnexion } from "./client";

const program = new Command();

program
  .option("-d, --debug", "Output json text message")
  .requiredOption("-h, --host <host>", "Specify the Minecraft IP server")
  .option(
    "-p, --port <port>",
    "Specify the Minecraft port used by the server",
    "25565"
  )
  .requiredOption("-u, --user <user>", "Minecraft account email")
  .option("-t, --type <type>", "Type of account (mojang|microsoft)", "mojang")
  .option("-P, --password <password>", "Minecraft account password");
program.parse(process.argv);

const run = () => {
  console.log(`Connecting to ${options.host}:${options.port}...`);

  const client = mc.createClient({
    host: options.host,
    port: options.port,
    username: options.user,
    password: options.password,
    auth: options.type,
  });

  client.on("connect", function () {
    console.info("connected");
  });

  client.on("disconnect", function (packet) {
    console.log("disconnected: " + packet.reason);
  });

  client.on("end", function () {
    console.log("Connection lost");
    process.exit();
  });

  client.on("error", function (err) {
    console.log("Error occured");
    console.log(err);
    process.exit(1);
  });

  client.on("state", (state) => {
    console.log(state);
  });

  client.on("packet", (packet, packetMeta) => {
    initConnexion(packet, packetMeta);
  });

  client.on("chat", function (packet) {
    const jsonMsg = JSON.parse(packet.message);

    if (
      jsonMsg.translate === "chat.type.announcement" ||
      jsonMsg.translate === "chat.type.text"
    ) {
      const username = jsonMsg.with[0].text;
      if (username === client.username) return;

      const msg = jsonMsg.with[1];

      process.stdout.clearLine(-1, () => {});
      process.stdout.cursorTo(0);
      console.log(`<${username}> ${msg.text || msg}`);
      readline.prompt(true);
    }
  });

  readline.on("line", (str: string) => {
    client.write("chat", { message: str });
  });
};

// Check for password
const options = program.opts();

// Ask for password if not given
if (!options.password) {
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

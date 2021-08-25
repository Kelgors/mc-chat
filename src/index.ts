import mc from "minecraft-protocol";
import rl from "readline";

import { initConnexion } from "./client";

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = mc.createClient({
  username: "",
  password: "",
  host: "",
  port: 25565,
  auth: "mojang",
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

client.on("packet", (packet) => {
  initConnexion(packet);
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

readline.on("line", (str) => {
  client.write("chat", { message: str });
});

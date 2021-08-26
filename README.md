# Minecraft-Chat

Chat with your friend from your terminal. Be aware that your character will be connected to the server and can take damage or die.
You need a mojang account or microsoft account.

Come say hi to `play.1ef51.com` =)

## Getting Started

```bash
$ mc-chat --host 8.8.8.8 --port 25565 --user youremail@provider.ltd
Minecraft password:
Connecting to 8.8.8.8:25565...
Notch joined the game
> hello
<Notch> hello
<AnotherPlayer> Hi =)
```

You can provide your password via the -P &lt;password&gt; argument but it will be stored in your bash_history.

Full list of commands via `mc-chat --help`

## How-To

Available for Linux or WSL.

### Install

```bash
git clone https://github.com/Kelgors/mc-chat.git
cd mc-chat
npm install -g . # Add mc-chat command to your path
```

### Update

```bash
cd mc-chat
git pull origin main
npm install -g . # Add mc-chat command to your path
```

## TODO

### must have

* Chat colors
* Save chat logs
* AFK: reconnect,auto move

### nice to have

* Move your player (.forward,.backward, ....)
* Damage notif, auto disconnect?

## Resources

* [https://wiki.vg/Chat](https://wiki.vg/Chat)
* [https://github.com/PrismarineJS/node-minecraft-protocol/blob/master/docs/API.md](https://github.com/PrismarineJS/node-minecraft-protocol/blob/master/docs/API.md)
* [https://minecraft.fandom.com/wiki/Launcher_profiles.json](https://minecraft.fandom.com/wiki/Launcher_profiles.json)
* [https://github.com/sindresorhus/terminal-link](https://github.com/sindresorhus/terminal-link)
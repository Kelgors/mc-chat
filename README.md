# Minecraft-Chat

Permit to chat from your terminal. Be aware that your character will be connected to the server
and can take damage or die.
You need a mojang account.

## Getting Started

```bash
$ mc-chat -h 8.8.8.8 -p 25565 -u youremail@provider.ltd
Minecraft password:
Connecting to 8.8.8.8:25565...
Notch joined the game
> hello
<Notch> hello
<AnotherPlayer> Hi =)
```

You can provide your password via the -P &lt;password&gt; argument but it will be stored in your bash_history.


## Resources

* [https://wiki.vg/Chat](https://wiki.vg/Chat)
* [https://github.com/PrismarineJS/node-minecraft-protocol/blob/master/docs/API.md](https://github.com/PrismarineJS/node-minecraft-protocol/blob/master/docs/API.md)
* [https://minecraft.fandom.com/wiki/Launcher_profiles.json](https://minecraft.fandom.com/wiki/Launcher_profiles.json)

import ICommandExecutor from "./types/ICommandExecutor";
const chalk = require('chalk');

export default class CommandManager {
  commands : Map<string, ICommandExecutor>;

  constructor() {
    this.commands = new Map();
  }

  setCommand(name: string, command: ICommandExecutor) {
    this.commands.set(name, command);
  }
  removeCommand(name: string) {
    this.commands.delete(name);
  }

  onCommand(line : string): boolean {
    if (!line.startsWith('.')) return false;
    const [ command, ...args ] = line.split(' ');
    // remove empty strings
    for (let i = 0; i < args.length; i++) {
      if (args[i].length === 0) {
        args.splice(i, 1);
        i--;
      }
    }
    const label = command.slice(1);
    if (!this.commands.has(label)) {
      console.log(chalk.red('This command does not exist. Type .help for more info.'));
      return true;
    }
    try {
      this.commands.get(label)?.onCommand(label, args);
    } catch (ex) {
      console.error(ex);
    }
    return true;
  }
}

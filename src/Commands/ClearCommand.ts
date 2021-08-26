import ICommandExecutor from "../types/ICommandExecutor";
import readline from '../readline';

export default class ClearCommand implements ICommandExecutor {

  onCommand(label : string, args : string[]): void {
    console.clear();
    readline.prompt(true);
  }

}

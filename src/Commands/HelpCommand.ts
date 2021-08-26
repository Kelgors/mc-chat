import ICommandExecutor from "../types/ICommandExecutor";

export default class HelpCommand implements ICommandExecutor {

  onCommand(label : string, args : string[]): void {
    console.log('.clear - clear the console');
    console.log('.exit - close the console');
  }

}

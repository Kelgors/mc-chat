import ICommandExecutor from "../types/ICommandExecutor";

export default class ExitCommand implements ICommandExecutor {

  onCommand(label : string, args : string[]): void {
    process.exit(0);
  }

}

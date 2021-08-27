import ActionManager from "../ActionManager";
import ICommandExecutor from "../types/ICommandExecutor";

export default class PositionCommand implements ICommandExecutor {
  private actionManager: ActionManager;

  constructor(actionManager: ActionManager) {
    this.actionManager = actionManager;
  }

  onCommand(label: string, args: string[]): void {
    this.actionManager.position();
  }
}

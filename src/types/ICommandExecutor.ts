export default interface ICommandExecutor {
  onCommand(label : string, args : string[]): void;
}

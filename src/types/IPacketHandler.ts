export default interface IPacketHandler {
  packetMeta: string;
  process(packet: any): any;
}

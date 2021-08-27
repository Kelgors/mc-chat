import { MinecraftPacketType } from "./MinecraftPackets";

export default interface IPacketHandler {
  packetMeta: MinecraftPacketType;
  process(packet: any): boolean;
  get data(): any
}

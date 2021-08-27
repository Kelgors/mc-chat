import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftPacketType,
  MinecraftServerInfo,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Join_game
 */
export default class ServerInfoPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.LOGIN;
  serverInfo!: MinecraftServerInfo;

  process(packet: any): boolean {
    this.serverInfo = {
      ...packet,
    };

    return true;
  }

  get data(): MinecraftServerInfo {
    return this.serverInfo;
  }
}

import IPacketHandler from "../types/IPacketHandler";
import { MinecraftServerInfo } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Join_game
 */
export default class ServerInfoPacket implements IPacketHandler {
  packetMeta = "login";
  serverInfo!: MinecraftServerInfo;

  process(packet: any): boolean {
    this.serverInfo = {
      ...packet,
    };

    return true;
  }

  getData(): MinecraftServerInfo {
    return this.serverInfo;
  }
}

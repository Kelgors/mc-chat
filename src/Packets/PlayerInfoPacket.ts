import IPacketHandler from "../types/IPacketHandler";
import { MinecraftPlayerInfo } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Login_Success
 */
export default class PlayerInfoPacket implements IPacketHandler {
  packetMeta = "success";
  playerInfo!: MinecraftPlayerInfo;

  process(packet: any): boolean {
    this.playerInfo = {
      username: packet.username,
      uuid: packet.uuid,
    };

    return true;
  }

  getData(): MinecraftPlayerInfo {
    return this.playerInfo;
  }
}

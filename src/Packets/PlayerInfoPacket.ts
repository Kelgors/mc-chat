import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftPacketType,
  MinecraftPlayerInfo,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Login_Success
 */
export default class PlayerInfoPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.SUCCESS;
  playerInfo!: MinecraftPlayerInfo;

  process(packet: any): boolean {
    this.playerInfo = {
      username: packet.username,
      uuid: packet.uuid,
    };

    return true;
  }

  get data(): MinecraftPlayerInfo {
    return this.playerInfo;
  }
}

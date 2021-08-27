import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftDifficultyInfo,
  MinecraftPacketType,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Server_Difficulty
 */
export default class DifficultyPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.DIFFICULTY;
  difficultyInfo!: MinecraftDifficultyInfo;

  process(packet: any): boolean {
    this.difficultyInfo = {
      difficulty: packet.difficulty,
      difficultyLocked: packet.difficultyLocked,
    };

    return true;
  }

  get data(): MinecraftDifficultyInfo {
    return this.difficultyInfo;
  }
}

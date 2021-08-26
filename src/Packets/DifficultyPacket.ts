import IPacketHandler from "../types/IPacketHandler";
import { MinecraftDifficultyInfo } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Server_Difficulty
 */
export default class DifficultyPacket implements IPacketHandler {
  packetMeta = "difficulty";
  difficultyInfo!: MinecraftDifficultyInfo;

  process(packet: any): boolean {
    this.difficultyInfo = {
      difficulty: packet.difficulty,
      difficultyLocked: packet.difficultyLocked,
    };

    return true;
  }

  getData(): MinecraftDifficultyInfo {
    return this.difficultyInfo;
  }
}

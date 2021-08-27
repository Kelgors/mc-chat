import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftPacketType,
  DeclareCommands,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Join_game
 */
export default class DeclareCommandsPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.DECLARE_COMMANDS;
  declareCommands!: DeclareCommands;

  process(packet: any): boolean {
    this.declareCommands = {
      ...packet,
    };

    return true;
  }

  get data(): DeclareCommands {
    return this.declareCommands;
  }
}

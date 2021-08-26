import IPacketHandler from "../types/IPacketHandler";
import { MinecraftThreshold } from "../types/MinecraftPackets";

export default class CompressPacket implements IPacketHandler {
  packetMeta = "compress";
  compress!: MinecraftThreshold;

  process(packet: any): boolean {
    this.compress = {
      threshold: packet.threshold,
    };

    return true;
  }

  getData(): MinecraftThreshold {
    return this.compress;
  }
}

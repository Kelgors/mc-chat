import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftPacketType,
  MinecraftThreshold,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Set_Compression
 */
export default class CompressPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.COMPRESS;
  compress!: MinecraftThreshold;

  process(packet: any): boolean {
    this.compress = {
      threshold: packet.threshold,
    };

    return true;
  }

  get data(): MinecraftThreshold {
    return this.compress;
  }
}

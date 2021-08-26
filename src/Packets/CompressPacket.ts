import IPacketHandler from "../types/IPacketHandler";
import { MinecraftThreshold } from "../types/MinecraftPackets";

export default class CompressPacket implements IPacketHandler {
  packetMeta = "compress";

  process(packet: any): MinecraftThreshold {
    const compress: MinecraftThreshold = {
      threshold: packet.threshold,
    };

    return compress;
  }
}

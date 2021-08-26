import IPacketHandler from "../types/IPacketHandler";
import {} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Chunk_Data
 */
export default class MapChunkPacket implements IPacketHandler {
  packetMeta = "map_chunk";
  mapChunks: any[][] = [];

  constructor() {
  }

  process(packet: any): boolean {
    return true;
  }

  getData(): any {
    return this.mapChunks;
  }
}

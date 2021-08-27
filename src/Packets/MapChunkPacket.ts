import IPacketHandler from "../types/IPacketHandler";
import { MinecraftChunk, MinecraftMap, MinecraftPacketType } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Chunk_Data
 */
export default class MapChunkPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.MAP_CHUNK;
  mapChunks: MinecraftMap = {};

  constructor() {}

  process(packet: MinecraftChunk): boolean {
    this.mapChunks[`${packet.x}-${packet.z}`] = packet;
    return true;
  }

  get data(): MinecraftMap {
    return this.mapChunks;
  }
}

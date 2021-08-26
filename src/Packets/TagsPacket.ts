import IPacketHandler from "../types/IPacketHandler";
import { MinecraftTags, MinecraftTag } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Tags
 */
export default class TagsPacket implements IPacketHandler {
  packetMeta = "tags";
  tags: MinecraftTags = [];

  process(packet: any): boolean {
    for (let i = 0; i < packet.tags.length; i++) {
      const tag: MinecraftTag = packet.tags[i];
      this.tags.push(tag);
    }
    return true;
  }

  getData(): MinecraftTags {
    return this.tags;
  }
}

import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftTags,
  MinecraftTag,
  MinecraftPacketType,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Tags
 */
export default class TagsPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.TAGS;
  tags: MinecraftTags = [];

  process(packet: any): boolean {
    for (let i = 0; i < packet.tags.length; i++) {
      const tag: MinecraftTag = packet.tags[i];
      this.tags.push(tag);
    }
    return true;
  }

  get data(): MinecraftTags {
    return this.tags;
  }
}

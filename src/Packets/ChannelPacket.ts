import IPacketHandler from "../types/IPacketHandler";
import { MinecraftChannel, MinecraftPacketType } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Plugin_channels
 */
export default class ChannelPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.CUSTOM_PAYLOAD;
  channel!: MinecraftChannel;

  process(packet: any): boolean {
    this.channel = {
      channel: packet.channel,
      data: packet.data,
    };

    return true;
  }

  get data(): MinecraftChannel {
    return this.channel;
  }
}

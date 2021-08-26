import IPacketHandler from "../types/IPacketHandler";
import { MinecraftChannel } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Plugin_channels
 */
export default class ChannelPacket implements IPacketHandler {
  packetMeta = "custom_payload";
  channel!: MinecraftChannel;

  process(packet: any): boolean {
    this.channel = {
      channel: packet.channel,
      data: packet.data,
    };

    return true;
  }

  getData(): MinecraftChannel {
    return this.channel;
  }
}

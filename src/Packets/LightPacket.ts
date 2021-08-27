import IPacketHandler from "../types/IPacketHandler";
import { MinecraftLight, MinecraftPacketType } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Update_Light
 */
export default class LightPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.UPDATE_LIGHT;
  light!: MinecraftLight;

  process(packet: any): boolean {
    // TODO: not usefull
    this.light = {
      ...packet,
    };
    return true;
  }

  get data(): MinecraftLight {
    return this.light;
  }
}

import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftPacketType,
  MinecraftPosition,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Unlock_Recipes
 */
export default class PositionPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.POSITION;
  position!: MinecraftPosition;

  process(packet: any): boolean {
    this.position = {
      dismountVehicle: packet.dismountVehicle,
      flags: packet.flags,
      pitch: packet.pitch,
      teleportId: packet.teleportId,
      x: packet.x,
      y: packet.y,
      yaw: packet.yaw,
      z: packet.z,
    };
    return true;
  }

  get data(): MinecraftPosition {
    return this.position;
  }
}

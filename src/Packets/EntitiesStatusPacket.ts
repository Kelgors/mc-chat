import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftEntityStatus,
  MinecraftPacketType,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Entity_Status
 */
export default class EntitiesStatusPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.ENTITY_STATUS;
  entityStatus: MinecraftEntityStatus[] = [];

  process(packet: any): boolean {
    this.entityStatus.push(packet);

    return true;
  }

  get data(): MinecraftEntityStatus[] {
    return this.entityStatus;
  }
}

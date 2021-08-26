import IPacketHandler from "../types/IPacketHandler";
import { MinecraftEntityStatus } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Entity_Status
 */
export default class EntitiesStatusPacket implements IPacketHandler {
  packetMeta = "entity_status";
  entityStatus: MinecraftEntityStatus[] = [];

  process(packet: any): boolean {
    this.entityStatus.push(packet);

    return true;
  }

  getData(): MinecraftEntityStatus[] {
    return this.entityStatus;
  }
}

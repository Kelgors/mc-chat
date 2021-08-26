import IPacketHandler from "../types/IPacketHandler";
import { MinecraftSlotItem } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Held_Item_Change_.28clientbound.29
 */
export default class HeldItemSlotPacket implements IPacketHandler {
  packetMeta = "held_item_slot";
  slotItem!: MinecraftSlotItem;

  process(packet: any): boolean {
    this.slotItem = packet.slot;

    return true;
  }

  getData(): MinecraftSlotItem {
    return this.slotItem;
  }
}

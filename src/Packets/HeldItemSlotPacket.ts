import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftPacketType,
  MinecraftSlotItem,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Held_Item_Change_.28clientbound.29
 */
export default class HeldItemSlotPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.HELD_ITEM_SLOT;
  slotItem!: MinecraftSlotItem;

  process(packet: any): boolean {
    this.slotItem = packet.slot;

    return true;
  }

  get data(): MinecraftSlotItem {
    return this.slotItem;
  }
}

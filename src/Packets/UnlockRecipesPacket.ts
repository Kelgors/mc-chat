import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftPacketType,
  MinecraftUnlockRecipes,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Unlock_Recipes
 */
export default class UnlockRecipesPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.UNLOCK_RECIPES;
  unlockRecipes!: MinecraftUnlockRecipes;

  process(packet: any): boolean {
    this.unlockRecipes = {
      ...packet,
    };
    return true;
  }

  get data(): MinecraftUnlockRecipes {
    return this.unlockRecipes;
  }
}

import IPacketHandler from "../types/IPacketHandler";
import {
  MinecraftRecipes,
  MinecraftRecipe,
  MinecraftPacketType,
} from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Declare_Recipes
 */
export default class RecipesPacket implements IPacketHandler {
  packetMeta = MinecraftPacketType.DECLARE_RECIPES;
  recipes: MinecraftRecipes = [];

  process(packet: any): boolean {
    for (let i = 0; i < packet.recipes.length; i++) {
      const recipe: MinecraftRecipe = packet.recipes[i];
      this.recipes.push(recipe);
    }
    return true;
  }

  get data(): MinecraftRecipes {
    return this.recipes;
  }
}

import IPacketHandler from "../types/IPacketHandler";
import { MinecraftRecipes, MinecraftRecipe } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Declare_Recipes
 */
export default class RecipesPacket implements IPacketHandler {
  packetMeta = "declare_recipes";
  recipes: MinecraftRecipes = [];

  process(packet: any): boolean {
    for (let i = 0; i < packet.recipes.length; i++) {
      const recipe: MinecraftRecipe = packet.recipes[i];
      this.recipes.push(recipe);
    }
    return true;
  }

  getData(): MinecraftRecipes {
    return this.recipes;
  }
}

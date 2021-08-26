import IPacketHandler from "../types/IPacketHandler";
import { MinecraftPlayerAbilities } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol#Player_Abilities_.28serverbound.29
 */
export default class AbilitiesPacket implements IPacketHandler {
  packetMeta = "abilities";
  playerAbilities!: MinecraftPlayerAbilities;

  process(packet: any): boolean {
    this.playerAbilities = {
      flags: packet.flags,
      flyingSpeed: packet.flyingSpeed,
      walkingSpeed: packet.walkingSpeed,
    };

    return true;
  }

  getData(): MinecraftPlayerAbilities {
    return this.playerAbilities;
  }
}

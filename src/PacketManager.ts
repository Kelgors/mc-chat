import {
  EncryptionPacket,
  CompressPacket,
  PlayerInfoPacket,
  ServerInfoPacket,
  ChannelPacket,
  DifficultyPacket,
  AbilitiesPacket,
  HeldItemSlotPacket,
  RecipesPacket,
  TagsPacket,
  EntitiesStatusPacket,
} from "./Packets/";
import IPacketHandler from "./types/IPacketHandler";
import { MinecraftPacketMeta } from "./types/MinecraftPackets";

export default class PacketManager {
  private packets: Record<string, IPacketHandler> = {};

  constructor() {
    const connexion = new EncryptionPacket();
    const compress = new CompressPacket();
    const playerInfo = new PlayerInfoPacket();
    const serverInfo = new ServerInfoPacket();
    const channel = new ChannelPacket();
    const difficultyInfo = new DifficultyPacket();
    const playerAbilities = new AbilitiesPacket();
    const slotItem = new HeldItemSlotPacket();
    const recipes = new RecipesPacket();
    const tags = new TagsPacket();
    const entities = new EntitiesStatusPacket();

    this.packets[connexion.packetMeta] = connexion;
    this.packets[compress.packetMeta] = compress;
    this.packets[playerInfo.packetMeta] = playerInfo;
    this.packets[serverInfo.packetMeta] = serverInfo;
    this.packets[channel.packetMeta] = channel;
    this.packets[difficultyInfo.packetMeta] = difficultyInfo;
    this.packets[playerAbilities.packetMeta] = playerAbilities;
    this.packets[slotItem.packetMeta] = slotItem;
    this.packets[recipes.packetMeta] = recipes;
    this.packets[tags.packetMeta] = tags;
    this.packets[entities.packetMeta] = entities;
  }

  notImplementedStep = (packetMeta: any, packet: any) => {
    console.log("Not implemented", packet);
  };

  processPacket = (packetMeta: MinecraftPacketMeta, packet: any): void => {
    if (this.packets[packetMeta.name])
      this.packets[packetMeta.name].process(packet);
    else this.notImplementedStep(packetMeta, packet);
  };
}

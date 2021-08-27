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
  MapChunkPacket,
} from "./Packets/";
import IPacketHandler from "./types/IPacketHandler";
import {
  MinecraftPacketMeta,
  MinecraftPacketType,
} from "./types/MinecraftPackets";

export default class PacketManager {
  private packets!: Record<MinecraftPacketType, IPacketHandler>;
  private options: any;

  constructor(options: any) {
    this.options = options;
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
    const mapChunk = new MapChunkPacket();

    this.packets = {
      [connexion.packetMeta]: connexion,
      [compress.packetMeta]: compress,
      [playerInfo.packetMeta]: playerInfo,
      [serverInfo.packetMeta]: serverInfo,
      [channel.packetMeta]: channel,
      [difficultyInfo.packetMeta]: difficultyInfo,
      [playerAbilities.packetMeta]: playerAbilities,
      [slotItem.packetMeta]: slotItem,
      [recipes.packetMeta]: recipes,
      [tags.packetMeta]: tags,
      [entities.packetMeta]: entities,
      [mapChunk.packetMeta]: mapChunk,
    } as any; // dirty fix :)
  }

  notImplementedStep = (packetMeta: any, packet: any) => {
    if (this.options.debug) console.log("Not implemented", packetMeta);
  };

  processPacket = (packetMeta: MinecraftPacketMeta, packet: any): void => {
    if (this.packets[packetMeta.name])
      this.packets[packetMeta.name].process(packet);
    else this.notImplementedStep(packetMeta, packet);
  };

  public get data(): Record<MinecraftPacketType, IPacketHandler> {
    return this.packets;
  }
}

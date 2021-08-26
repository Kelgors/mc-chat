import { EncryptionPacket, CompressPacket, PlayerInfoPacket } from "./Packets/";
import {
  MinecraftPacketMeta,
  MinecraftStepInitConnexion,
  MinecraftSecrets,
  MinecraftThreshold,
  MinecraftPlayerInfo,
  MinecraftServerInfo,
  MinecraftRecipes,
  MinecraftRecipe,
  MinecraftSlot,
  MinecraftPlayerMovement,
  MinecraftDifficultyInfo,
  MinecraftChannel,
  MinecraftTags,
  MinecraftTag,
  MinecraftEntity,
} from "./types/MinecraftPackets";

export default class PacketManager {
  private secrets!: MinecraftSecrets;
  private threshold!: MinecraftThreshold;
  private playerInfo!: MinecraftPlayerInfo;
  private serverInfo!: MinecraftServerInfo;
  private channel!: MinecraftChannel;
  private difficultyInfo!: MinecraftDifficultyInfo;
  private playerMovement!: MinecraftPlayerMovement;
  private slot!: MinecraftSlot;
  private recipes: MinecraftRecipes = [];
  private tags: MinecraftTags = [];
  private entities: MinecraftEntity[] = [];
  private packets: Record<string, (packet: any) => any> = {};

  constructor() {
    const connexion = new EncryptionPacket();
    const compress = new CompressPacket();
    const playerInfo = new PlayerInfoPacket();

    this.packets[connexion.packetMeta] = connexion.process;
    this.packets[compress.packetMeta] = compress.process;
    this.packets[playerInfo.packetMeta] = playerInfo.process;
  }

  connexionStep = (packetMeta: any, packet: MinecraftSecrets) => {
    const connexion = new EncryptionPacket();

    if (connexion.process(packet)) {
      this.secrets = connexion.getData();
      console.log("Secrets saved !");
    }
  };

  thresholdStep = (packetMeta: any, packet: MinecraftThreshold) => {
    const compress = new CompressPacket();

    if (compress.process(packet)) {
      this.threshold = compress.getData();
      console.log("Threshold saved !");
    }
  };

  playerInfoStep = (packetMeta: any, packet: MinecraftPlayerInfo) => {
    const playerInfo = new PlayerInfoPacket();

    if (playerInfo.process(packet)) {
      this.playerInfo = playerInfo.getData();
      console.log("PlayerInfos saved !");
    }
  };

  serverInfoStep = (packetMeta: any, packet: MinecraftServerInfo) => {
    this.serverInfo = { ...packet };
    console.log("ServerInfo saved !");
  };

  channelStep = (packetMeta: any, packet: MinecraftChannel) => {
    this.channel = {
      channel: packet.channel,
      data: packet.data.toString(),
    };
    console.log("Channel saved !");
  };

  difficultyInfoStep = (packetMeta: any, packet: MinecraftDifficultyInfo) => {
    this.difficultyInfo = { ...packet };
    console.log("DifficultyInfo saved !");
  };

  movementInfoStep = (packetMeta: any, packet: MinecraftPlayerMovement) => {
    this.playerMovement = { ...packet };
    console.log("PlayerMvementInfo saved !");
  };

  slotStep = (packetMeta: any, packet: { slot: MinecraftSlot }) => {
    this.slot = packet.slot;
    console.log("Slot saved !");
  };

  recipesStep = (packetMeta: any, packet: any) => {
    for (let i = 0; i < packet.recipes.length; i++) {
      const recipe: MinecraftRecipe = packet.recipes[i];
      this.recipes.push(recipe);
    }

    console.log(`${this.recipes.length} Recipes saved !`);
  };

  tagsStep = (packetMeta: any, packet: { tags: MinecraftTags }) => {
    for (let i = 0; i < packet.tags.length; i++) {
      const tag: MinecraftTag = packet.tags[i];
      this.tags.push(tag);
    }

    console.log(`${this.tags.length} kinds of tags saved !`);
  };

  entityStep = (packetMeta: any, packet: MinecraftEntity) => {
    this.entities.push(packet);
    console.log("Entity saved");
  };

  notImplementedStep = (packetMeta: any, packet: any) => {
    console.log("Not implemented", packet);
  };

  processPacket = (packetMeta: MinecraftPacketMeta, packet: any): void => {
    if (this.packets[packetMeta.name]) this.packets[packetMeta.name](packet);
  };

  public steps: Record<number, (packetMeta: any, packet: any) => void> = {
    [MinecraftStepInitConnexion.CONNEXION]: this.connexionStep,
    [MinecraftStepInitConnexion.THRESHOLD]: this.thresholdStep,
    [MinecraftStepInitConnexion.PLAYER_INFO]: this.playerInfoStep,
    [MinecraftStepInitConnexion.SERVER_INFO]: this.serverInfoStep,
    [MinecraftStepInitConnexion.CHANNEL]: this.channelStep,
    [MinecraftStepInitConnexion.DIFFICULTY_INFO]: this.difficultyInfoStep,
    [MinecraftStepInitConnexion.MOVEMENT_INFO]: this.movementInfoStep,
    [MinecraftStepInitConnexion.SLOTS]: this.slotStep,
    [MinecraftStepInitConnexion.RECIPES]: this.recipesStep,
    [MinecraftStepInitConnexion.TAGS]: this.tagsStep,
    [MinecraftStepInitConnexion.ENTITY_1]: this.entityStep,
    [MinecraftStepInitConnexion.ENTITY_2]: this.entityStep,
    [MinecraftStepInitConnexion.MAX]: this.notImplementedStep,
  };
}

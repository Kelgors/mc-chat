import {
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
} from "./types";

let step = MinecraftStepInitConnexion.CONNEXION;

class MinecraftClient {
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

  constructor() {}
  connexionStep = (packet: MinecraftSecrets) => {
    this.secrets = {
      publicKey: Buffer.from(packet.publicKey).toString("base64"),
      serverId: packet.serverId,
      verifyToken: Buffer.from(packet.verifyToken).toString("base64"),
    };
    console.log("Secrets saved !");
  };

  thresholdStep = (packet: MinecraftThreshold) => {
    this.threshold = { ...packet };
    console.log("Threshold saved !");
  };

  playerInfoStep = (packet: MinecraftPlayerInfo) => {
    this.playerInfo = { ...packet };
    console.log("PlayerInfos saved !");
  };

  serverInfoStep = (packet: MinecraftServerInfo) => {
    this.serverInfo = { ...packet };
    console.log("ServerInfo saved !");
  };

  channelStep = (packet: MinecraftChannel) => {
    this.channel = {
      channel: packet.channel,
      data: packet.data.toString(),
    };
    console.log("Channel saved !");
  };

  difficultyInfoStep = (packet: MinecraftDifficultyInfo) => {
    this.difficultyInfo = { ...packet };
    console.log("DifficultyInfo saved !");
  };

  movementInfoStep = (packet: MinecraftPlayerMovement) => {
    this.playerMovement = { ...packet };
    console.log("PlayerMvementInfo saved !");
  };

  slotStep = (packet: { slot: MinecraftSlot }) => {
    this.slot = packet.slot;
    console.log("Slot saved !");
  };

  recipesStep = (packet: any) => {
    for (let i = 0; i < packet.recipes.length; i++) {
      const recipe: MinecraftRecipe = packet.recipes[i];
      this.recipes.push(recipe);
    }

    console.log(`${this.recipes.length} Recipes saved !`);
  };

  tagsStep = (packet: { tags: MinecraftTags }) => {
    for (let i = 0; i < packet.tags.length; i++) {
      const tag: MinecraftTag = packet.tags[i];
      this.tags.push(tag);
    }

    console.log(`${this.tags.length} kinds of tags saved !`);
  };

  entityStep = (packet: MinecraftEntity) => {
    this.entities.push(packet);
    console.log("Entity saved");
  };

  notImplementedStep = (packet: any) => {
    console.log("Not implemented", packet);
  };

  public steps: Record<number, (packet: any) => void> = {
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
    [MinecraftStepInitConnexion.ENTITY]: this.entityStep,
    [MinecraftStepInitConnexion.MAX]: this.notImplementedStep,
  };
}

const client = new MinecraftClient();

export const initConnexion = (packet: any) => {
  const stepFunction = client.steps[step];
  if (stepFunction) stepFunction(packet);

  step++;
  if (step > MinecraftStepInitConnexion.MAX) return;
};

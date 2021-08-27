import { States } from "minecraft-protocol";

export interface MinecraftPacketMeta {
  size: number;
  name: MinecraftPacketType;
  state: States;
}

export enum MinecraftPacketType {
  ABILITIES = "abilities",
  CUSTOM_PAYLOAD = "custom_payload",
  COMPRESS = "compress",
  DIFFICULTY = "difficulty",
  ENCRYPTION_BEGIN = "encryption_begin",
  ENTITY_STATUS = "entity_status",
  HELD_ITEM_SLOT = "held_item_slot",
  MAP_CHUNK = "map_chunk",
  SUCCESS = "success",
  DECLARE_RECIPES = "declare_recipes",
  LOGIN = "login",
  TAGS = "tags",
}

export interface MinecraftSecrets {
  serverId: string;
  publicKey: string;
  verifyToken: string;
}

export interface MinecraftThreshold {
  threshold: number;
}

export interface MinecraftPlayerInfo {
  uuid: string;
  username: string;
}

export interface MinecraftChannel {
  channel: string;
  data: string;
}

export enum MinecraftDifficulty {
  PEACEFUL,
  EASY,
  NORMAL,
  HARD,
}

export interface MinecraftDifficultyInfo {
  difficulty: MinecraftDifficulty;
  difficultyLocked: boolean;
}

export interface MinecraftPlayerAbilities {
  flags: number;
  flyingSpeed: number;
  walkingSpeed: number;
}

export type MinecraftSlotItem = number;

export enum MinecraftGameMode {
  SURVIVAL,
  CREATIVE,
  ADVENTURE,
  SPECTATOR,
  NONE = -1,
}

interface MinecraftBlockEntity {
  type: string;
  name: string;
  value: { MOTION_BLOCKING: any; WORLD_SURFACE: any };
}

export interface MinecraftChunk {
  x: number;
  z: number;
  bitMap: number[];
  heightmaps: {
    type: string;
    name: string;
    value: MinecraftBlockEntity;
  };
  biomes: number[];
  chunkData: string;
  blockEntities: MinecraftBlockEntity[];
}

export type MinecraftMap = Record<string, MinecraftChunk>;

export type MinecraftDimensionValue = Record<string, any>;

export interface MinecraftServerInfo {
  threshold: number;
  isHardcore: boolean;
  gameMode: MinecraftGameMode;
  previousGameMode: MinecraftGameMode;
  worldNames: string[];
  dimensionCodec: {
    type: string;
    name: string;
    value: MinecraftDimensionValue;
  };
  dimension: {
    type: string;
    name: string;
    value: MinecraftDimensionValue;
  };
  worldName: string;
  hashedSeed: number[];
  maxPlayers: number;
  viewDistance: number;
  reducedDebugInfo: boolean;
  enableRespawnScreen: boolean;
  isDebug: boolean;
  isFlat: boolean;
}

export interface MinecraftRecipe {
  type: string;
  recipeId: string;
  data: any;
}

export type MinecraftRecipes = MinecraftRecipe[];

export interface MinecraftTag {
  tagType: string;
  tags: string[];
}

export type MinecraftTags = MinecraftTag[];

export interface MinecraftEntityStatus {
  entityId: number;
  entityStatus: number;
}

export enum MinecraftClickEventAction {
  OPEN_URL = "open_url",
  OPEN_FILE = "open_file",
  RUN_COMMAND = "run_command",
  SUGGEST_COMMAND = "suggest_command",
  CHANGE_PAGE = "change_page",
  COPY_TO_CLIPBOARD = "copy_to_clipboard",
}

export enum MinecraftHoverEventAction {
  SHOW_TEXT = "show_text",
  SHOW_ITEM = "show_item",
  SHOW_ENTITY = "show_entity",
}

export interface MinecraftClickEvent {
  action: MinecraftClickEventAction;
  value: string;
}

export interface MinecraftHoverEvent {
  action: MinecraftHoverEventAction;
  value: string;
}

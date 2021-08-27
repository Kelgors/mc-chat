import MC from "minecraft-protocol";
import PacketManager from "./PacketManager";
import {
  MinecraftPacketType,
  MinecraftMap,
  MinecraftPosition,
} from "./types/MinecraftPackets";

export default class ActionManager {
  private options: any;
  private packetManager: PacketManager;
  private client: MC.Client;

  constructor(options: any, packetManager: PacketManager, client: MC.Client) {
    this.options = options;
    this.packetManager = packetManager;
    this.client = client;
  }

  forward = (distance?: number) => {
    const map: MinecraftMap =
      this.packetManager.data[MinecraftPacketType.MAP_CHUNK].data;
    const position: MinecraftPosition =
      this.packetManager.data[MinecraftPacketType.POSITION].data;

    const chunk =
      map[`${Math.round(position.x / 16)}_${Math.round(position.z / 16)}`];

    if (chunk) {
      console.log(
        "The current chunk is at position %d/%d",
        chunk.x,
        chunk.z
      );

      // console.log(chunk.blockEntities);
    }
    console.log(`There is ${Object.keys(map).length} chunks`);
  };

  position = () => {
    const position: MinecraftPosition =
      this.packetManager.data[MinecraftPacketType.POSITION].data;
    console.log(`Your position is ${position.x}/${position.y}/${position.z}.`);
  };
}

import PacketManager from "./PacketManager";
import { MinecraftPacketType, MinecraftMap } from "./types/MinecraftPackets";

export default class ActionManager {
  private options: any;
  private packetManager: PacketManager;

  constructor(options: any, packetManager: PacketManager) {
    this.options = options;
    this.packetManager = packetManager;
  }

  forward = (distance?: number) => {
    const map: MinecraftMap =
      this.packetManager.data[MinecraftPacketType.MAP_CHUNK].data;

    console.log(`There is ${Object.keys(map).length} chunks`);
  };
}

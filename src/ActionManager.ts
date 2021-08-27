import PacketManager from "./PacketManager";
import { MinecraftPacketType, MinecraftMap, MinecraftPosition } from "./types/MinecraftPackets";

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
    const playerInfo = this.packetManager.data[MinecraftPacketType.SUCCESS].data;
    console.log(`There is ${Object.keys(map).length} chunks`);
  };

  position = () => {
    const position: MinecraftPosition = this.packetManager.data[MinecraftPacketType.POSITION].data;
    console.log(`Your position is ${position.x}/${position.y}/${position.z}.`);
  };

}

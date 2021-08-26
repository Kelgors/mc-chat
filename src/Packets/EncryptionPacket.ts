import IPacketHandler from "../types/IPacketHandler";
import { MinecraftSecrets } from "../types/MinecraftPackets";

export default class EncryptionPacket implements IPacketHandler {
  packetMeta = "encryption_begin";

  process(packet: any): MinecraftSecrets {
    const secret: MinecraftSecrets = {
      publicKey: Buffer.from(packet.publicKey).toString("base64"),
      serverId: packet.serverId,
      verifyToken: Buffer.from(packet.verifyToken).toString("base64"),
    };

    return secret;
  }
}

import IPacketHandler from "../types/IPacketHandler";
import { MinecraftSecrets } from "../types/MinecraftPackets";

/**
 * https://wiki.vg/Protocol_Encryption
 */
export default class EncryptionPacket implements IPacketHandler {
  packetMeta = "encryption_begin";
  secret!: MinecraftSecrets;

  process(packet: any): boolean {
    this.secret = {
      publicKey: Buffer.from(packet.publicKey).toString("base64"),
      serverId: packet.serverId,
      verifyToken: Buffer.from(packet.verifyToken).toString("base64"),
    };

    return true;
  }

  getData(): MinecraftSecrets {
    return this.secret;
  }
}

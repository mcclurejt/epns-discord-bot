import { Collection, MessageCreateOptions, MessagePayload } from "discord.js";
import snapshotHandler from "./snapshot";

export interface Payload {
  sender: string;
  source: string;
  data?: PayloadData;
  notification?: PayloadNotification;
}

export interface PayloadData {
  app?: string;
  sid?: string;
  url?: string;
  acta?: string;
  aimg?: string;
  amsg?: string;
  asub?: string;
  icon?: string;
  type?: string;
  epoch?: string;
  appbot?: string;
  hidden?: string;
  secret?: string;
}

export interface PayloadNotification {
  body?: string;
  title?: string;
}

export interface PayloadHandler {
  sender: string;
  handler: (
    p: Payload
  ) => Promise<string | MessagePayload | MessageCreateOptions>;
}

export class PayloadHandler {
  constructor(
    sender: string,
    handler: (
      p: Payload
    ) => Promise<string | MessagePayload | MessageCreateOptions>
  ) {
    this.sender = sender;
    this.handler = handler;
  }
  handle(p: Payload) {
    return this.handler(p);
  }
  asItem(): [string, PayloadHandler] {
    return [this.sender, this];
  }
}

export const mappings = new Collection<string, PayloadHandler>([
  snapshotHandler.asItem(),
]);

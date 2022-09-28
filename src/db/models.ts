export interface Subscription {
  guild: string;
  channel: string;
  msg_sender: string;
  msg_source: string;
  msg_type: number;
  mention: string;
  created: Date;
  updated: Date;
}

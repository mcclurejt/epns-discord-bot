import { IDatabase, IMain, ColumnSet } from "pg-promise";
import { subscriptions as sql } from "../sql";
import { Subscription } from "../models";

export class SubscriptionsRepository {
  private cs: ColumnSet;

  constructor(private db: IDatabase<any>, private pgp: IMain) {
    this.cs = new pgp.helpers.ColumnSet(
      ["guild", "channel", "selector_id", "mention", "created", "updated"],
      { table: "subscriptions" }
    );
  }

  async create(): Promise<null> {
    return this.db.none(sql.create);
  }

  async find(
    guild: string,
    channel: string,
    msg_sender: string,
    msg_source: string,
    msg_type: number
  ): Promise<Subscription | null> {
    return this.db.oneOrNone(sql.find, {
      guild,
      channel,
      msg_sender,
      msg_source,
      msg_type,
    });
  }

  async insert(subscription: Subscription): Promise<null> {
    return this.db.none(sql.insert, subscription);
  }

  async list(guild: string): Promise<Subscription[] | void> {
    return this.db.manyOrNone(sql.list, { guild });
  }
}

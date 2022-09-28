import promise from "bluebird"; // best promise library today
import pgPromise from "pg-promise"; // pg-promise core library
import { IInitOptions, IDatabase, IMain } from "pg-promise";
import { IExtensions, SubscriptionsRepository } from "./repos";

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// generic singleton creator:
function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name);
  let scope = (global as any)[s];
  if (!scope) {
    scope = { ...create() };
    (global as any)[s] = scope;
  }
  return scope;
}

interface IDatabaseScope {
  db: ExtendedProtocol;
  pgp: IMain;
}

export function getDB(): IDatabaseScope {
  return createSingleton<IDatabaseScope>("my-app-db-space", () => {
    const initOptions: IInitOptions<IExtensions> = {
      promiseLib: promise,
      extend(obj: ExtendedProtocol, dc: any) {
        obj.subscriptions = new SubscriptionsRepository(obj, pgp);
      },
    };
    const pgp: IMain = pgPromise(initOptions);
    // Creating the database instance with extensions:
    const db: ExtendedProtocol = pgp({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || ""),
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      allowExitOnIdle: true,
    });
    return {
      pgp,
      db,
    };
  });
}

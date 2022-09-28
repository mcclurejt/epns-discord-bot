import { QueryFile, IQueryFileOptions } from "pg-promise";
import { join } from "path";

export const subscriptions = {
  create: sql("subscriptions/create.sql"),
  find: sql("subscriptions/find.sql"),
  insert: sql("subscriptions/insert.sql"),
  list: sql("subscriptions/list.sql"),
};

function sql(file: string): QueryFile {
  const fullPath: string = join(__dirname, file);
  const options: IQueryFileOptions = {
    minify: true,
    debug: true,
  };
  const qf: QueryFile = new QueryFile(fullPath, options);
  if (qf.error) {
    console.error(qf.error);
  }
  return qf;
}

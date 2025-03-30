import { Env } from "../env";
import { createDatabase } from "typeorm-extension";

export const dbCreate = async () => {
  await createDatabase({
    ifNotExist: true,
    options: {
      type: "postgres",
      host: Env.postgres.host,
      port: parseInt(Env.postgres.port),
      username: Env.postgres.user,
      password: Env.postgres.password,
      database: Env.postgres.db,
    },
  });
};

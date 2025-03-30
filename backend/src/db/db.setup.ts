import { DataSource } from "typeorm";
import { Env } from "../env";
import { TodoEntity } from "../entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Env.postgres.host,
  port: parseInt(Env.postgres.port),
  username: Env.postgres.user,
  password: Env.postgres.password,
  database: Env.postgres.db,
  synchronize: true,
  logging: true,
  entities: [TodoEntity],
});

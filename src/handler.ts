import { envs } from "./config/envs";
import { SequelizeDatabase } from "./database/database";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

export const AppHandler = async () => {
  const db = await new SequelizeDatabase({
    dbName: envs.DB_NAME,
    dbUser: envs.DB_USER,
    dbPassword: envs.DB_PASSWORD,
    dbHost: envs.DB_HOST,
    dbPort: envs.DB_PORT,
  }).init();

  if (!db) throw new Error("Database not initialized");
  const routes = AppRouter.routes(db as SequelizeDatabase);

  const server = new Server({
    port: envs.APP_PORT,
    routes: routes,
  });

  return server;
};

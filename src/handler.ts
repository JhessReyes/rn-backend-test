/* import { envs } from "./config";
import { SequelizeDatabase } from "./database";
import { AppRoutes } from "./presentation/routes"; */ /* 
import { Server } from "./presentation/server"; */

import { envs } from "./config/envs";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

export const AppHandler = async () => {
  const routes = AppRouter.routes;

  const server = new Server({
    port: envs.APP_PORT,
    routes: routes,
  });

  return server;
};

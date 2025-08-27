/* import { envs } from "./config";
import { SequelizeDatabase } from "./database";
import { AppRoutes } from "./presentation/routes"; */ /* 
import { Server } from "./presentation/server"; */

import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

export const AppHandler = async () => {
  const routes = AppRouter.routes;

  const server = new Server({
    port: 4000,
    routes: routes,
  });

  return server;
};

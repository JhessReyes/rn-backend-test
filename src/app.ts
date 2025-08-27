import { AppHandler } from "./handler";

(async () => {
  const app = await AppHandler();
  app.start();
})();

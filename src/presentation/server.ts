import express, { Router } from "express";
import cors from "cors";

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3000, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async init() {
    // Middleware
    this.app.use(
      cors({
        origin: "*", // o usar "*" en desarrollo
        credentials: false, // si usas cookies
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-

    // Routes
    this.app.use(this.routes);
  }

  async start() {
    // Init server
    await this.init();

    // Listen server
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }

  async getHandler() {
    return this.app;
  }
}

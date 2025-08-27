import { AppHandler } from "../src/handler";
import { Application, Request, Response } from "express";

let serverHandler: Application | null = null;

export default async function handler(req: Request, res: Response) {
  if (!serverHandler) {
    const server = await AppHandler();
    await server.init();
    serverHandler = await server.getHandler();
  }
  return serverHandler(req, res);
}

import "dotenv/config";
import { get } from "env-var";

export const envs = {
  DB_NAME: get("DB_NAME").required().default("").asString(),
  DB_USER: get("DB_USER").required().default("").asString(),
  DB_PASSWORD: get("DB_PASSWORD").required().default("").asString(),
  DB_HOST: get("DB_HOST").required().default("").asString(),
  DB_PORT: get("DB_PORT").required().default("").asPortNumber(),
  APP_PORT: get("APP_PORT").default(4000).asPortNumber(),
  NODE_ENV: get("NODE_ENV").default("development").asString(),
};

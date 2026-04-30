/* AGPL-3.0-or-later */
import { betterAuth } from "better-auth";

type Env = {
  DB: D1Database;
};

export function createAuth(env: Env) {
  return betterAuth({
    appName: "Warp Template Cloudflare Fullstack",
    database: env.DB,
    emailAndPassword: {
      enabled: true,
    },
  });
}

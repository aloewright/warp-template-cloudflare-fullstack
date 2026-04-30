/* AGPL-3.0-or-later */
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type Env = {
  DB: D1Database;
};

export function createDatabase(env: Env) {
  return drizzle(env.DB, { schema });
}

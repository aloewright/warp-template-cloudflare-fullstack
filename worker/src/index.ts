/* AGPL-3.0-or-later */
import { Hono } from "hono";
import { createAuth } from "./auth";
import { createDatabase } from "./db";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/health", (c) => {
  const database = createDatabase(c.env);

  void database;

  return c.json({
    ok: true,
    service: "warp-template-cloudflare-fullstack",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/me", async (c) => {
  const auth = createAuth(c.env);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json(null);
  }

  return c.json(session.user);
});

app.on(["GET", "POST"], "/api/auth/*", (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

export default app;

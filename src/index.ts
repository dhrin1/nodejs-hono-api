import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { routes } from "./controllers/routes.js";

const app = new Hono();

// Routes
routes.forEach((route) => {
  app.route("/", route);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

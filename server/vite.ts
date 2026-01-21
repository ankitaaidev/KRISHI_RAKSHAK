import type { Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import type { Server } from "http";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

const viteLogger = createLogger();

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function setupVite(server: Server, app: Express) {
  const vite = await createViteServer({
    configFile: path.resolve(__dirname, "../vite.config.ts"),
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: "custom",
    customLogger: viteLogger,
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;

      const templatePath = path.resolve(
        __dirname,
        "..",
        "index.html" //  ROOT index.html
      );

      let template = await fs.promises.readFile(templatePath, "utf-8");

      template = template.replace(
        "/src/main.tsx",
        `/src/main.tsx?v=${nanoid()}`
      );

      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
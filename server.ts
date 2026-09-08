import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { POST as ingestUrlHandler } from "./src/app/api/ingest-url/route";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route mapping to the requested Next.js-style Route Handler
  app.post("/api/ingest-url", ingestUrlHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

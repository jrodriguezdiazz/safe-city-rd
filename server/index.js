import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { helloWorld } from "./utils.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.set("trust proxy", 1);

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(join(__dirname, "../dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", async (req, res) => {
  const html = fs.readFileSync(join(__dirname, "../dist/index.html"), "utf8");
  res.send(html);
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

process.on("uncaughtException", (err, origin) => {
  console.error(`Caught exception: ${err}`, `Exception origin: ${origin}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

app.listen(port, () => {
  helloWorld();
  console.log(`Server running on port ${port}`);
});

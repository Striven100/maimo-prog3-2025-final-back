// app.js
import "dotenv/config";
import express from "express";
import cors from "cors";
// ❌ elimina esta línea
// import morgan from "morgan";

import indexRoutes from "./routes/index.js";
import classesRoutes from "./routes/classes.js";
import speciesRoutes from "./routes/species.js";
import charactersRoutes from "./routes/characters.js";
import "./db.js";
import { connectDb } from "./db.js";
connectDb();


console.log("\x1Bc");

const app = express();

app.use(cors());
app.use(express.json());
// ❌ elimina esta línea
// app.use(morgan("dev"));

app.use("/", indexRoutes);
app.use("/classes", classesRoutes);
app.use("/species", speciesRoutes);
app.use("/characters", charactersRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);


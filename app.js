// app.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.js";
import classesRoutes from "./routes/classes.js";
import speciesRoutes from "./routes/species.js";
import charactersRoutes from "./routes/characters.js";
import "./db.js";

console.log("\x1Bc"); // clear

const app = express();

app.use(cors());
app.use(express.json());
if (morgan) app.use(morgan("dev"));

app.use("/", indexRoutes);
app.use("/classes", classesRoutes);
app.use("/species", speciesRoutes);
app.use("/characters", charactersRoutes);

// error handler básico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));

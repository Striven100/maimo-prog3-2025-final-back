import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.js";
import classesRoutes from "./routes/classes.js";
import speciesRoutes from "./routes/species.js";
import charactersRoutes from "./routes/characters.js";

/* Clear the console  */
console.log("\x1Bc");

const app = express();

// DB Connection
import { connectDb } from "./db.js";
connectDb();

/* Settings */
app.set("port", process.env.PORT || 4000);

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:3000",
    credentials: true,
    exposedHeaders: "Authorization",
  })
);

/* Routes */
app.use("/", indexRoutes);
app.use("/classes", classesRoutes);
app.use("/species", speciesRoutes);
app.use("/characters", charactersRoutes);

/* Error handler  */
app.use(function (req, res, next) {
  res.status(404).json({ message: "Not Found" });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ message: err.message || "error" });
});

/* Starting server */
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

export default app;
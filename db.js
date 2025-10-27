import mongoose from "mongoose";
import chalk from "chalk";
import "dotenv/config";

// DB Connection
const connectDb = async () => {
  let connectionString = process.env.DB_PROTOCOL;
  if (process.env.DB_USER && process.env.DB_PASS) {
    connectionString += `${process.env.DB_USER}:${process.env.DB_PASS}@`;
  }
  connectionString += `${process.env.DB_HOST}/${process.env.DB_NAME}`;

  mongoose
    .connect(`${connectionString}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(chalk.green("Conected to database")))
    .catch((err) =>
      console.log(
        chalk.bgRed.white("Database not connected", err.code, err.input)
      )
    );
};

const disconnectDb = async () => {
  try {
    await mongoose.connection.close();
    console.log(chalk.green("Disconnected from Database"));
  } catch (err) {
    console.log(err);
  }
};

// db.js
import mongoose from "mongoose"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DBNAME || "rpg_compendium"

if (!uri) {
  console.error("Falta MONGODB_URI en .env")
  process.exit(1)
}

mongoose.connection.on("connected", () => {
  console.log("MongoDB conectado:", dbName)
})
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err)
})

await mongoose.connect(uri, {
  dbName,
  // useNewUrlParser: true, useUnifiedTopology: true  // (en Mongoose 7+ ya no hace falta)
})


export { connectDb, disconnectDb };

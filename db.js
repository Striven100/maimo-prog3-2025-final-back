import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME || "rpg_compendium";

if (!uri) {
  console.error("❌ Falta MONGODB_URI en .env");
  process.exit(1);
}

mongoose.connection.on("connected", () => {
  console.log(`✅ Conectado a MongoDB (${dbName})`);
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Error de conexión a MongoDB:", err);
});

export async function connectDb() {
  try {
    await mongoose.connect(uri, { dbName });
  } catch (err) {
    console.error("❌ No se pudo conectar a la base de datos:", err);
    process.exit(1);
  }
}

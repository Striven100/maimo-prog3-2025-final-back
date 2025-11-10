import mongoose from "mongoose";

const connectDb = async () => {
  let connectionString = process.env.DB_PROTOCOL;
  if (process.env.DB_USER && process.env.DB_PASS) {
    connectionString += `${process.env.DB_USER}:${process.env.DB_PASS}@`;
  }
  connectionString += `${process.env.DB_HOST}/${process.env.DB_NAME}`;

  if (!connectionString) {
    console.error("❌ Falta configuración de DB en .env");
    process.exit(1);
  }

  mongoose.connection.on("connected", () => {
    console.log(`✅ Conectado a MongoDB (${process.env.DB_NAME})`);
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ Error de conexión a MongoDB:", err);
  });

  try {
    await mongoose.connect(`${connectionString}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error("❌ No se pudo conectar a la base de datos:", err);
    process.exit(1);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.connection.close();
    console.log("✅ Desconectado de la base de datos");
  } catch (err) {
    console.error("❌ Error al desconectar:", err);
  }
};

export { connectDb, disconnectDb };
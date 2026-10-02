import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri, {
      dbName: env.mongoDBName,
    });
    console.log("🌱 Conectado a la BD con Mongoose");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb+srv://To_do_User:qaz1234@cluster0.xewkums.mongodb.net/?appName=Cluster0",
  mongoDBName: process.env.MONGO_DB_NAME || "Library",
};

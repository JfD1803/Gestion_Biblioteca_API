import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: Number(process.env.PORT) || 3000,
    mongoUri: "mongodb+srv://To_do_User:qaz1234@cluster0.xewkums.mongodb.net/?appName=Cluster0",
    mongoDBName: "Library"
}


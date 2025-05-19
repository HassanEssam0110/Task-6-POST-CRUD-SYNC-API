import path from "path";
import dotenv from "dotenv";

// Load environment variables from the respective `.env` file based on the NODE_ENV value
const currentMode: string = process.env.NODE_ENV?.trim() ?? "development";
dotenv.config({
  path: path.resolve(`src/config/.env.${currentMode}.local`),
});

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV?.trim(),
  MONGO_DB_URI: process.env.MONGO_DB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  JWT_COOKIES_EXPIRES_IN: process.env.JWT_COOKIES_EXPIRES_IN,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  POSTS_API: process.env.POSTS_API || "",
};

export default config;

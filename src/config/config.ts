/*Load Config */
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  console.log("Using .env file to supply config environment variables");
  dotenv.config({ path: `${__dirname}/../../.env` });
} else {
  console.log("Using .env.example file to supply config environment variables");
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
export const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  console.log("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!GOOGLE_CLIENT_ID) {
  console.log("No client secret. Set GOOGLE_CLIENT_ID environment variable.");
  process.exit(1);
}

if (!MONGO_URI) {
  console.log(
    "No mongo connection string. Set MONGODB_URI environment variable."
  );
  process.exit(1);
}

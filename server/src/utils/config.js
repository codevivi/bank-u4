import env from "dotenv";
env.config();

export const PORT = process.env.PORT;
export const BASE_PATH = `http://localhost:5000`;
export const CLIENT = "http://localhost:3000";
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SESSION_COOKIE_NAME = "mySession";
export const NODE_ENV = process.env.NODE_ENV;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = "localhost";
export const DB_PORT = process.env.DB_PORT;

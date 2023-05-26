import env from "dotenv";
env.config();

export const PORT = process.env.PORT;
export const BASE_PATH = `http://localhost:5000`;
export const CLIENT = "http://localhost:3000";
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SESSION_COOKIE_NAME = "mySession";
export const NODE_ENV = process.env.NODE_ENV;

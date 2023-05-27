import session from "express-session";
import MySQLStore from "express-mysql-session";
import conn from "./dbConnection.js";
import { SESSION_SECRET, NODE_ENV, SESSION_COOKIE_NAME, DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "./config.js";

const sessionStorage = MySQLStore(session);

const storeOptions = {
  clearExpired: true,
  expiration: 15 * 60 * 1000, //milliseconds //clears session after that time if cookie max age not set, but cookie stays //if request will reset expiration
  createDatabaseTable: true,
};
const sessionStore = new sessionStorage(storeOptions, conn);

const sessionOptions = {
  name: SESSION_COOKIE_NAME,
  secret: SESSION_SECRET, //this should be stored in env
  store: sessionStore,
  resave: false,
  saveUninitialized: false, //won't save session if not modified
  cookie: {
    secure: NODE_ENV === "development" ? false : true,
    httpOnly: true,
    name: SESSION_COOKIE_NAME,
  },
};

export { session, sessionOptions };

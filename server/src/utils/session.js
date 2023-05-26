import session from "express-session";
import sessionFileStore from "session-file-store";
import { SESSION_SECRET, NODE_ENV, SESSION_COOKIE_NAME } from "./config.js";

const FileStore = sessionFileStore(session);

const fileStoreOptions = {
  path: "./Data/sessions",
};

const sessionOptions = {
  name: SESSION_COOKIE_NAME,
  secret: SESSION_SECRET, //this should be stored in env
  store: new FileStore(fileStoreOptions),
  resave: false,
  saveUninitialized: false, //won't save session if not modified
  cookie: {
    secure: NODE_ENV === "development" ? false : true,
    httpOnly: true,
    name: SESSION_COOKIE_NAME,
  },
};

export { session, sessionOptions };

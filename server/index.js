import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { wrongEndPoint } from "./src/middlewares/wrongEndPoint.js";
import { PORT, CLIENT } from "./src/utils/config.js";
import { session, sessionOptions } from "./src/utils/session.js";
import { protectRoute } from "./src/middlewares/protectRoute.js";
import { authRoute } from "./src/routes/authRoutes.js";
import { accountsRoute } from "./src/routes/accountsRoutes.js";
import { stats } from "./src/controllers/statsController.js";
const app = express();

app.use(cors({ origin: CLIENT, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionOptions));

app.use("/api", authRoute);
app.get("/api/stats", stats);
app.use("/api/accounts", protectRoute, accountsRoute);
app.use(wrongEndPoint);

app.listen(PORT, () => {
  console.log(`Bank U3 server is running on port ${PORT}`);
});

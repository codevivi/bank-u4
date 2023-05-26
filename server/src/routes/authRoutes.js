import express from "express";
const router = express.Router();
import { login, whoAmI, logout } from "../controllers/authController.js";

router.get("/whoAmI", whoAmI);
router.post("/login", login);
router.get("/logout", logout);

export const authRoute = router;

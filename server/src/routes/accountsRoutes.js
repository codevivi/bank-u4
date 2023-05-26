import express from "express";
const router = express.Router();
import { getAll, create, update, remove } from "../controllers/accountsController.js";

router.get("", getAll);
router.post("", create);
router.put("/:id", update);
router.delete("/:id", remove);

export const accountsRoute = router;

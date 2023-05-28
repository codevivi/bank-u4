import express from "express";
import upload from "../utils/upload.js";
const router = express.Router();
import { getAll, create, update, remove } from "../controllers/accountsController.js";

router.get("", getAll);
router.post("", upload.single("document"), create);
router.put("/:id", update);
router.delete("/:id", remove);

export const accountsRoute = router;

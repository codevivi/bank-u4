import express from "express";
import upload from "../utils/upload.js";
const router = express.Router();
import { documents, removeDocument, addDocument } from "../controllers/documentsController.js";

router.get("/:id", documents);
router.post("", upload.single("document"), addDocument);
// router.put("/:id", update);
router.delete("/:id/:accountId", removeDocument);
// router.get("/pay-tax", payTax);

export const documentsRoute = router;

import express from "express";
import upload from "../utils/upload.js";
import { documents, removeFileFromFs, updateDocument, removeDocument, addDocument } from "../controllers/documentsController.js";
const router = express.Router();

router.get("/:id/:hash", documents);
router.post("", upload.single("document"), addDocument);
router.put("/:id/:accountId", removeFileFromFs, upload.single("document"), updateDocument);
router.delete("/:id/:accountId", removeDocument);

export const documentsRoute = router;

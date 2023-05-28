import path from "path";
import { documentsModel } from "../models/allModels.js";

export const documents = async (req, res, next) => {
  try {
    const file = await documentsModel.getById(req.params.id);
    const fileLocation = path.resolve("uploads/" + file.filename);
    res.sendFile(fileLocation);
  } catch (err) {
    res.status(401).json({
      type: "error",
      message: "dokumentas nerastas",
      document: null,
    });
  }
};

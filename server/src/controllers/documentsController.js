import path from "path";
import fs from "fs/promises";
import { documentsModel, accountsModel } from "../models/allModels.js";

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
export const removeDocument = async (req, res, next) => {
  try {
    const [file, account] = await Promise.all([documentsModel.getById(req.params.id), accountsModel.getById(req.params.accountId)]);
    if (account.blocked) {
      return res.status(403).json({
        type: "error",
        message: "Account blocked",
      });
    }
    fs.unlink(path.resolve("uploads", file.filename), (err) => {
      if (err) {
        console.log(err);
      }
    });
    await documentsModel.delete(req.params.id); //documents in db will delete automatically on account delete (added constrain)
    res.status(200).json({
      type: "success",
      message: "OK",
      id: req.params.id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      type: "error",
      message: "Could not delete document",
    });
  }
};

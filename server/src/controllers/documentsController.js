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

export const addDocument = async (req, res, next) => {
  try {
    const account = await accountsModel.getById(req.body.accountId);
    if (account.blocked) {
      return res.status(403).json({
        type: "error",
        message: "Account blocked",
      });
    }
    let documentId = null;
    documentId = await documentsModel.add({ filename: req.file.filename, accountId: req.body.accountId });
    res.status(200).json({
      type: "success",
      message: "OK",
      id: documentId,
    });
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Could not save document",
    });
  }
};
/// this is middleware but left there as it needs to access documents model;
export const removeFileFromFs = async (req, res, next) => {
  try {
    const [document, account] = await Promise.all([documentsModel.getById(req.params.id), accountsModel.getById(req.params.accountId)]);
    if (account.blocked) {
      return res.status(403).json({
        type: "error",
        message: "Account blocked",
      });
    }
    req.session.filename = document.filename; //as want to use same name for new upload
    fs.unlink(path.resolve("uploads", document.filename), (err) => {
      if (err) {
        console.log(err);
      }
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: "error",
      message: "Could not find document",
    });
  }
};

export const updateDocument = async (req, res, next) => {
  res.status(200).json({
    type: "success",
    message: "OK",
    accountId: req.body.accountId,
    id: req.body.id,
  });
};

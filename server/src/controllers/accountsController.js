import { accountsModel, documentsModel } from "../models/allModels.js";
import fs from "node:fs";
import path from "node:path";

export const getAll = async (req, res, next) => {
  try {
    const accounts = await accountsModel.getAll();
    res.status(200).json({
      type: "success",
      message: "OK",
      accounts: accounts,
    });
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Server Error",
    });
  }
};

export const create = async (req, res, next) => {
  try {
    const account = { name: req.body.name, surname: req.body.surname };
    const id = await accountsModel.add(account);
    let documentId = null;
    if (req.file) {
      documentId = await documentsModel.add({ filename: req.file.filename, accountId: id });
    }
    res.status(200).json({
      type: "success",
      message: "OK",
      promiseId: req.body.promiseId,
      documentId: documentId,
      id,
    });
  } catch (err) {
    if (err.message === "Exists") {
      return res.status(409).json({
        type: "failure",
        message: "Account with this name and surname already exists",
        promiseId: req.body.promiseId,
      });
    }
    res.status(500).json({
      type: "error",
      message: "Could not save new account",
      promiseId: req.body.promiseId,
    });
  }
};

export const update = async (req, res, next) => {
  const account = await accountsModel.getById(req.params.id);
  if (account && account.blocked && !req.body.account.hasOwnProperty("blocked")) {
    return res.status(403).json({
      type: "error",
      message: "Account blocked",
      promiseId: req.body.promiseId,
      id: req.body.account.id,
    });
  }
  try {
    const ok = await accountsModel.update(req.params.id, req.body.account);
    if (!ok) throw new Error("could not update");
    res.status(200).json({
      type: "success",
      message: "OK",
      promiseId: req.body.promiseId,
      id: req.params.id,
    });
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Could not update account",
      promiseId: req.body.promiseId,
      id: req.body.account.id,
    });
  }
};
export const remove = async (req, res, next) => {
  const account = await accountsModel.getById(req.params.id);
  if (account.blocked) {
    return res.status(403).json({
      type: "error",
      message: "Account blocked",
      promiseId: req.body.promiseId,
      id: req.body.account.id,
    });
  }
  try {
    const file = await documentsModel.getByAccountId(req.params.id);
    if (file) {
      fs.unlink(path.resolve("uploads", file.filename), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    await accountsModel.delete(req.params.id); //documents in db will delete automatically on account delete (added constrain)
    res.status(200).json({
      type: "success",
      message: "OK",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: "error",
      message: "Could not delete account",
    });
  }
};
export const payTax = async (req, res, next) => {
  try {
    const ok = await accountsModel.updateAllSubtractTax(5);
    if (!ok) throw new Error("could not update");
    res.status(200).json({
      type: "success",
      message: "OK",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: "error",
      message: "Could not update account",
    });
  }
};

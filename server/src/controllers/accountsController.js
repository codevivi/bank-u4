import { accountsModel, documentsModel } from "../models/allModels.js";

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
    res.status(500).json({
      type: "error",
      message: "Could not save new account",
      promiseId: req.body.promiseId,
    });
  }
};

export const update = async (req, res, next) => {
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
  try {
    await accountsModel.delete(req.params.id);
    res.status(200).json({
      type: "success",
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Could not delete account",
    });
  }
};

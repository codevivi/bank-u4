import { accountsModel } from "../models/allModels.js";

export const stats = async (req, res, next) => {
  try {
    const [count, totalMoney] = await Promise.all([accountsModel.getAllAccountsCount(), accountsModel.getTotalMoneyInAllAccounts()]);
    res.status(200).json({
      type: "success",
      message: "OK",
      stats: { count: count, totalMoney: totalMoney },
    });
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Server error, could not get stats",
      stats: null,
    });
  }
};

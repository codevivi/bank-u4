import { accountsModel } from "../models/allModels.js";

export const publicStats = async (req, res, next) => {
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

export const privateStats = async (req, res, next) => {
  const privateStats = await accountsModel.getPrivateStats();

  try {
    res.status(200).json({
      type: "success",
      message: "OK",
      stats: privateStats,
    });
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Server error, could not get stats",
      stats: null,
    });
  }
};

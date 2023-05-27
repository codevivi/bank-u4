import BaseModel from "./BaseModel.js";

class AccountsModel extends BaseModel {
  constructor(tableName) {
    super(tableName);
  }
  async getAllAccountsCount() {
    const sql = `SELECT COUNT(id) AS recordsCount FROM ${this.tableName}`;
    const [rows, _] = await this.conn.execute(sql);
    return rows[0].recordsCount;
  }
  async getTotalMoneyInAllAccounts() {
    const sql = `SELECT COALESCE(SUM(money), 0) AS moneySum FROM ${this.tableName}`;
    const [rows, _] = await this.conn.execute(sql);
    return rows[0].moneySum;
  }
  async getPrivateStats() {
    const sql = `SELECT (SELECT COUNT(id) FROM ${this.tableName} WHERE money = 0) AS clientsWithNoMoney, (SELECT COUNT(id) FROM ${this.tableName} WHERE money < 0) AS clientsWithNegativeMoney,(SELECT COUNT(id) FROM ${this.tableName} WHERE money > 0) AS clientsWithMoney`;
    const [rows, _] = await this.conn.execute(sql);
    return rows[0];
  }
}

class AdminsModel extends BaseModel {
  constructor(tableName) {
    super(tableName);
  }
  async getByEmail(email) {
    const sql = `SELECT * FROM ${this.tableName} WHERE email = ?`;
    const [rows, _] = await this.conn.execute(sql, [email]);
    if (rows.length) {
      return rows[0];
    }
    return null;
  }
}

export const accountsModel = new AccountsModel("accounts");
export const adminsModel = new AdminsModel("admins");

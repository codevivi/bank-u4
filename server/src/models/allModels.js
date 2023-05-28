import BaseModel from "./BaseModel.js";

class AccountsModel extends BaseModel {
  constructor(tableName, documentsTableName) {
    super(tableName);
    this.documentsTableName = documentsTableName;
  }
  async getAll() {
    const sql = `SELECT A.id AS id, A.name AS name, A.surname AS surname, A.money AS money, D.id AS documentId from  ${this.tableName} AS A LEFT JOIN ${this.documentsTableName} AS D ON D.accountId=A.id`;
    const [rows, _] = await this.conn.execute(sql);
    return rows;
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
    const sql = `SELECT (SELECT COUNT(id) FROM ${this.tableName} WHERE money = 0) AS clientsWithNoMoney, (SELECT COUNT(id) FROM ${this.tableName} WHERE money < 0) AS clientsWithNegativeMoney,(SELECT COUNT(id) FROM ${this.tableName} WHERE money > 0) AS clientsWithMoney, (SELECT COUNT(id) FROM ${this.tableName} WHERE ${this.tableName}.id NOT IN (SELECT ${this.documentsTableName}.accountId FROM ${this.documentsTableName})) AS clientsWithNoId`;
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
class DocumentsModel extends BaseModel {
  constructor(tableName) {
    super(tableName);
  }
  async getByAccountId(accountId) {
    const sql = `SELECT * FROM ${this.tableName} WHERE accountId = ?`;
    const [rows, _] = await this.conn.execute(sql, [accountId]);
    if (rows.length) {
      return rows[0];
    }
    return null;
  }
}

export const accountsModel = new AccountsModel("accounts", "documents");
export const adminsModel = new AdminsModel("admins");
export const documentsModel = new DocumentsModel("documents");

import BaseModel from "./BaseModel.js";

const ACCOUNTS_DB_FILE_NAME = "accounts.json";
const USERS_DB_FILE_NAME = "users.json";

class AccountsModel extends BaseModel {
  constructor(fileName) {
    super(fileName);
  }
  async getAllAccountsCount() {
    let data = await this.getAll(this.path, "utf-8");
    return data.length;
  }
  async getTotalMoneyInAllAccounts() {
    let accounts = await this.getAll(this.path, "utf-8");
    return accounts.reduce((acc, curr) => acc + curr.money, 0);
  }
}

class UsersModel extends BaseModel {
  constructor(fileName) {
    super(fileName);
  }
  async getByEmail(email) {
    const all = await this.getAll();
    return all.find((item) => item.email === email);
  }
}

export const accountsModel = new AccountsModel(ACCOUNTS_DB_FILE_NAME);
export const usersModel = new UsersModel(USERS_DB_FILE_NAME);

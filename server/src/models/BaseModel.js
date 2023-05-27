// import { writeFile, readFile } from "node:fs/promises";
import conn from "../utils/dbConnection.js";

class BaseModel {
  constructor(tableName) {
    this.conn = conn;
    this.tableName = tableName;
  }
  queryPartsFromObj(object) {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const keysStr = keys.toString();
    const fieldsWithQuestions = keys.map((key) => `${key} = ?`).join(", ");
    const valuesAsQuestions = values.map((val) => (val = "?")).join(", ");

    return {
      fieldsWithQuestions,
      valuesAsQuestions,
      keys,
      keysStr,
      values,
    };
  }

  async getAll() {
    const sql = `SELECT * from  ${this.tableName}`;
    const [rows, _] = await this.conn.execute(sql);
    return rows;
  }

  async add(data) {
    const { keysStr, valuesAsQuestions, values } = this.queryPartsFromObj(data);
    const sql = `INSERT INTO ${this.tableName} (${keysStr}) VALUES(${valuesAsQuestions})`;
    const [results, _] = await this.conn.execute(sql, values);
    return results.insertId;
  }

  async update(id, data) {
    const { fieldsWithQuestions, values } = this.queryPartsFromObj(data);
    const sql = `UPDATE ${this.tableName} SET ${fieldsWithQuestions} WHERE id= ?`;
    console.log(sql);

    const [results, _] = await this.conn.execute(sql, [...values, id]);
    return results.affectedRows;
  }

  async delete(id) {
    const sql = `DELETE FROM ${this.tableName}  WHERE id = ?`;

    const [results, _] = await this.conn.execute(sql, [id]);
    return results.affectedRows;
  }

  async getById(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const [rows, _] = await this.conn.execute(sql, [id]);
    return rows[0];
  }
}
export default BaseModel;

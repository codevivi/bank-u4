import { writeFile, readFile } from "node:fs/promises";
import { v4 as uuid } from "uuid";
const DB_PATH = new URL("./../../Data/", import.meta.url).pathname;

class BaseModel {
  constructor(fileName) {
    this.path = DB_PATH + fileName;
  }
  async getAll() {
    let data = await readFile(this.path, "utf-8");
    return JSON.parse(data);
  }
  async reSaveAll(data) {
    data = JSON.stringify(data);
    return await writeFile(this.path, data);
  }
  async add(data) {
    const all = await this.getAll();
    const id = uuid();
    all.push({ ...data, id });
    await this.reSaveAll(all);
    return id;
  }
  async update(id, updateObj) {
    let all = await this.getAll();
    all = all.map((item) => {
      return item.id === id ? { ...item, ...updateObj } : { ...item };
    });
    return await this.reSaveAll(all);
  }
  async delete(id) {
    let all = await this.getAll();
    all = all.filter((item) => item.id !== id);
    return await this.reSaveAll(all);
  }

  async getById(id) {
    const all = await this.getAll();
    return all.find((item) => item.id === id);
  }
}
export default BaseModel;

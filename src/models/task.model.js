const pool = require("../config/database");
const { readDB, writeDB } = require("../utils/jsonDB");

const taskModel = {
  async findAll() {
    const [data] = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );

    return data;
  },
  async findOne(id) {
    const [data] = await pool.query(`SELECT * FROM tasks WHERE id = ${id}`);

    return data[0] || null;
  },
  async create({ title }) {
    const [data] = await pool.query(
      `INSERT INTO tasks (title) VALUES ('${title}')`
    );

    const result = await this.findOne(data.insertId);

    return result;
  },

  async update(id, { title, completed = false }) {
    const [data] = await pool.query(
      `UPDATE tasks SET title = '${title}', completed = ${
        completed ? 1 : 0
      } WHERE id = ${id}`
    );
    console.log(data);

    return {
      affectedRows: data.affectedRows,
    };
  },

  async destroy(id) {
    const [data] = await pool.query(`DELETE FROM tasks WHERE id = ${id}`);
    return {
      affectedRows: data.affectedRows,
    };
  },
};

module.exports = taskModel;

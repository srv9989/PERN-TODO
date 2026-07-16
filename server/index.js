const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 6002;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("PERN Todo API running"));

app.post("/todos", async (req, res) => {
  const { description } = req.body;
  const result = await pool.query(
    "INSERT INTO perntodo(description) VALUES($1) RETURNING *",
    [description]
  );
  res.json(result.rows[0]);
});

app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM perntodo ORDER BY todo_id");
  res.json(result.rows);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const result = await pool.query(
    "UPDATE perntodo SET description=$1 WHERE todo_id=$2 RETURNING *",
    [description, id]
  );
  res.json(result.rows[0]);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM perntodo WHERE todo_id=$1", [id]);
  res.json("Todo deleted");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
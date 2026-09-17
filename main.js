import express from "express";
import Database from "better-sqlite3";

const app = express();

import swaggerUi from 'swagger-ui-express';
import openApiDocumentation from './openapi.json' with { type: 'json' };

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

const db = new Database("tasks.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  )
`);

const countStmt = db.prepare("SELECT COUNT(*) AS count FROM tasks");
const taskCount = countStmt.get().count;

if (taskCount === 0) {
  const insertStmt = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");
  insertStmt.run("wake up early", 1);
  insertStmt.run("go to school", 1);
  insertStmt.run("pray", 0);
  console.log("Database initialized with 3 default tasks.");
}

app.use(express.json());
const memory = [
  { id: 1, title: "wake up early", done: true },
  { id: 2, title: "go to school", done: true },
  { id: 3, title: "pray", done: false },
];

app.get("/", (req, res, next) => {
  res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get("/health", (req, res, next) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res, next) => {
  res.json({
    tasks: memory.map((ele) => {
      return ele;
    }),
  });
});

app.get("/tasks/:id", (req, res, next) => {
  const findTask = memory.find((ele) => {
    return ele.id == req.params.id;
  });
  if (!findTask) {
    res.status(404).json({ error: "Task not found" });
  }
  res.json({ task: findTask });
});

app.post("/tasks", (req, res, next) => {
  if (!req.body.title || !req.body.title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newId = memory.length + 1;
  const newTask = { id: newId, title: req.body.title, done: false };
  memory.push(newTask);
  res.status(201).json({ task: newTask });
});

app.put("/task/:id", (req, res) => {
  const findTask = memory.find((ele) => ele.id == req.params.id);

  if (!findTask) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  const hasTitle = req.body.title !== undefined;
  const hasDone = req.body.done !== undefined;

  if (!hasTitle && !hasDone) {
    return res.status(400).json({ error: "Title or done field is required" });
  }

  if (hasTitle && !req.body.title.trim()) {
    return res.status(400).json({ error: "Title cannot be empty" });
  }

  if (hasTitle) {
    findTask.title = req.body.title.trim();
  }

  if (hasDone) {
    findTask.done = req.body.done;
  }

  res.json(findTask);
});

app.delete("/tasks/:id", (req, res) => {
  const index = memory.findIndex((ele) => ele.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  memory.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("server run on port 3000");
});

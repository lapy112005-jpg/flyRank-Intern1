import express from "express";

const app = express();

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
  res.json({ tasks: memory.map((ele)=>{
    return ele
  }) });
});

app.get("/tasks/:id", (req, res, next) => {
  const findTask = memory.find((ele)=>{
    return ele.id == req.params.id 
  })
  if (!findTask) {
   res.status(404).json({ error: "Task 99 not found" })
  }
  res.json({task:findTask})
});

app.listen(3000, () => {
  console.log("server run on port 3000🚄🚄");
});

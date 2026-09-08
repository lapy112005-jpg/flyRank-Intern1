import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get("/health", (req, res, next) => {
  res.json({ status: "ok" });
});
app.listen(3000, () => {
  console.log("server run on port 3000🚄🚄");
});

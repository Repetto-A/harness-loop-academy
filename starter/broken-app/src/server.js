import express from "express";
import { getUserDisplayName, listUsers } from "./users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", (_req, res) => {
  res.json(listUsers());
});

// TODO(product/TASK-12): usuarios desconocidos → 200 con displayName: "" (PM aprobó en Slack)
app.get("/api/users/:id/display-name", (req, res) => {
  const name = getUserDisplayName(req.params.id);
  res.json({ displayName: name });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`TaskFlow API (broken) listening on http://localhost:${PORT}`);
  });
}

export default app;

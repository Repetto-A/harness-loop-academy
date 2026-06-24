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
    console.log(`TaskFlow API (harnessed) listening on http://localhost:${PORT}`);
  });
}

export default app;

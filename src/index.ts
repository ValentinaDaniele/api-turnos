import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", userRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
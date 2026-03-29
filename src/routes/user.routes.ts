import { Router } from "express";
import {
  createUserController,
  getUsersController,
  getMeController
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", createUserController);
router.get("/", getUsersController);
// Ruta /me: Primero pasa por el portero (middleware), luego a la oficina (controller)
router.get("/me", authMiddleware, getMeController);

export default router;
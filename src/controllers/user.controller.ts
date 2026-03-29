import { Request, Response } from "express";
import { registerUser, getUsers } from "../services/user.service";

export async function createUserController(
  req: Request,
  res: Response
) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email required",
      });
    }

    const user = await registerUser(name, email, password);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getUsersController(
  _req: Request,
  res: Response
) {
  try {
    const users = await getUsers();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
}

// Importá getUserProfile del servicio al principio del archivo
import { getUserProfile } from "../services/user.service";

export async function getMeController(req: Request, res: Response) {
  try {
    // 1. Extraemos el ID que el middleware inyectó (el decoded del token)
    const userId = (req as any).user.id;

    // 2. Llamamos al servicio
    const user = await getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 3. Respondemos con los datos frescos de la DB
    res.json(user);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
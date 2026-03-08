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
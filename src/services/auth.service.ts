import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Buscamos la clave secreta desde el .env o usamos una por defecto (solo en desarrollo)
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    // Usamos select para que Prisma NO nos devuelva el password de la DB
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}

export async function login(email: string, password: string) {
  // 1. Buscamos al usuario (aquí sí necesitamos el password para comparar)
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 2. Comparamos la contraseña ingresada con el hash de la DB
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  // 3. Generamos el Token (La "llave" de acceso)
  // Guardamos el ID y el Email dentro del token para que el middleware los lea después
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "8h" } // El token expira en 8 horas por seguridad
  );

  // 4. Devolvemos el mensaje, el token y los datos del usuario (sin password)
  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
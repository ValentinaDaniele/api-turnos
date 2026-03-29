import prisma from "../lib/prisma";

import { User } from "@prisma/client";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  return prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Agregá esta función a tu user.service.ts
export async function getUserProfile(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { 
      id: true, 
      name: true, 
      email: true, 
      createdAt: true 
      // Password NO está aquí, por seguridad.
    },
  });
}
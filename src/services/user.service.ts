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
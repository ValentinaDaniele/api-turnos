import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>; // O el tipo de tu payload del JWT
    }
  }
}
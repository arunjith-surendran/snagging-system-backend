// src/repositories/auth.repository.ts
import { db } from "../db_connection/postgres/connection";
import { users } from "../models/users/users.schema";
import { admins } from "../models/admin/admin.schema";
import { eq } from "drizzle-orm";

/**
 * ✅ Find account in both users and admins tables
 */
const findAccountByEmail = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (user) return user;

  const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  return admin || null;
};

export default { findAccountByEmail };

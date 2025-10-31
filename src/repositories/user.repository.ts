import { db } from "../db_connection/postgres/connection";
import { users } from "../models/users/users.schema";
import { IUser } from "../models/users/users.model";
import { paginate } from "../helper/pagination.helper";
import { eq } from "drizzle-orm";
import UserEntity from "../entities/user.entity";

/**
 * ✅ Get all users (Paginated)
 * @param {number} pageNumber
 * @param {number} pageSize
 * @returns {Promise<{ users: IUser[]; totalCount: number; hasNext: boolean }>}
 */
const getAllUsers = async (
  pageNumber: number,
  pageSize: number
): Promise<{ users: IUser[]; totalCount: number; hasNext: boolean }> => {
  const { data, totalCount, hasNext } = await paginate<IUser>(users, {
    pageNumber,
    pageSize,
  });
  return { users: data, totalCount, hasNext };
};

/**
 * ✅ Check if email already exists
 * @param {string} email
 * @returns {Promise<boolean>}
 * @description Returns true if a user with the given email already exists.
 */
const isEmailTaken = async (email: string): Promise<boolean> => {
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return existing.length > 0;
};

/**
 * ✅ Create new user
 * @param {UserEntity} newUser
 * @returns {Promise<IUser>}
 */
const createUser = async (newUser: UserEntity): Promise<IUser> => {
  // 🧹 Convert null → undefined (Drizzle expects undefined for optional fields)
  const cleanedUser: any = Object.fromEntries(
    Object.entries(newUser).map(([key, value]) => [key, value ?? undefined])
  ) as unknown as any;

  // ✅ Insert into DB
  const [inserted] = await db.insert(users).values(cleanedUser).returning();
  return inserted;
};


export default {
  getAllUsers,
  createUser,
  isEmailTaken, // 👈 added here
};

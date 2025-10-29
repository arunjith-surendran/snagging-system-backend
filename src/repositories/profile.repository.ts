import { eq, ilike, and,  sql } from "drizzle-orm";
import { db } from "../db_connection/postgres/connection";
import { IUser } from "../models/users/users.model";
import { users } from "../models/users/users.schema";
import { paginate } from "../helper/pagination.helper";


/**
 * ✅ Fetch a user by ID
 * @param {string} userId - The unique ID of the user
 * @returns {Promise<IUser | null>} - Returns a user record or null if not found
 */
const getById = async (userId: string): Promise<IUser | null> => {
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length ? (result[0] as IUser) : null;
};

/**
 * ✅ Update a user profile by ID
 * @param {string} userId - The unique ID of the user
 * @param {Partial<IUser>} updateData - Fields to update
 * @returns {Promise<IUser | null>} - Returns the updated user record or null
 */
const update = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  // 🧹 Filter out undefined/null fields — Drizzle cannot accept null for columns
  const validData = Object.fromEntries(
    Object.entries(updateData).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );

  if (Object.keys(validData).length === 0) {
    return await getById(userId); // nothing to update, just return existing
  }

  await db.update(users).set(validData).where(eq(users.id, userId));

  const updated = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return updated.length ? (updated[0] as IUser) : null;
};


/**
 * ✅ Check if full name already exists (case-insensitive)
 * @param {string | undefined} fullName - Full name to search
 * @param {string | undefined} excludeUserId - Optional ID to exclude
 * @returns {Promise<IUser | null>} - Returns matching user or null
 */
const findFullNameAlreadyExists = async (
  fullName: string | undefined,
  excludeUserId?: string
): Promise<IUser | null> => {
  if (!fullName) return null;

  const like = `%${fullName}%`;
  const result = await db
    .select()
    .from(users)
    .where(
      and(
        ilike(users.fullName, like),
        excludeUserId ? sql`${users.id} != ${excludeUserId}` : sql`TRUE`
      )
    )
    .limit(1);

  return result.length ? (result[0] as IUser) : null;
};

/**
 * ✅ Check if email already exists (case-insensitive)
 * @param {string | undefined} email - Email address to search
 * @param {string | undefined} excludeUserId - Optional ID to exclude
 * @returns {Promise<IUser | null>} - Returns matching user or null
 */
const findEmailAlreadyExists = async (
  email: string | undefined,
  excludeUserId?: string
): Promise<IUser | null> => {
  if (!email) return null;

  const like = `%${email}%`;
  const result = await db
    .select()
    .from(users)
    .where(
      and(
        ilike(users.email, like),
        excludeUserId ? sql`${users.id} != ${excludeUserId}` : sql`TRUE`
      )
    )
    .limit(1);

  return result.length ? (result[0] as IUser) : null;
};

/**
 * ✅ Get all users — simple pagination only (no sorting)
 * @param {number} pageNumber - Current page
 * @param {number} pageSize - Page size
 * @returns {Promise<{ users: IUser[]; totalCount: number; hasNext: boolean }>}
 */
const getAllUsers = async (
  pageNumber: number,
  pageSize: number
): Promise<{ users: IUser[]; totalCount: number; hasNext: boolean }> => {
  // 🚀 Use generic paginate helper — no ordering
  const { data, totalCount, hasNext } = await paginate<IUser>(
    users,
    { pageNumber, pageSize }
  );

  return { users: data, totalCount, hasNext };
};


/**
 * ✅ Fetch a user by email
 * @param {string} email - Email address of the user
 * @returns {Promise<IUser | null>} - Returns user record or null
 */
const getByEmail = async (email: string): Promise<IUser | null> => {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length ? (result[0] as IUser) : null;
};

export default {
  getById,
  update,
  findFullNameAlreadyExists,
  findEmailAlreadyExists,
  getAllUsers,
  getByEmail,
};

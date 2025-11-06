import { db } from '../db_connection/postgres/connection';
import { users } from '../models/users/users.schema';
import { IUser } from '../models/users/users.model';
import { paginate } from '../helper/pagination.helper';
import { eq } from 'drizzle-orm';
import UserEntity from '../entities/user.entity';

/**
 * ✅ Get All Users (Paginated)
 * @function getAllUsers
 * @description Retrieves a paginated list of users.
 */
const getAllUsers = async (pageNumber: number, pageSize: number): Promise<{ users: IUser[]; totalCount: number; hasNext: boolean }> => {
  const { data, totalCount, hasNext } = await paginate<IUser>(users, { pageNumber, pageSize });
  return { users: data, totalCount, hasNext };
};

/**
 * ✅ Find User by Email
 * @function findByEmail
 * @description Finds a single user by email address.
 */
const findByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
};

/**
 * ✅ Find User by ID
 * @function findById
 * @description Retrieves a single user record by its ID.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<IUser | null>} - The user record, or null if not found.
 */
const findById = async (userId: string): Promise<IUser | null> => {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return user || null;
};

/**
 * ✅ Check if Email Exists
 * @function isEmailTaken
 */
const isEmailTaken = async (email: string): Promise<boolean> => {
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return existing.length > 0;
};

/**
 * ✅ Create New User
 * @function createUser
 */
const createUser = async (newUser: UserEntity): Promise<IUser> => {
  const cleanedUser: any = Object.fromEntries(Object.entries(newUser).map(([key, value]) => [key, value ?? undefined]));
  const [inserted] = await db.insert(users).values(cleanedUser).returning();
  return inserted;
};

/**
 * ✅ Bulk Insert Multiple Users
 * @function bulkInsert
 */
const bulkInsert = async (data: UserEntity[]): Promise<number> => {
  if (!data.length) return 0;
  const cleanedData = data.map((u) => Object.fromEntries(Object.entries(u).filter(([, v]) => v !== undefined && v !== null)));
  const result = await db
    .insert(users)
    .values(cleanedData as any)
    .onConflictDoNothing()
    .returning();
  return result.length;
};

/**
 * ✅ Get All Users (For Export)
 * @function getAllUsersForExport
 */
const getAllUsersForExport = async (): Promise<IUser[]> => {
  return await db.select().from(users);
};

/**
 * ✅ Update user by ID
 */
const updateUser = async (id: string, updatedData: Partial<any>): Promise<IUser> => {
  const [updated] = await db.update(users).set(updatedData).where(eq(users.id, id)).returning();
  return updated;
};

/**
 * ✅ Delete user by ID
 */
const deleteUser = async (id: string): Promise<void> => {
  await db.delete(users).where(eq(users.id, id));
};

export default {
  getAllUsers,
  findByEmail,
  isEmailTaken,
  createUser,
  bulkInsert,
  getAllUsersForExport,
  findById,
  updateUser,
  deleteUser,
};

import { db } from "../db_connection/postgres/connection";
import { admins, Admin, NewAdmin } from "../models/admin/admin.schema";
import { eq } from "drizzle-orm";

/**
 * ✅ Create new admin
 * @param {NewAdmin} adminEntity - Admin entity object to insert
 * @returns {Promise<Admin>} Newly created admin record
 */
const create = async (adminEntity: NewAdmin): Promise<Admin> => {
  console.log(adminEntity, "hello");
  
  const [newAdmin] = await db.insert(admins).values(adminEntity).returning();
  return newAdmin;
};

/**
 * ✅ Check if an email is already taken
 * @param {string} email - Admin email to check
 * @returns {Promise<boolean>} True if email already exists
 */
const isEmailTaken = async (email: string): Promise<boolean> => {
  const result = await db.select().from(admins).where(eq(admins.email, email));
  return result.length > 0;
};

/**
 * ✅ Find admin by email
 * @param {string} email - Admin email to search
 * @returns {Promise<Admin | null>} Admin record or null if not found
 */
const findByEmail = async (email: string): Promise<Admin | null> => {
  const [result] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  return result || null;
};

/**
 * ✅ Find admin by ID
 * @param {string} id - Admin unique ID
 * @returns {Promise<Admin | null>} Admin record or null
 */
const findById = async (id: string): Promise<Admin | null> => {
  const [result] = await db.select().from(admins).where(eq(admins.id, id)).limit(1);
  return result || null;
};

export default { create, isEmailTaken, findByEmail, findById };

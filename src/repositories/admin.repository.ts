import { db } from '../db_connection/postgres/connection';
import { admins, Admin, NewAdmin } from '../models/admin/admin.schema';
import { eq } from 'drizzle-orm';

/**
 * Create new admin
 * @param {AdminEntity} adminEntity
 * @returns {Promise<IAdmin>}
 */
const create = async (adminEntity: NewAdmin): Promise<Admin> => {
  const [newAdmin] = await db.insert(admins).values(adminEntity).returning();
  return newAdmin;
};

/**
 * Find email already used or not
 * @param {String} email
 * @returns {Promise<Boolean>}
 */
const isEmailTaken = async (email: string): Promise<boolean> => {
  const result = await db.select().from(admins).where(eq(admins.email, email));
  return result.length > 0;
};

/**
 * Find admin by email
 * @param {string} email
 */
const findByEmail = async (email: string): Promise<Admin | null> => {
  const result = await db.select().from(admins).where(eq(admins.email, email));
  return result[0] || null;
};

export default {
  create,
  isEmailTaken,
  findByEmail,
};

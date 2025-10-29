import { sql } from "drizzle-orm";
import { db } from "../db_connection/postgres/connection";

/**
 * ✅ Pure pagination helper for Drizzle ORM (PostgreSQL)
 * No sorting, no filters — only LIMIT + OFFSET
 */
export const paginate = async <T>(
  table: any,
  { pageNumber, pageSize }: { pageNumber: number; pageSize: number }
): Promise<{ data: T[]; totalCount: number; hasNext: boolean }> => {
  const offset = (pageNumber - 1) * pageSize;

  // 🧮 Count total rows
  const countResult = await db.select({ count: sql<number>`count(*)` }).from(table);
  const totalCount = Number(countResult[0]?.count ?? 0);

  // 📄 Fetch paginated rows (🚫 no ORDER BY)
  const data = (await db.select().from(table).limit(pageSize).offset(offset)) as T[];

  // 📊 Pagination meta
  const hasNext = totalCount > pageNumber * pageSize;

  return { data, totalCount, hasNext };
};

import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function initializeDatabase() {
  const db = await open({
    filename: "./data/sessions.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      sid TEXT PRIMARY KEY,
      sess TEXT NOT NULL,
      expire INTEGER NOT NULL
    );
  `);

  return db;
}

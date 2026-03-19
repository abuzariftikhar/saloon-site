import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Please add it to your .env.local file."
    );
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

type Db = ReturnType<typeof createDb>;

// Lazy singleton – only connects when first used at runtime
let _db: Db | undefined;

export const db: Db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    if (!_db) _db = createDb();
    return Reflect.get(_db, prop, receiver);
  },
});


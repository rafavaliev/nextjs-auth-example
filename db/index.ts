import { drizzle } from 'drizzle-orm/postgres-js';

// for query purposes
 const db = drizzle(process.env.DATABASE_URL!);
export default db;
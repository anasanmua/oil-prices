import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI no definida en .env");
  }

  if (db) return db;

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  db = client.db("oilprices");

  // Creates unique index to prevent duplicates on the db
  await db
    .collection("prices")

    .createIndex({ source: 1, product: 1, marketDate: 1 }, { unique: true });
  return db;
}

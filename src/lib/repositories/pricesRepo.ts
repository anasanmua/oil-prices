import { getDb } from "../mongo";
import { Price } from "../models/price";

const COLLECTION = "prices";

export async function insertPrice(price: Price) {
  const db = await getDb();

  try {
    await db.collection(COLLECTION).insertOne(price)
    return { inserted: true }
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error, price already exists
      return { inserted: false }
    }
    throw error
  }
}

export async function getAllPrices() {
  const db = await getDb();
  const prices = await db.collection(COLLECTION).find().toArray();
  return prices;
}

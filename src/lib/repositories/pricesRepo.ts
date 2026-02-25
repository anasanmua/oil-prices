import { getDb } from "../mongo";
import { CreatePrice, Price } from "../models/price";
import { PriceDB } from "@/lib/models/priceDb";
import { serializePrice, toPriceDB } from "@/lib/mappers/price.mapper";

//repository pattern (patrón de arquitectura) Abstrae la lógica de consultas a BD
const COLLECTION = "prices";


export async function insertPrice(price: CreatePrice) {
  const db = await getDb();

  try {
    await db.collection(COLLECTION).insertOne(toPriceDB(price))
    return { inserted: true }
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error, price already exists
      return { inserted: false }
    }
    throw error
  }
}

export async function getAllPrices(): Promise<Price[]> {
  const db = await getDb();
  const prices = await db.collection<PriceDB>(COLLECTION).find().toArray();
  return prices.map(serializePrice);
}

export async function getLastFourPrices():Promise<Price[]> {
    const db = await getDb();
    const prices = await db
        .collection<PriceDB>(COLLECTION)
        .find()
        .sort({ _id: -1 })
        .limit(4)
        .toArray();
  return prices.map(serializePrice);
}

export async function getLastMarketDate(): Promise<string | null> {
  const db = await getDb();
  const doc = await db
    .collection<PriceDB>(COLLECTION)
    .find()
    .sort({ marketDate: -1 })
    .limit(1)
    .next();

  return doc ? doc.marketDate : null;
}

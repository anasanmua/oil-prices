import { getDb } from "../mongo"
import { Price } from "../models/price"

const COLLECTION = "prices"

export async function insertPrice(price: Price) {
    const db = await getDb()
    await db.collection(COLLECTION).insertOne(price)
}

export async function getAllPrices() {
    const db = await getDb()
    const prices = await db.collection(COLLECTION).find().toArray()
    return prices
}

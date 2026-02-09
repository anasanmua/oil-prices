import { getDb } from "../mongo"
import { Price } from "../models/price"

const COLLECTION = "prices"

export async function insertPrice(price: Price) {
    const db = await getDb()

    const exists = await db.collection(COLLECTION).findOne({
        source: price.source,
        product: price.product,
        marketDate: price.marketDate
    })

    if (exists) {
        return { inserted: false }
    }

    await db.collection(COLLECTION).insertOne(price)
    return { inserted: true }
}

export async function getAllPrices() {
    const db = await getDb()
    const prices = await db.collection(COLLECTION).find().toArray()
    return prices
}

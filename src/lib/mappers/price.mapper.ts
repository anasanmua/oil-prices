import { WithId } from "mongodb";
import { PriceDB } from "../models/priceDb";
import { CreatePrice, Price } from "../models/price";

export function serializePrice(doc: WithId<PriceDB>): Price {
  return {
    ...doc,
    _id: doc._id.toString(),
    scrapedAt: doc.scrapedAt.toISOString(),
  };
}

export function toPriceDB(price: CreatePrice): PriceDB {
  return {
    ...price,
    scrapedAt: new Date(price.scrapedAt),
  };
}

import "dotenv/config"
import axios from "axios"
import * as cheerio from "cheerio"
import {insertPrice} from "@/lib/repositories/pricesRepo";
import { Price } from "@/lib/models/price"
import { PriceDB } from "@/lib/models/priceDb";

const URL = "https://www.infaoliva.com"

async function scrapeInfaoliva() {
    const marketDate: string = new Date().toISOString().split("T")[0]

    // 1. Scrappe infaoliva and download HTML
    const response = await axios.get(URL)
    const html = response.data

    // 2. Normalised HTML en cheerio
    const $ = cheerio.load(html)
    const results: any[] = []

    // 3. Iterate over the table
    $("table.table-striped tbody tr").each((_, row) => {
        const tds = $(row).find("td")

        const product = tds.eq(0).text().trim()
        const variety = tds.eq(1).text().trim()
        const priceRaw = tds.eq(2).text().trim()

        // 4. Normalizar precio: "4.150 €" -> 4.15
        const priceClean = priceRaw
            .replace("€", "")
            .replace(",", ".")
            .trim()

        const price = parseFloat(priceClean)

        const priceObj: PriceDB = {
            source: "infaoliva",
            product,
            price,
            unit: "Kg",
            marketDate,
            scrapedAt: new Date()
        }

        results.push(priceObj)
    })

    return results
}

export async function runInfaolivaScraper(){
  const prices = await scrapeInfaoliva()

  let insertedCount = 0

  for (const price of prices) {
    const result = await insertPrice(price)

    if (result.inserted) {
      insertedCount++
    }
  }

  return insertedCount
}

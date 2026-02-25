import "dotenv/config"
import axios from "axios"
import * as cheerio from "cheerio"
import {insertPrice, getLastMarketDate} from "@/lib/repositories/pricesRepo";
import { PriceDB } from "@/lib/models/priceDb";

const URL = "https://www.infaoliva.com"

function extractMarketDate(html: string): string | null {
    // Busca fechas tipo DD/MM/YYYY en el HTML y las normaliza a YYYY-MM-DD
    const euMatch = html.match(/(\d{2})[\/](\d{2})[\/](\d{4})/)
    if (euMatch) {
        const [_, dd, mm, yyyy] = euMatch
        return `${yyyy}-${mm}-${dd}`
    }

    return null
}

async function scrapeInfaoliva() {
    const response = await axios.get(URL)
    const html = response.data

    const marketDate = extractMarketDate(html) ?? new Date().toISOString().split("T")[0]

    // 2. Normalised HTML en cheerio
    const $ = cheerio.load(html)
    const results: any[] = []

    // 3. Iterate over the table
    $("table.table-striped tbody tr").each((_, row) => {
        const tds = $(row).find("td")

        const product = tds.eq(0).text().trim()
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

  if (!prices.length) return 0

  // La fecha de mercado viene ya parseada en cada price
  const marketDate = prices[0].marketDate
  const lastMarketDate = await getLastMarketDate()

  // Si la fecha es la misma que la última guardada, no insertamos de nuevo
  if (lastMarketDate === marketDate) {
    return 0
  }

  let insertedCount = 0

  for (const price of prices) {
    const result = await insertPrice(price)

    if (result.inserted) {
      insertedCount++
    }
  }

  return insertedCount
}

import "dotenv/config"
import axios from "axios"
import * as cheerio from "cheerio"
import {insertPrice} from "@/lib/repositories/pricesRepo";
import { Price } from "@/lib/models/price"

const URL = "https://www.infaoliva.com"

async function scrapeInfaoliva() {
    const marketDate: string = new Date().toISOString().split("T")[0]

    // 1. Descargar HTML
    const response = await axios.get(URL)
    const html = response.data

    // 2. Cargar HTML en cheerio
    const $ = cheerio.load(html)
    const results: any[] = []

    // 3. Recorrer filas de la tabla
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

        const priceObj: Price = {
            source: "infaoliva",
            product,
            price,
            unit: "Kg",
            marketDate,   // luego afinaremos
            scrapedAt: new Date()
        }

        results.push(priceObj)
    })

    return results
}

async function run() {
    const prices = await scrapeInfaoliva()

    for (const price of prices) {
        const result = await insertPrice(price)

        if(result.inserted) {
            console.log("Inserted:", price.product)
        } else {
            console.log("Skipped (duplicate):", price.product)
        }
    }
    console.log("Done. Total processed:", prices.length)
}

run()

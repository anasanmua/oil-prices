import "dotenv/config"
import {insertPrice, getLastMarketDate} from "@/lib/repositories/pricesRepo";
import { CreatePrice } from "@/lib/models/price";

const API_URL = "https://www.infaoliva.com/funciones/ajax.php"

interface InfaolivaDataPoint {
    x: string  // fecha YYYY-MM-DD
    y: string  // precio como string
}

interface InfaolivaSeries {
    label: string
    data: InfaolivaDataPoint[]
}

function buildDateRange(): { startDate: string; endDate: string } {
    const today = new Date()
    const oneWeekAgo = new Date(today)
    oneWeekAgo.setDate(today.getDate() - 7)

    const format = (d: Date) =>
        `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`

    return { startDate: format(oneWeekAgo), endDate: format(today) }
}

async function scrapeInfaoliva(): Promise<CreatePrice[]> {
    const { startDate, endDate } = buildDateRange()

    const body = new URLSearchParams({
        accion: "PrecioAceite1",
        years: "1",
        fecha_ini: startDate,
        fecha_fin: endDate,
    })

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Origin": "https://www.infaoliva.com",
            "Referer": "https://www.infaoliva.com/",
        },
        body: body.toString(),
    })

    const series: InfaolivaSeries[] = await response.json()

    const results: CreatePrice[] = []

    for (const serie of series) {
        if (!serie.data.length) continue

        // Ignoramos la serie genérica "AOVE" (sin temporada)
        if (serie.label === "AOVE") continue

        // Cogemos el último dato de cada serie (el más reciente)
        const lastPoint = serie.data[serie.data.length - 1]

        results.push({
            source: "infaoliva",
            product: serie.label,
            price: parseFloat(lastPoint.y),
            unit: "Kg",
            marketDate: lastPoint.x,
            scrapedAt: new Date().toISOString(),
        })
    }

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

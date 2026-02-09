import { NextResponse } from "next/server"
import { insertPrice, getAllPrices } from "@/lib/repositories/pricesRepo"
import { Price } from "@/lib/models/price"

// GET /api/prices
export async function GET() {
    const prices = await getAllPrices()
    return NextResponse.json(prices)
}

// POST /api/prices
export async function POST(request: Request) {
    const body = await request.json()

    const price: Price = {
        source: body.source,
        product: body.product,
        price: body.price,
        unit: body.unit,
        marketDate: new Date(body.marketDate),
        scrapedAt: new Date()
    }

    await insertPrice(price)

    return NextResponse.json({ ok: true })
}

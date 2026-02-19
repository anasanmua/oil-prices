import { NextResponse } from "next/server"
import {insertPrice, getAllPrices, getLastFourPrices} from "@/lib/repositories/pricesRepo"
import { CreatePrice, Price } from "@/lib/models/price";

// GET /api/prices or /api/prices?limit=4
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")

    let prices

    if (limit === "4") {
        prices = await getLastFourPrices()
    } else {
        prices = await getAllPrices()
    }
    return NextResponse.json(prices)
}

// POST /api/prices
export async function POST(request: Request) {
    const body = await request.json()

    const price: CreatePrice = {
        source: body.source,
        product: body.product,
        price: body.price,
        unit: body.unit,
        marketDate: body.marketDate,
        scrapedAt: new Date().toString()
    }

    await insertPrice(price)

    return NextResponse.json({ ok: true })
}

import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongo"

export async function GET() {
    const db = await getDb()
    const collections = await db.collections()

    return NextResponse.json({
        ok: true,
        collections: collections.map(c => c.collectionName)
    })
}
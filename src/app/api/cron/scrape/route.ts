import { runInfaolivaScraper } from "@/scrapers/infaoliva"
import { insertCronLog } from "@/lib/repositories/cronLogsRepo"

export async function GET() {
  try {
    const count = await runInfaolivaScraper()

    const status = count > 0 ? "success" : "skipped"
    const message = count > 0
      ? `Inserted ${count} new prices`
      : "No new prices to insert"

    await insertCronLog({
      executedAt: new Date(),
      status,
      inserted: count,
      message,
    })

    return Response.json({
      ok: true,
      inserted: count,
      message,
    })

  } catch (error) {
    console.error("Cron scraper error:", error)

    await insertCronLog({
      executedAt: new Date(),
      status: "error",
      inserted: 0,
      message: error instanceof Error ? error.message : "Unknown error",
    })

    return Response.json(
      {
        ok: false,
        message: "Scraper failed"
      },
      { status: 500 }
    )
  }
}

import { runInfaolivaScraper } from "@/scrapers/infaoliva"

export async function GET() {
  try {
    const count = await runInfaolivaScraper()

    return Response.json({
      ok: true,
      inserted: count,
      message: "Scraper executed successfully"
    })

  } catch (error) {
    console.error("Cron scraper error:", error)

    return Response.json(
      {
        ok: false,
        message: "Scraper failed"
      },
      { status: 500 }
    )
  }
}

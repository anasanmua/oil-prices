import { getLastCronLogs } from "@/lib/repositories/cronLogsRepo"

export async function GET() {
  try {
    const logs = await getLastCronLogs()

    return Response.json(logs)
  } catch (error) {
    console.error("Error fetching cron logs:", error)

    return Response.json(
      { ok: false, message: "Failed to fetch cron logs" },
      { status: 500 }
    )
  }
}

import { getDb } from "../mongo";
import { CronLog, CronLogDB } from "../models/cronLog";
import { WithId } from "mongodb";

const COLLECTION = "cron_logs";

function serializeCronLog(doc: WithId<CronLogDB>): CronLog {
  return {
    _id: doc._id.toString(),
    executedAt: doc.executedAt.toISOString(),
    status: doc.status,
    inserted: doc.inserted,
    message: doc.message,
  };
}

export async function insertCronLog(log: CronLogDB) {
  const db = await getDb();
  await db.collection(COLLECTION).insertOne(log);
}

export async function getLastCronLogs(limit = 20): Promise<CronLog[]> {
  const db = await getDb();
  const logs = await db
    .collection<CronLogDB>(COLLECTION)
    .find()
    .sort({ executedAt: -1 })
    .limit(limit)
    .toArray();

  return logs.map(serializeCronLog);
}

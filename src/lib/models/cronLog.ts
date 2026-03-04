export interface CronLogDB {
  executedAt: Date;
  status: "success" | "skipped" | "error";
  inserted: number;
  message: string;
}

export interface CronLog {
  _id: string;
  executedAt: string;
  status: "success" | "skipped" | "error";
  inserted: number;
  message: string;
}

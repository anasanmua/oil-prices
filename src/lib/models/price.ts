
export interface Price {
  _id: string;
  source: string;
  product: string;
  price: number;
  unit: string;
  marketDate: string;
  scrapedAt: string;
}

export type CreatePrice = Omit<Price, "_id">;


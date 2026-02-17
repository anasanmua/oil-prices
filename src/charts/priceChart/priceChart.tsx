"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { Price } from "@/lib/models/price";

// registrar componentes necesarios
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

interface PriceChartInterface {
  prices: Price[];
}

export default function PriceChart({ prices }: PriceChartInterface) {
  const aovePrices = prices.filter(el => el.product === "AOVE - Diciembre 25/26")
  const aoveDates = aovePrices.map((price) => price.marketDate);

  const aovePricesArray = aovePrices.map((price) => price.price);
  const data = {
    labels: aoveDates,
    datasets: [
      {
        label: "AOVE Price",
        data: aovePricesArray,
      },
    ],
  };

  return (
    <div className="w-[600px]">
      <Line data={data} />
    </div>
  );
}

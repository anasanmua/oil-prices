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
import { COLORS } from "../../../colors";

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
  const aoveNovPrices = prices
    .filter((el) => el.product === "AOVE - Noviembre 25/26")
    .map((price) => price.price);
  const aoveDecPrices = prices
    .filter((el) => el.product === "AOVE - Diciembre 25/26")
    .map((price) => price.price);
  const aovPrices = prices
    .filter((el) => el.product === "Aceite de oliva virgen")
    .map((price) => price.price);
  const aolPrices = prices
    .filter((el) => el.product === "Aceite de oliva lampante")
    .map((price) => price.price);
  const aoveDates = prices
    .filter((el) => el.product === "AOVE - Noviembre 25/26")
    .map((el) => el.marketDate);

  const data = {
    labels: aoveDates,
    datasets: [
      {
        label: "AOVE - Noviembre 25/26",
        data: aoveNovPrices,
        borderColor: COLORS.chartRed,
        backgroundColor: COLORS.chartRed,
      },
      {
        label: "AOVE - Diciembre 25/26",
        data: aoveDecPrices,
        borderColor: COLORS.chartBlue,
        backgroundColor: COLORS.chartBlue,
      },
      {
        label: "Aceite de oliva virgen",
        data: aovPrices,
        borderColor: COLORS.chartTeal,
        backgroundColor: COLORS.chartTeal,
      },
      {
        label: "Aceite de oliva lampante",
        data: aolPrices,
        borderColor: COLORS.chartOrange,
        backgroundColor: COLORS.chartOrange,
      },
    ],
  };

  return (
    <div className="w-full h-[300px]">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                pointStyle: "rect",
              },
            },
          },
        }}
      />
    </div>
  );
}

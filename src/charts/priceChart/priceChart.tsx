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
import {
  isAoveDecember,
  isAoveNovember,
  isLampante,
  isVirgen,
} from "@/lib/helpers/prices";

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
  const getProductData = (filterFn: (product: string) => boolean) => {
    const filtered = prices.filter((el) => filterFn(el.product));
    return {
      prices: filtered.map((price) => price.price),
      dates: filtered.map((el) => el.marketDate),
    };
  };

  const aoveNovData = getProductData(isAoveNovember);
  const aoveDecData = getProductData(isAoveDecember);
  const virgenData = getProductData(isVirgen);
  const lampanteData = getProductData(isLampante);

  const dates =
    aoveNovData.dates.length > 0
      ? aoveNovData.dates
      : aoveDecData.dates.length > 0
        ? aoveDecData.dates
        : virgenData.dates.length > 0
          ? virgenData.dates
          : lampanteData.dates;

  const data = {
    labels: dates,
    datasets: [
      {
        label: "AOVE - Noviembre 25/26",
        data: aoveNovData.prices,
        borderColor: COLORS.chartRed,
        backgroundColor: COLORS.chartRed,
      },
      {
        label: "AOVE - Diciembre 25/26",
        data: aoveDecData.prices,
        borderColor: COLORS.chartBlue,
        backgroundColor: COLORS.chartBlue,
      },
      {
        label: "Aceite de oliva virgen",
        data: virgenData.prices,
        borderColor: COLORS.chartTeal,
        backgroundColor: COLORS.chartTeal,
      },
      {
        label: "Aceite de oliva lampante",
        data: lampanteData.prices,
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

export const revalidate = 43200;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PriceChart from "@/charts/priceChart/priceChart";
import { getAllPrices, getLastFourPrices } from "@/lib/repositories/pricesRepo";

export default async function PricesPage() {
  const prices = await getAllPrices();
  const lastFourPrices = await getLastFourPrices();
  const date = lastFourPrices[0].marketDate.split("-").reverse().join("-");

  return (
    <div className="px-4 py-6 sm:px-8 sm:py-10 md:px-12 lg:px-20">
      <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
        Precios del aceite de oliva
      </h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Última actualización: {date}
      </p>

      <div className="mt-6 overflow-x-auto">
        <Table className="w-full min-w-[400px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Categoria</TableHead>
              <TableHead className="w-1/3">Variedad</TableHead>
              <TableHead className="w-1/3">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lastFourPrices.map((el) => {
              return (
                <TableRow key={el.price}>
                  <TableCell className="text-left">{el.product}</TableCell>
                  <TableCell className="font-medium">Picual</TableCell>
                  <TableCell>{el.price}€/kg</TableCell>
                </TableRow>
              );
            }).reverse()}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 h-[300px] sm:h-[400px] md:h-[500px]">
        <PriceChart prices={prices} />
      </div>
    </div>
  );
}

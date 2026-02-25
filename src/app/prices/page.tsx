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
  const date = new Date();

  return (
    <div className="p-10">
      <div>{date.toString()}</div>
      <Table className="w-[50px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Categoria</TableHead>
            <TableHead>Variedad</TableHead>
            <TableHead>Precio</TableHead>
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
      <PriceChart prices={prices} />
    </div>
  );
}

import { Price } from "@/lib/models/price";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PriceChart from "@/charts/priceChart/priceChart";

async function getPrices(): Promise<Price[]> {
  const res = await fetch("http://localhost:3000/api/prices", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prices");
  }

  return res.json();
}

export default async function PricesPage() {
  const prices = await getPrices();
  const latest = prices[0];
  const date = new Date();

  return (
    <div className="p-10">
      <div>{date.toString()}</div>
      <Table className="w-[50px]">
        <TableCaption>Lista último precio AOVE </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Categoria</TableHead>
            <TableHead>Variedad</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-right">Source</TableHead>
            <TableHead className="text-right">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={latest.price}>
            <TableCell className="text-right">{latest.product}</TableCell>
            <TableCell className="font-medium">Picual</TableCell>
            <TableCell>{latest.price}€/kg</TableCell>

            <TableCell>{latest.source}</TableCell>
            <TableCell className="text-right">{latest.marketDate}</TableCell>
          </TableRow>
        </TableBody>
        {/*<TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>*/}
      </Table>
      <PriceChart prices={prices}/>
    </div>
  );
}

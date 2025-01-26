"use client";

import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/hooks/queries";
import Link from "next/link";

export default function ProductsPage() {
  const { data } = useGetProducts();
  console.log(data);
  return (
    <main className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Products list</h1>
        <Link href="/admin/products/create">
          <Button>Add Products</Button>
        </Link>
      </div>
    </main>
  );
}

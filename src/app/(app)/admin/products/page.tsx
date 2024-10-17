"use client";

import { useEffect, useState } from "react";
import { columns, Product } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2Icon, Plus } from "lucide-react";
import { getProducts } from "@/lib/data";

const Page = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    setIsLoading(true)

    const {products, message} = await getProducts()
    setData(products)

    if(products.length === 0) toast.error(message);
    
    setIsLoading(false)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto py-10 relative">
      {isLoading ? (
        <div className="h-calc flex items-center justify-center text-5xl gap-1">
          <Loader2Icon className="animate-spin size-10" />
          <p>Loading...</p>
        </div>

      ) : (<>
        <Link className="absolute top-14 right-8" href='/admin/product/new'>
          <Button>New <Plus className="size-5" /> </Button>
        </Link>
        <DataTable columns={columns} data={data} placeholder="Search products" searchBy="title" />
      </>
      )}
    </div>
  );
};

export default Page;

"use client";

import ProductCard from "@/components/product-card";
import { searchProducts } from "@/lib/data";
import { Product } from "@/models/Product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {

  const [products, setProducts] = useState<Product[]>([])

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await searchProducts(category, query);
      setProducts(products);
    }
    fetchProducts()
  }, [category, query])



  return (
    <main>
      <div className="container mx-auto flex justify-center">
        <div className="w-fit flex flex-wrap gap-4">
          {products.map(product => (
            <ProductCard product={product} key={product._id as string} />
          ))}
        </div>
      </div>


    </main>
  )
}

export default Page;

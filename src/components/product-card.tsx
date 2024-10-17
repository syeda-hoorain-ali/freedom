"use client";

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/models/Product";
import { addToCart } from "@/lib/data";
import { toast } from "react-toastify";
import Image from "next/image";

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/p/${product?._id}`} className="hover:scale-105 transition">
      <Card className="max-w-60">
        <CardHeader className="p-3">
          <div className="img size-52 overflow-hidden bg-pink-300 rounded">
            <Image src={product.images[0]} alt="img" height={208} width={208} />
          </div>
        </CardHeader>

        <CardContent className="px-4 py-0 space-y-2 h-28">
          <CardTitle className="text-lg leading-tight">{product.title}</CardTitle>
          <CardDescription className="capitalize">{product.category}</CardDescription>
        </CardContent>

        <CardFooter className="justify-between mt-1 p-3">
          <Button className="text-sm px-2 bg-[#009432] hover:bg-[#0f7a33]"
            onClick={() => { addToCart(product._id as string); toast.success("Product added to cart") }} >Add to cart</Button>
          <div className="price text-base font-medium">{product.price} Rs</div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard
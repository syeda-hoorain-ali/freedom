"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { addToCart } from "@/lib/data";
import { Product as IProduct } from "@/models/Product";
import { MapPinIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

interface Props {
  product: IProduct
}

const Product = ({ product }: Props) => {

  return (
    <div className="my-4 md:mx-4 mx-1 flex flex-col md:flex-row gap-5">

      <div className="w-full md:min-w-xl grid grid-cols-5 py-4 px-4 gap-12 bg-white rounded">
        <div className="col-span-5 lg:col-span-2 aspect-square">
          <Image src={product.images[0]} alt={product.title} height={500} width={500} />
        </div>

        <div className="info flex flex-col gap-3 col-span-5 lg:col-span-3">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-base text-gray-800">{product.description}</p>


          <div className="divider border-b border-gray-600"></div>
          <span className="text-2xl font-bold">$ {product.price}</span>
        </div>


        <div className="col-span-5">
          <div className="divider border-b-2 border-gray-500"></div>

          <h2 className="text-2xl font-bold mt-3">About this item</h2>

        </div>

        <div className="col-span-5">
          <div className="divider border-b-2 border-gray-500"></div>
          <h2 className="text-2xl font-bold mt-3">Important information</h2>

          <div className="px-5">
            <h3 className="font-bold mt-3">Safety Information</h3>
            <p>No Warning Applicable</p>
            <p>For External Use Available</p>

          </div>
        </div>


      </div>


      <div className="card sticky">
        <Card className="flex flex-col w-72 lg:w-80 h-fit">
          <CardHeader className="pb-0">
            <CardTitle className="text-3xl">${product.price}</CardTitle>
          </CardHeader>

          <CardContent className="py-3 mt-0 border-b border-gray-300 flex flex-col gap-1">
            <p className="flex gap-1"><MapPinIcon /> Deliver to Pakistan</p>
            <p className="flex gap-1"><TruckIcon /> Shipping in 3 days</p>
            <p className="text-pink-500 text-xl">{product.stock > 0 ? "In stock" : "Out of stock"} </p>
          </CardContent>

          <CardFooter className="mt-4">
            <Button
              className="w-full"
              onClick={async () => {
                toast.success("Product added to cart");
                await addToCart(product.id)
              }}>
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  )
}

export default Product

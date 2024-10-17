"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ICartProduct } from "@/types/ApiResponse";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  product: ICartProduct;
  onDelete: (id: string) => void;
  onQuantityChange?: (quantity: number) => void;
}

const CartCard = ({ product, onDelete, onQuantityChange }: Props) => {

  const [quantity, setQuantity] = useState(product.quantity || 1);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);

      if (onQuantityChange) onQuantityChange(Math.min(quantity + 1, product.stock));
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      if (onQuantityChange) onQuantityChange(Math.max(quantity - 1, 1));
    }
  };

  return (
    <Card className="flex relative">
      <CardHeader className="p-1">
        <div className="img size-40 rounded-lg">
          <Image
            height={160} width={160}
            src={product.image}
            alt={product.title}
            title={product.title}
            className="rounded-t-lg w-full h-40 object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-38 py-2">

        <div className="flex flex-col gap-1">
          <h3 className="title text-xl tracking-wide font-semibold">{product.title}</h3>
          <p className="text-gray-600 text-sm font-light">{product.category}</p>
          <p className="text-gray-600 text-sm font-light">{product.stock} Available</p>
          <p className="font-semibold">${product.price}</p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <button
            className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md disabled:bg-opacity-60"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus className='size-5' />
          </button>

          <span className="w-5 text-center text-lg font-semibold">{quantity}</span>

          <button
            className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md disabled:bg-opacity-60"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock}
          >
            <Plus className='size-5' />
          </button>
        </div>

        <button
          className="absolute top-4 right-4 p-2 rounded-full cursor-pointer transition text-red-500 hover:text-white hover:bg-red-400"
          onClick={() => {
            onDelete(product.id)
            toast.success(`Product with id ${product.id} removed from cart`)
          }}>
          <Trash2 className="size-4" />
        </button>

      </CardContent>
    </Card >
  )
}

export default CartCard
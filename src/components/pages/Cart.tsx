"use client"

import CartCard from "@/components/cart-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { removeFromCart } from "@/lib/data";
import { ICartProduct } from "@/types/ApiResponse";

const Cart = ({ products }: { products: ICartProduct[] }) => {

  return (<>
    <div className="flex mx-20 my-10 gap-10">

      <div className="w-full px-4 py-3 bg-slate-100 rounded-lg">
        <h1 className="font-black text-4xl">Shopping Cart</h1>
        <hr className="my-2 border-black" />

        <div className="flex flex-col gap-5 px-1 py-5">
          <ProductCard />
          <ProductCard />
          {products.map(product => (
            <CartCard product={product} onDelete={removeFromCart} key={product.id} />
          ))}
        </div>
      </div>

      <div className=" flex flex-col gap3 w-96 h-fit px-4 py-3 bg-slate-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-5">Order summary</h2>

        <div className="flex justify-between py-3 border-b border-gray-300">
          <span className="text-gray-500 text-sm font-light">Subtotal</span>
          <span className="text-black text-sm">$99.00</span>
        </div>

        <div className="flex justify-between py-3 border-b border-gray-300">
          <span className="text-gray-500 text-sm font-light">Shipping estimate</span>
          <span className="text-black text-sm">$5.00</span>
        </div>

        <div className="flex justify-between py-3 border-b border-gray-300">
          <span className="text-gray-500 text-sm font-light">Tax estimte</span>
          <span className="text-black text-sm">$9.00</span>
        </div>

        <div className="flex justify-between py-3">
          <span className="text-sm">Order Total</span>
          <span className="text-black text-sm">$122.00</span>
        </div>

        <Button className="bg-[#009432] hover:bg-[#1DC656]">Checkout</Button>

      </div>

    </div>
  </>)
}

export default Cart;



const ProductCard = () => {
  return (
    <Card className="card p-2 flex">
      <CardHeader className="img size-36 bg-pink-500 rounded-md"></CardHeader>

      <CardContent className="info flex flex-col gap-1 px-3">
        <div>
          <h3 className="title text-xl tracking-wide font-semibold">Title</h3>
          <p className="text-gray-600 text-sm font-light">Category</p>
          <p className="font-semibold">400</p>
        </div>

        <div className="grid grid-rows-1 grid-cols-3 bg-gray-300 ">
          <button className="font-bold">+</button>
          <input className="w-10 text-center" type="number" readOnly />
          <button className="font-bold">-</button>
        </div>

      </CardContent>
    </Card>
  )
}

"use client"


import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/product-card";
import { categories } from "@/lib/categories";
import { Product } from "@/models/Product";
import Link from "next/link";


export const Header = () => {

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <header className="relative min-h-72 lg:h-[35rem]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}

      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="lg:h-[35rem] overflow-hidden flex items-center justify-center">
                <Image src={`/header-carousal/image${index + 1}.png`} alt="" width={1350} height={400} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#009432] absolute top-1/2 left-3 -translate-y-1/2" />
        <CarouselNext className="bg-[#009432] absolute top-1/2 right-3 -translate-y-1/2" />
      </Carousel>

    </header>

  )
}


export const NewArrival = ({ products }: { products: Product[] }) => {

  // const [st, setSt] = useState<Product[]>([]);
  // useEffect(() => setSt(products), [])
  // console.log(st);
  
  return (
    <section className="py-5 bg[#abf09c]">
      <h2 className="text-2xl font-bold text-center mb-5">New Arrival</h2>

      <div className="container flex gap-4 flex-wrap justify-center">
        {products.map(product => (
          <ProductCard product={product} key={product._id as string} />
        ))}
      </div>
    </section>
  )
}


export const Categories = () => {
  return (
    <section className="py-5">
      <h2 className="text-2xl font-bold mb-5 text-center">Catagories</h2>

      <div className="container flex flex-wrap justify-around gap-4">
        {categories.map(category => (
          <Link key={category} href={`/results?category=${category.toLowerCase()}`} className="card flex flex-col items-center gap-3 cursor-pointer">

            <div className="size-36 rounded-full bg-white bg-opacity-50 transition-all hover:scale-110 flex items-center justify-center">
              <Image src={`/categories/${category}.png`} alt="" height={100} width={100} />
            </div>
            <span className="text-lg">{category}</span>

          </Link>
        ))}
      </div>
    </section>
  )
}


export const TrendingProducts = ({ products }: { products: Product[] }) => {

  // const [st, setSt] = useState<Product[]>([]);
  // useEffect(() => setSt(products), [])
  // console.log(st);
  
  return (
    <section className="py-5">
      <h2 className="text-2xl font-bold mb-5 text-center">Trending</h2>

      <div className="container flex gap-4 flex-wrap justify-center">
        {products.map(product => (
          <ProductCard product={product} key={product._id as string} />
        ))}
      </div>
    </section>
  )
}


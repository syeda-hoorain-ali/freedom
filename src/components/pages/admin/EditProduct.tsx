"use client";

import Image from "next/image";
import { BiSolidDiscount } from "react-icons/bi";
import { ChangeEvent, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { DollarSign, Loader2, ReceiptText, X } from "lucide-react"
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addNewProduct, getProductData, updateProduct } from "@/lib/data";
import { categories } from "@/lib/categories";
import { productSchema } from "@/schema/productSchema";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Product } from "@/models/Product";

interface Props {
  productId: string;
  product: Product;
}

const EditProduct = ({ product, productId }: Props) => {
  type Product = z.infer<typeof productSchema>

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [previewImages, setPreviewImages] = useState<string[]>(product?.images || [])
  const [images, setImages] = useState<(File | string)[]>(product?.images || []);
  const router = useRouter();

  
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...product
    }
  })

  const onSubmit = async (data: Product) => {
    setIsSubmitting(true)

    const response = await updateProduct(productId, data)

    if (response.success) {
      toast.success(response.message)
      router.push('/admin/products')
      return;
    }

    toast.error(response.message)
    setIsSubmitting(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages([...images, ...fileArray]);

      const previewArray = fileArray.map(file => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...previewArray]);

      form.setValue("images", [...images, ...fileArray])


      e.target.value = ''
    }
  }

  const handleDelete = (index: number) => {
    const newPreviewImages = previewImages.filter((_, i) => i !== index)
    setPreviewImages(newPreviewImages);
  }

  return (<>
    <div className="container">
      <div className="w-full flex justify-center">


        <div className="info w-full max-w-[45rem] sm:mx-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <fieldset className="relative bg-white shadow-lg rounded-lg">
                <legend className="relative top-5 py-6 px-4">Add Product Photo</legend>
                <hr className="my-1" />

                <FormField
                  name="images"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-center w-full p-4 flex-col">
                      <FormLabel className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-[#009432]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                          </svg>
                          <p className="mb-2 text-sm"><span className="font-semibold text-[#009432]">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-600">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <FormControl>
                          <Input
                            // {...field}
                            type="file"
                            className="hidden"
                            multiple accept="image/png, image/jpeg"
                            onChange={e => { field.onChange(e); handleChange(e); }}
                          />
                        </FormControl>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex px-4 py-2">

                  {(previewImages.length < 9) ?
                    <div className="w-full flex gap-4">
                      {previewImages.map((img, i) => (
                        <Card className="p-1" key={i}>
                          <CardContent className="relative flex aspect-square items-center justify-center p-1">
                            <Image src={img} alt={`Image ${i}`} width={100} height={100} />
                            <button
                              className="absolute top-1 right-1 size-5 bg-slate-400 bg-opacity-50 rounded-full flex items-center justify-center"
                              onClick={() => handleDelete(i)}>
                              <X className="size-3.5" />
                            </button>
                          </CardContent>

                        </Card>
                      ))}
                    </div> :

                    <Carousel className="w-full max-w-sm" opts={{ align: "start" }}>
                      <CarouselContent>
                        {previewImages.map((img, i) => (
                          <CarouselItem key={i}>
                            <Card className="p-1">
                              <CardContent className="relative flex aspect-square items-center justify-center p-1">
                                <Image src={img} alt={`Image ${i}`} width={100} height={100} />
                                <button
                                  className="absolute top-1 right-1 size-5 bg-slate-400 bg-opacity-50 rounded-full flex items-center justify-center"
                                  onClick={() => handleDelete(i)}>
                                  <X className="size-3.5" />
                                </button>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  }
                </div>
              </fieldset>

              <fieldset className="relative bg-white shadow-lg rounded-lg">
                <legend className="relative top-5 py-6 px-4">Product Information</legend>
                <hr className="my-1" />

                <div className="p-4 space-y-5">

                  <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="resize-y" cols={9} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>

                        <Controller
                          name="category"
                          control={form.control}
                          render={({ field }) => (
                            <Select {...field} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(item => (
                                  <SelectItem key={item} value={item.toLowerCase()}>{item}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <FormField
                      name="tagNumber"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tag Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />

                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="stock"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input {...field} type="number"
                              onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                </div>
              </fieldset>

              <fieldset className="relative bg-white shadow-lg rounded-lg">
                <legend className="relative top-5 py-6 px-4">Pricing Details</legend>
                <hr className="my-1" />

                <div className="flex gap-4 p-4 flex-col sm:flex-row">
                  <FormField
                    name="price"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <div className="flex rounded-md shadow-sm overflow-hidden">
                          <span className="flex items-center px-2 bg-slate-300">
                            <DollarSign className="size-4" />
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="rounded-l-none"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="discount"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount</FormLabel>
                        <div className="flex rounded-md shadow-sm overflow-hidden">
                          <span className="flex items-center px-2 bg-slate-300">
                            <BiSolidDiscount className="size-4" />
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="rounded-l-none"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="tax"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax</FormLabel>
                        <div className="flex rounded-md shadow-sm overflow-hidden">
                          <span className="flex items-center px-2 bg-slate-300">
                            <ReceiptText className="size-4" />
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="rounded-l-none"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
              </fieldset>

              <div className="my-8 flex gap-3">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ?
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Please wait
                    </> :
                    "Create"
                  }
                </Button>

                <Button variant="outline">Cancel</Button>
              </div>

            </form>
          </Form>
        </div>

      </div>
    </div>
  </>)
}

export default EditProduct
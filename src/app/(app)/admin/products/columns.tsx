"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, EyeIcon, MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";


export interface Product {
  _id: string;
  title: string;
  category: string;
  stock: number;
  uploadAt: Date;
  images: string[];
}

export const columns: ColumnDef<Product>[] = [
  // {
  //     accessorKey: "email",
  //     header: ({ column }) => {
  //         return (
  //             <Button
  //                 variant="ghost"
  //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //                 className="text-black font-semibold"
  //             >
  //                 Email
  //                 <ArrowUpDown className="ml-2 h-4 w-4" />
  //             </Button>
  //         );
  //     },
  // },

  {
    accessorKey: "title",
    header: () => <div className="text-black font-semibold">Title</div>,
    cell({ row }) {
      const image = row.original.images[0]
      return (
        <div className="size-20 m-2 flex gap-1 items-center w-full">
          <Image src={image} alt={row.original.title} className="aspect-square rounded" height={100} width={100} />
          <span className="font-semibold text-lg">{row.original.title.split('-')[0]}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-black font-semibold">Category</div>,
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-black font-semibold">Stock</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const productId = row.original._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>
              <Link href={`/p/${productId}`} target="_blank" className="flex gap-1 w-full">
                <EyeIcon className="size-4" /> View
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href={`/admin/product/edit/${productId}`} className="flex gap-1 w-full">
                <PencilIcon className="size-4" /> Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href={`/admin/product/delete/${productId}`} className="flex gap-1 w-full">
                <Trash2Icon className="size-4" /> Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

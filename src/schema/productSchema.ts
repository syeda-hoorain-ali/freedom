
// /schema/productSchema.ts

import { z } from "zod";

export const productSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" }),
    price: z
        .number()
        .positive({ message: "Price must be a positive number" })
        .max(10000, { message: "Price cannot exceed 10,000" }),
    category: z
        .string()
        .min(3, { message: "Category must be at least 3 characters long" }),
    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(1000, { message: "Description cannot exceed 1000 characters" }),
    images: z
        .array(z.union([z.instanceof(File), z.string()]))
        .min(1, { message: "At least one image is required" })
        .max(10, { message: "Cannot upload more than 10 images" }),
    // qualities: z
    //     .array(z.string())
    //     .min(1, { message: "At least one quality must be provided" })
    //     .max(10, { message: "Cannot have more than 10 qualities" }),
    stock: z
        .number()
        .min(1, { message: "Stock must be at least 1" })
        .max(1000, { message: "Cannot stock more than 1000" }),
    tagNumber: z
        .number()
        .int({ message: "Tag number must be an integer" })
        .positive({ message: "Tag number must be positive" }),
    tax: z
        .number()
        .min(0, { message: "Tax must be at least 0%" })
        .max(100, { message: "Tax cannot exceed 100%" }),
    discount: z
        .number()
        .min(0, { message: "Discount must be at least 0%" })
        .max(100, { message: "Discount cannot exceed 100%" }),
});

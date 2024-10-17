import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async () => {
    await dbConnect();
    
    try {
        const products = await ProductModel.find({});

        if (!products || products.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No products to get"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            products
        }, { status: 200 })

    } catch (error) {
        console.log("Error getting products");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error getting products"
        }, { status: 500 })
    }
}
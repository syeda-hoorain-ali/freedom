import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    await dbConnect();

    const { productIds } = await request.json() as { productIds: string[] }

    try {
        
        const products = await ProductModel.find({
            _id: { $in: productIds }
        }).select('_id title category images price stock');

        if (!products) {
            return NextResponse.json({
                success: false,
                message: "Products not found"
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
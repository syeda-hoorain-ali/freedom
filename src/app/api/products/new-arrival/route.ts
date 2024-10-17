import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit'))

    try {
        const products = await ProductModel.find({})
            .sort({ createdAt: -1 })
            .limit(limit);

        if (!products) {
            return NextResponse.json({
                success: false,
                message: "Products not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            products: products
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
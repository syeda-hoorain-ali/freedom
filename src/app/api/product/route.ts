import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')

    try {
        const product = await ProductModel.findById(id);

        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            product: product
        }, { status: 200 })

    } catch (error) {
        console.log("Error getting product");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error getting product"
        }, { status: 500 })
    }
}
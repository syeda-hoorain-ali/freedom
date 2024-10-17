import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";



export const GET = async (request: Request) => {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const queryParams = {
        category: searchParams.get('category'),
        search: searchParams.get('search'),
    }

    try {
        let query: any = {};

        if (queryParams.category) {
            query.category = queryParams.category;
        }

        if (queryParams.search) {
            query.$or = [
                { name: { $regex: queryParams.search, $options: 'i' } },
                { description: { $regex: queryParams.search, $options: 'i' } }
            ];
        }

        const products = await ProductModel.find(query);
        

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

// /app/api/admin/update-product/route.ts

import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/lib/firebase";


const storage = getStorage(app);

export const GET = async (request: Request) => {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({
            status: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    if (!session.user.isAdmin) {
        return NextResponse.json({
            status: false,
            message: "Not allowed"
        }, { status: 403 })
    }

    try {

        const product = await ProductModel.findById(productId);

        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found",
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            productId: product._id as string,
            product
        }, { status: 200 })

    } catch (error) {
        console.log("Error getting product data");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

export const POST = async (request: Request) => {
    await dbConnect();
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({
            status: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    if (!session.user.isAdmin) {
        return NextResponse.json({
            status: false,
            message: "Not allowed"
        }, { status: 403 })
    }

    try {
        const formData = await request.formData();
        const productId = formData.get("productId") as string;
        const title = formData.get("title") as string;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const category = formData.get("category") as string;
        // const qualities = formData.get("qualities") as string[];
        const description = formData.get("description") as string;
        const tagNumber = Number(formData.get("tagNumber"));
        const tax = Number(formData.get("tax"));
        const discount = Number(formData.get("discount"));
        const images = formData.getAll("images") as File[];
        
        const product = await ProductModel.findById(productId);

        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found",
            }, { status: 404 })
        }

        const imagesUrl: string[] = []

        for (const image of images) {

            if(typeof image === 'string') {
                imagesUrl.push(image);
                continue;
            }

            const storageRef = ref(storage, `products/${title}/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);
            imagesUrl.push(downloadURL);
        }
    

        product.title = title;
        product.price = price;
        product.stock = stock;
        product.images = imagesUrl;
        product.category = category;
        // product.qualities = qualities;
        product.description = description;
        product.tagNumber = tagNumber;
        product.tax = tax;
        product.discount = discount;

        await product.save()

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            productId: product._id as string,
        }, { status: 200 })

    } catch (error) {
        console.log("Error updating product");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

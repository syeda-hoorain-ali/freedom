
// /app/api/admin/add-product/route.ts

import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


const storage = getStorage(app);

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
        

        const imagesUrl: string[] = []

        for (const image of images) {
            const storageRef = ref(storage, `products/${title}/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);
            imagesUrl.push(downloadURL);
        }


        const newProduct = new ProductModel({
            title, price, stock, category,
            description, tagNumber,
            tax, discount,
            images: imagesUrl
            // qualities
        });

        await newProduct.save()

        return NextResponse.json({
            success: true,
            message: "Product added",
            productId: newProduct._id as string,
        }, { status: 200 })

    } catch (error) {
        console.log("Error adding products");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

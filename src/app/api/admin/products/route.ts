import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { app } from "@/lib/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


const storage = getStorage(app);

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

export const POST = async (request: NextRequest) => {
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
        const qualities = formData.getAll("qualities") as string[];
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
            images: imagesUrl,
            qualities
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

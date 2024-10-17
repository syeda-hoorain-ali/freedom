import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/Order";
import { NextResponse } from "next/server";

interface Data {
    username: string;
    email: string;
    totalPrice: number;
    totalProducts: number;
    cart: {
        productId: string,
        quantity: string,
    }[];
}

export const POST = async (request: Request) => {
    await dbConnect();

    try {
        const { username, email, totalPrice, totalProducts, cart }: Data = await request.json();

        if (cart.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Cart is empty"
            }, { status: 400 })
        }

        const order = new OrderModel({
            email,
            username,
            totalPrice,
            totalProducts,
            products: cart,
        })

        await order.save();


        return NextResponse.json({
            success: true,
            message: "Order placed successfully",
            orderId: order._id
        }, { status: 201 })


    } catch (error) {
        console.log("");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: ""
        }, { status: 500 })
    }
}
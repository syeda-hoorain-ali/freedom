import dbConnect from "@/lib/dbConnect"
import OrderModel from "@/models/Order";
import { NextResponse } from "next/server";

export const GET = async () => {
    await dbConnect();

    try {
        const orders = await OrderModel.find();

        if (!orders) {
            return NextResponse.json({
                success: false,
                message: "No orders to get"
            }, { status: 403 })
        }

        return NextResponse.json({
            success: true,
            orders
        }, { status: 201 })

    } catch (error) {
        console.log("Error getting orders");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error getting orders"
        }, { status: 500 })
    }
}
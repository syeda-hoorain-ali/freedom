import dbConnect from "@/lib/dbConnect"
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
    await dbConnect();

    try {
        const users = await UserModel.find().select('-password');

        if (!users) {
            return NextResponse.json({
                success: false,
                message: "No users found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            users
        }, { status: 200 })

    } catch (error) {
        console.log("Error getting users");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error getting users"
        }, { status: 500 })
    }
}
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request) => {
    try {
        const {userId, isAdmin} = await request.json();
        const user = await UserModel.findById(userId);

        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        user.isAdmin = isAdmin;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Role updated successfully"
        }, { status: 200 })

    } catch (error) {
        console.log("Error updating role");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error updating role"
        }, { status: 500 })
    }
}
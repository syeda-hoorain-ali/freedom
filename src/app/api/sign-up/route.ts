import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    await dbConnect();

    try {
        const { email, password }: { email: string, password: string } = await request.json();

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "Email already registered",
            }, { status: 401 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            email,
            username: email.split('@')[0],
            password: hashedPassword,
            isAdmin: false,
            cart: [],
        })

        await user.save();


        return Response.json({
            success: true,
            message: "User registered successfully"
        }, { status: 201 })


    } catch (error) {
        console.log("Error registering user");
        console.log(error);

        return NextResponse.json({
            success: false,
            message: "Error registering user",
        }, { status: 500 })
    }


}
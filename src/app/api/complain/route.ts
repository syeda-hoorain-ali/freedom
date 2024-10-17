import dbConnect from "@/lib/dbConnect"
import ComplainModel, { Complain } from "@/models/Complain";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    await dbConnect();

    const { firstName, lastName, email, subject, message }: Complain = await request.json();

    try {
        const newComplain = new ComplainModel({ firstName, lastName, email, subject, message })

        await newComplain.save()

        return NextResponse.json({
            success: true,
            message: "Message send successfully",
            complainId: newComplain._id as string,
        }, { status: 200 })

    } catch (error) {
        console.log("");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

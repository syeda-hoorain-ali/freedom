import dbConnect from "@/lib/dbConnect"
import ComplainModel from "@/models/Complain";
import { NextResponse } from "next/server";

export const GET = async () => {
    await dbConnect();

    try {
        const complains = await ComplainModel.find();

        if (!complains) {
            return NextResponse.json({
                success: false,
                message: "No complains to get"
            }, { status: 403 })
        }

        return NextResponse.json({
            success: true,
            complains
        }, { status: 201 })

    } catch (error) {
        console.log("Error getting complains");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error getting complains"
        }, { status: 500 })
    }
}
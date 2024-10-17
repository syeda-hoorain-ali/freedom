import dbConnect from '@/lib/dbConnect';
import UserModel, { CartProduct } from '@/models/User';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

export const POST = async (request: Request) => {
    await dbConnect();

    const { productId } = await request.json();
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({
            status: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    try {
        const user = await UserModel.findById(session.user._id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Cannot find user"
            }, { status: 404 })
        }

        const existingProduct = user.cart.find(item => item._id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;

        } else {
            let product = { productId, quantity: 1 }
            user.cart.push(product as CartProduct);
        }

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Product added to cart"
        }, { status: 201 });

    } catch (error) {
        console.log("Error adding to cart");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error adding to cart"
        }, { status: 500 });
    }
}

export const GET = async (request: Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({
            status: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    try {
        const user = await UserModel.findById(session.user._id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Cannot find user"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            cart: user.cart
        }, { status: 200 });

    } catch (error) {
        console.log("Error fetching cart items");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error fetching cart items"
        }, { status: 500 });
    }
}

export const PATCH = async (request: Request) => {
    await dbConnect();

    const { productId, quantity } = await request.json();
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({
            status: false,
            message: "Not authenticated"
        }, { status: 401 })
    }


    try {
        const user = await UserModel.findById(session.user._id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Cannot find user"
            }, { status: 404 })
        }

        const cartItem = user.cart.find(item => item._id === productId);

        if (!cartItem) {
            return NextResponse.json({
                success: false,
                message: "Cart item not found"
            }, { status: 404 });
        }

        cartItem.quantity = quantity;
        await user.save();
    

        return NextResponse.json({
        success: true,
        messeage: "Cart updated successfully"
    }, { status: 200 });

} catch (error) {
    console.log("Error updating cart item");
    console.error(error);

    return NextResponse.json({
        success: false,
        message: "Error updating cart item"
    }, { status: 500 });
}
}

export const DELETE = async (request: Request) => {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({
            status: false,
            message: "Not authenticated"
        }, { status: 401 })
    }
    

    try {
        const updatedCart = await UserModel.updateOne(
            { _id: session.user._id },
            { $pull: { cart: { _id: productId } } }
        );

        if (updatedCart.modifiedCount === 0) {
            return NextResponse.json({
                success: false,
                message: "Cart item not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Item removed from cart"
        }, { status: 200 });

    } catch (error) {
        console.log("Error removing cart item");
        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Error removing cart item"
        }, { status: 500 });
    }
}

import mongoose, { Document, Schema } from "mongoose";

export interface CartProduct extends Document {
    productId: string;
    quantity: number;
}

export interface User extends Document {
    email: string;
    username: string;
    password: string;
    isAdmin: boolean;
    cart: CartProduct[];
}


const CartProductSchema: Schema<CartProduct> = new Schema({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    }
})

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    cart: [CartProductSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;


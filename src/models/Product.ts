import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document {
    title: string;
    price: number;
    stock: number;
    images: string[];
    createdAt: Date;
    category: string;
    qualities: string[];
    description: string;
    sold: number;

    tagNumber: number;
    tax: number;
    discount: number;
}


const ProductSchema: Schema<Product> = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 1,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    category: {
        type: String,
        required: true,
    },
    qualities: {
        type: [String],
        required: true,
        default: [],
    },
    description: {
        type: String,
        required: true,
    },
    sold: {
        type: Number,
        required: true,
        default: 0,
    },
    images: {
        type: [String],
        required: true,
        default: [],
    },
})

const ProductModel = (mongoose.models.Product as mongoose.Model<Product>) || mongoose.model<Product>("Product", ProductSchema)

export default ProductModel;


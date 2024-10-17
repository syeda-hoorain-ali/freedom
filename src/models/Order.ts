import mongoose, { Document, Schema } from "mongoose";

export interface OrderProduct extends Document {
    productId: string;
    quantity: number;
}

export interface Order extends Document {
    username: string;
    email: string;
    createdAt: Date;
    totalPrice: number;
    totalProducts: number;
    products: OrderProduct[];
}


const OrderProductSchema: Schema<OrderProduct> = new Schema({
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

const OrderSchema: Schema<Order> = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    totalProducts: {
        type: Number,
        required: true,
    },
    products: [OrderProductSchema]
})

const OrderModel = mongoose.models.Order as mongoose.Model<Order> || mongoose.model("Order", OrderSchema)

export default OrderModel;



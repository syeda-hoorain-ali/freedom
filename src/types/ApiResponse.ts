import { Complain } from "@/models/Complain";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { CartProduct as ResponseCartProduct, User } from "@/models/User";

export interface UserWithId extends User { _id: string };
export interface OrderWithId extends Order { _id: string };
export interface ProductWithId extends Product { _id: string };
export interface ComplainWithId extends Complain { _id: string };

export interface ApiResponse {
    success: boolean;
    message: string;
    cart?: ResponseCartProduct[]
    product?: Product;
    products?: Product[];
    productId?: string;
    complainId?: string;
}

export interface AdminApiResponse {
    success: boolean;
    message: string;
    product?: Product;
    productId?: string;
    users?: UserWithId[];
    orders?: OrderWithId[];
    products?: ProductWithId[];
    complains?: ComplainWithId[];
}

export interface ICartProduct {
    id: string;
    title: string;
    category: string;
    image: string;
    price: number;
    stock: number;
    quantity: number;
}

export interface IComplain {
    firstName: string;
    lastName: string;
    subject: string;
    email: string;
    message: string;
}



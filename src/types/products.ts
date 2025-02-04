export interface Product {
    title: string;
    price: number;
    stock: number;
    images: (File | string)[];
    qualities: string[];
    category: string;
    description: string;
    tagNumber: number;
    tax: number;
    discount: number;
}
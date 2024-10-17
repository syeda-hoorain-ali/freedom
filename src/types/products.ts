export interface Product {
    title: string;
    price: number;
    stock: number;
    images: (File | string)[];
    category: string;
    description: string;
    tagNumber: number;
    tax: number;
    discount: number;
}
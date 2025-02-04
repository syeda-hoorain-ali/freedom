import { AdminApiResponse, ApiResponse, ICartProduct, IComplain, UserWithId } from "@/types/ApiResponse";
import { Product } from "@/types/products";
import { Product as ResponseProduct } from "@/models/Product";
import axios, { AxiosError } from "axios";
import { CartProduct as Cart } from "@/models/User";

// --------------------- Admin ---------------------

export const addNewProduct = async (data: Product): Promise<AdminApiResponse> => {

    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('price', data.price.toString())
    formData.append('stock', data.stock.toString())
    formData.append('category', data.category)
    formData.append('description', data.description)
    formData.append('tagNumber', data.tagNumber.toString())
    formData.append('tax', data.tax.toString())
    formData.append('discount', data.discount.toString())

    data.qualities.forEach(quality => formData.append('qualities', quality))
    data.images.forEach(image => formData.append('images', image))

    try {
        const response = await axios.post<AdminApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data

    } catch (error) {

        const axiosError = error as AxiosError<AdminApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        console.log(message)
        return { success: false, message }
    }
}

export const getProductData = async (id: string): Promise<ResponseProduct | undefined> => {
    try {
        const response = await axios.get<AdminApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/products/${id}`);
        return response.data.product;

    } catch (error) {

        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        console.log(message)
        return undefined
    }
}

export const updateProduct = async (id: string, data: Product): Promise<AdminApiResponse> => {

    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('price', data.price.toString())
    formData.append('stock', data.stock.toString())
    formData.append('category', data.category)
    formData.append('description', data.description)
    formData.append('tagNumber', data.tagNumber.toString())
    formData.append('tax', data.tax.toString())
    formData.append('discount', data.discount.toString())

    data.qualities.forEach(quality => formData.append('qualities', quality))
    data.images.forEach(image => formData.append('images', image))

    try {
        const response = await axios.patch<AdminApiResponse>(`/api/admin/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data

    } catch (error) {

        const axiosError = error as AxiosError<AdminApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        console.log(message)
        return { success: false, message }
    }
}

export const deleteProduct = async (id: string): Promise<AdminApiResponse> => {
    try {
        const response = await axios.delete<AdminApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/admin/products/${id}`);
        return response.data;

    } catch (error) {

        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        console.log(message)
        return { success: false, message };
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get<AdminApiResponse>("/api/admin/products");

        const products = response.data.products?.map(product => ({
            _id: product._id,
            title: product.title,
            category: product.category,
            stock: product.stock,
            uploadAt: product.createdAt,
            images: product.images,
        }))

        return {
            success: response.data.success,
            message: response.data.message,
            products: products || []
        }

    } catch (error) {
        const axiosError = error as AxiosError<AdminApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message;
        console.log(message);

        return { products: [], message, success: false }
    }
}

export const getUsers = async (): Promise<{ users: UserWithId[]; message: string }> => {
    try {
        const response = await axios.get<AdminApiResponse>("/api/admin/users");

        return {
            users: response.data.users || [],
            message: response.data.message
        }

    } catch (error) {
        const axiosError = error as AxiosError<AdminApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message;
        console.log(message);

        return { users: [], message }
    }
}

// --------------------- Products ---------------------

export const getProduct = async (id: string): Promise<ResponseProduct | undefined> => {
    try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products/${id}`);

        return response.data.product;

    } catch (error) {

        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        console.log(message)
        return undefined
    }
}

export const getNewProducts = async (limit: number): Promise<ResponseProduct[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products/new-arrival?limit=${limit}`);
        return response.data.products || [];

    } catch (error) {

        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        console.log(message)
        return []
    }
}

export const getTrendingProducts = async (limit: number): Promise<ResponseProduct[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products/trending?limit=${limit}`);
        return response.data.products || [];

    } catch (error) {

        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        console.log(message)
        return []
    }
}

export const searchProducts = async (category: string, query: string): Promise<ResponseProduct[]> => {
    try {
        const url = `/api/products?category=${category}&query=${query}`
        const response = await axios.get<ApiResponse>(url)

        return response.data.products || []

    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        console.error(message);

        return []
    }
}

// --------------------- Cart ---------------------

export const addToCart = async (productId: string): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/cart`, { productId })
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message

        console.error(message);
        return { success: false, message }
    }
}

export const getCart = async (): Promise<Cart[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/cart`)
        return response.data.cart || []

    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message

        console.error(message);
        return []
    }
}

export const updateCart = async (productId: string, quantity: number): Promise<ApiResponse> => {
    try {
        const response = await axios.patch<ApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/cart`, { productId, quantity })
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message

        console.error(message);
        return { success: false, message }
    }
}

export const removeFromCart = async (productId: string): Promise<ApiResponse> => {
    try {
        const response = await axios.delete<ApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/cart?productId=${productId}`)
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message

        console.error(message);
        return { success: false, message }
    }
}

export const getCartProducts = async (cart: Cart[]): Promise<ICartProduct[]> => {
    try {
        const productIds = cart.map(p => p.productId)
        const response = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/cart-products`, { productIds });

        if (!response.data.success) return []
        if (!response.data.products) return []

        const cartProducts = response.data.products.map(product => {
            const cartProduct = cart.find(p => p.productId == product._id)
            if (!cartProduct) return null;

            return {
                id: cartProduct._id as string,
                title: product.title,
                category: product.category,
                image: product.images[0],
                price: product.price,
                stock: product.stock,
                quantity: cartProduct.quantity
            }

        }).filter(p => p !== null)


        return cartProducts

    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message

        console.error(message);
        return []
    }
}

// --------------------- User ---------------------

export const complain = async (data: IComplain): Promise<{ success: boolean; message: string }> => {
    try {

        const response = await axios.post<ApiResponse>('/api/complain', data)

        return { success: true, message: response.data.message }

    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const message = axiosError.response?.data.message || "Something went wrong"

        console.log(axiosError);
        return { success: false, message }
    }
}

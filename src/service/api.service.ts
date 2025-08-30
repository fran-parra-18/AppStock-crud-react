
import { Product } from '../models/product.model';
import { UseApiCall } from '../models/useApi.model';
import { createintance } from './axios.service';

const api = createintance;

export const getAllproducts = (): UseApiCall<Product[]> => {
    const controller = new AbortController();

    return {
        call: api.get<Product[]>(`/`, { signal: controller.signal }),
        controller
    };
}


export const newProduct = (product: Product): UseApiCall<null> => {
    const controller = new AbortController();
    return {
        call: api.post<null>('/', product, { signal: controller.signal }),
        controller
    }
}

export const updateProduct = (product:Product): UseApiCall<Product> => {
    const controller = new AbortController();
    return {
        call: api.put<Product>(`/${product.id}`,product, { signal: controller.signal }),
        controller
    }
}

export const deleteProduct = (product: Product): UseApiCall<Product> => {
    const controller = new AbortController();
    return {
        call: api.delete<Product>(`/${product.id}`,  { signal: controller.signal }),
        controller
    }
}
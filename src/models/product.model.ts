export interface Product {
    id?:number;
    name:string;
    price:number;
    stock:number;
}

// Productos con este stock o menos se consideran para reponer
export const LOW_STOCK = 5;

export const emptyProduct: Product = {
    name:"",
    price:0,
    stock:0
}
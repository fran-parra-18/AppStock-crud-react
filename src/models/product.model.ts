export interface Product {
    id?:number;
    name:string;
    price:number;
    stock:number;
}

export const emptyProduct: Product = {
    name:"",
    price:0,
    stock:0
}
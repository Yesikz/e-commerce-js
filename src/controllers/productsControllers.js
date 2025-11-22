import products from "../models/Productos.js";

export const allProductsController = ()=>{
    if (!products || products.length === 0) {
        throw new Error("No hay productos disponibles");
    }
    return products;
}
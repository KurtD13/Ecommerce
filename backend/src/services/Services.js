import { query } from "../db.js";

export const getProducts = async() =>{
    const{rows} = await query('SELECT * FROM products_info ');
    return rows;
}
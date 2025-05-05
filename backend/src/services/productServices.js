import { query } from "../db.js";

export const getProducts = async() =>{
    const{rows} = await query('SELECT * FROM products_info ');
    return rows;
}

export const createProducts = async(productInfo) => {
    const{ pname, pprice, pdesc, pimageurl, stock, is_available } = productInfo;
    const { rows } = await query (
        'INSERT INTO products_info (pname, pprice, pdesc, pimageurl, stock, is_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [pname, pprice, pdesc, pimageurl, stock, is_available]
    );
    return rows[0];
}

export const updateProduct = async(productId, productInfo) => {
    const{ pname, pprice, pdesc, pimageurl, stock, is_available } = productInfo;
    const { rows } = await query (
        'UPDATE products_info SET pname = $1, pprice = $2, pdesc = $3, pimageurl = $4, stock = $5, is_available = $6 WHERE pid = $7 RETURNING *',
        [ pname, pprice, pdesc, pimageurl, stock, is_available, productId ]
    );
    return rows[0];
}

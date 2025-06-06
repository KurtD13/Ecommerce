import { query } from "../db.js";

export const getProducts = async() =>{
    const{rows} = await query('SELECT * FROM products_info ');
    return rows;
}

export const createProducts = async(productInfo) => {
    const{ pname, pprice, pimageurl, pdesc, stock, shopkey} = productInfo;
    const { rows } = await query (
        'INSERT INTO products_info (pname, pprice, pimageurl, pdesc, stock, shopkey) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [pname, pprice, pimageurl, pdesc, stock, shopkey]
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

export const deleteProduct = async (productId) => {
    const { rowCount } = await query (
        'DELETE FROM products_info WHERE pid = $1', [productId]
    );
        return rowCount > 0;
    
}

export const searchProduct = async (searchTerm) => {
    const isNumeric = !isNaN(searchTerm);  // Check if search term is a number
    const queryText = isNumeric
        ? 'SELECT * FROM products_info WHERE pid = $1 OR pname ILIKE $2 OR pdesc ILIKE $2'
        : 'SELECT * FROM products_info WHERE pname ILIKE $1 OR pdesc ILIKE $1';

    const values = isNumeric
        ? [parseInt(searchTerm), `%${searchTerm}%`]
        : [`%${searchTerm}%`];

    const { rows } = await query(queryText, values);
    return rows;
};  

export const getProductById = async (productId) => {
    const { rows } = await query('SELECT * FROM products_info WHERE pid = $1', [productId]);
    return rows[0];
};


export const getShopProducts = async (shopkey) => {
  const { rows } = await query(
    'SELECT * FROM products_info WHERE shopkey = $1',
    [shopkey]
  );
  return rows;
};


export const updateProductRatings = async(productinfo, pid) => {
    const{ pratings } = productinfo;
    const { rows } = await query (
        'UPDATE products_info SET pratings = $1 WHERE pid = $2 RETURNING *',
        [pratings, pid ]
    );
    return rows[0];
}

export const updateProductAvailability = async(productinfo, pid) => {
    const{ is_available } = productinfo;
    const { rows } = await query (
        'UPDATE products_info SET is_available = $1 WHERE pid = $2 RETURNING *',
        [is_available, pid ]
    );
    return rows[0];
}


export const updateAvailabilityShop = async(productinfo, shopkey) => {
    const{ is_available } = productinfo;
    const { rows } = await query (
        'UPDATE products_info SET is_available = $1 WHERE shopkey = $2 RETURNING *',
        [is_available, shopkey ]
    );
    return rows;
}

export const getTotalSales = async (productId) => {
    const { rows } = await query('SELECT ptotalsales FROM products_info WHERE pid = $1', [productId]);
    return rows[0];
};


export const updateTotalSales = async(productinfo, pid) => {
    const{ ptotalsales } = productinfo;
    const { rows } = await query (
        'UPDATE products_info SET ptotalsales = $1 WHERE pid = $2 RETURNING *',
        [ptotalsales, pid ]
    );
    return rows;
}

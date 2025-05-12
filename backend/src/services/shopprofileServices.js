import { query } from "../db.js";

export const getShop = async() =>{
    const{rows} = await query('SELECT * FROM shop_profile');
    return rows;
}

export const createShop = async(shopInfo) => {
    const{ shopname, shopdesc, shopbanner, sellerkey } = shopInfo;
    const { rows } = await query (
        'INSERT INTO shop_profile (shopname, shopdesc, shopbanner, sellerkey) VALUES ($1, $2, $3, $4) RETURNING *',
        [shopname, shopdesc, shopbanner, sellerkey ]
    );
    return rows[0];
}

export const updateShop = async(shopid, shopInfo) => {
    const{ shopname, shopdesc, shopbanner, sellerkey } = shopInfo;
    const { rows } = await query (
        'UPDATE shop_profile SET shopname = $1, shopdesc = $2, shopbanner = $3, sellerkey = $4 WHERE shopid = $5 RETURNING *',
        [ shopname, shopdesc, shopbanner, sellerkey, shopid ]
    );
    return rows[0];
}


export const deleteShop = async (shopid) => {
    const { rowCount } = await query (
        'DELETE FROM shop_profile WHERE shopid = $1', [shopid]
    );
        return rowCount > 0;
    
}
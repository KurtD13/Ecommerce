import { query } from "../db.js";

export const getShop = async() =>{
    const{rows} = await query('SELECT * FROM shop_profile');
    return rows;
}

export const createShop = async(shopInfo) => {
    const{ sellername, shippinglocation, shopname, shopdesc, shopbanner, shoplogo, userkey } = shopInfo;
    const { rows } = await query (
        'INSERT INTO shop_profile (sellername, shippinglocation, shopname, shopdesc, shopbanner, shoplogo, userkey) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [sellername, shippinglocation, shopname, shopdesc, shopbanner, shoplogo, userkey ]
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

export const getShopID = async (userkey) => {
  const { rows } = await query(
    'SELECT shopid FROM shop_profile WHERE userkey = $1',
    [userkey]
  );
  return rows[0];
};

export const getShopData = async (shopkey) => {
  const { rows } = await query(
    'SELECT * FROM shop_profile WHERE shopid = $1',
    [shopkey]
  );
  return rows;
};

export const updateShopRatings = async(shopinfo, shopid) => {
    const{ shopratings } = shopinfo;
    const { rows } = await query (
        'UPDATE shop_profile SET shopratings = $1 WHERE shopid = $2 RETURNING *',
        [shopratings, shopid ]
    );
    return rows[0];
}


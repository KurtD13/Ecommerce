import { query } from "../db.js";

export const getCart = async() =>{
    const{rows} = await query('SELECT * FROM cart_list');
    return rows;
}

export const createCart = async (cartInfo) => {
    const { userkey, pquantity, variation, productkey, colorkey, ptotal } = cartInfo;

    const { rows } = await query(
        'INSERT INTO cart_list (userkey, pquantity, variation, productkey, colorkey, ptotal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [userkey, pquantity, variation, productkey, colorkey, ptotal]
    );

    return rows[0];
};
export const updateCart = async(cartid, cartInfo) => {
    const{ pquantity, ptotal, productid, variation, userkey   } = cartInfo;
    const { rows } = await query (
        'UPDATE cart_list SET pquantity = $1, ptotal = $2, productkey = $3, variation = $4, userkey = $5 WHERE cartid = $6 RETURNING *',
        [pquantity, ptotal, productid, variation, userkey, cartid ]
    );
    return rows[0];
}


export const deleteCart = async (cartid) => {
    const { rowCount } = await query (
        'DELETE FROM cart_list WHERE cartid = $1', [cartid]
    );
        return rowCount > 0;
    
}
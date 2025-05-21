import { query } from "../db.js";

export const getCart = async() =>{
    const{rows} = await query('SELECT * FROM cart_list');
    return rows;
}

export const createCart = async (cartInfo) => {
    const { userkey, pquantity, variation, productkey, ptotal } = cartInfo;

    const { rows } = await query(
        'INSERT INTO cart_list (userkey, pquantity, variation, productkey, ptotal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userkey, pquantity, variation, productkey, ptotal]
    );

    return rows[0];
};
export const updateCart = async (cartid, cartInfo) => {
    const { pquantity, ptotal, variation, userkey } = cartInfo; // Exclude productkey
    const { rows } = await query(
        'UPDATE cart_list SET pquantity = $1, ptotal = $2, variation = $3, userkey = $4 WHERE cartid = $5 RETURNING *',
        [pquantity, ptotal, variation, userkey, cartid]
    );
    return rows[0];
};


export const deleteCart = async (cartid) => {
    const { rowCount } = await query (
        'DELETE FROM cart_list WHERE cartid = $1', [cartid]
    );
        return rowCount > 0;
    
}
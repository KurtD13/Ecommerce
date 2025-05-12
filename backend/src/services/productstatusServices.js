import { query } from "../db.js";

export const getCart = async() =>{
    const{rows} = await query('SELECT * FROM product_statuslist');
    return rows;
}


export const createCart = async(cartInfo) => {
    const{ pstatus, userkey, productkey} = cartInfo;
    const { rows } = await query (
        'INSERT INTO product_statuslist (pstatus, userkey, productkey) VALUES ($1, $2, $3) RETURNING *',
        [ pstatus, userkey, productkey]
    );
    return rows[0];
}

export const updateCart = async(pstatusid, cartInfo) => {
    const{ pstatus, userkey, productkey } = cartInfo;
    const { rows } = await query (
        'UPDATE product_statuslist SET pstatus = $1, userkey = $2, productkey = $3 WHERE pstatusid = $4 RETURNING *',
        [ pstatus, userkey, productkey, pstatusid ]
    );
    return rows[0];
}

export const deleteCart = async (pstatusid) => {
    const { rowCount } = await query (
        'DELETE FROM product_statuslist WHERE pstatusid = $1', [pstatusid]
    );
        return rowCount > 0;
    
}
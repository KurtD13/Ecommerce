import { query } from "../db.js";

export const getSeller = async() =>{
    const{rows} = await query('SELECT * FROM seller_profile');
    return rows;
}


export const createSeller = async(sellerInfo) => {
    const{ sellername, sellerstatus, sellerratings, sellershopid, userkey} = sellerInfo;
    const { rows } = await query (
        'INSERT INTO seller_profile ( sellername, sellerstatus, sellerratings, sellershopid, userkey) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [ sellername, sellerstatus, sellerratings, sellershopid, userkey]
    );
    return rows[0];
}

export const updateSeller = async(sellerid, sellerInfo) => {
    const{  sellername, sellerstatus, sellerratings, sellershopid, userkey} = sellerInfo;
    const { rows } = await query (
        'UPDATE seller_profile SET sellername = $1, sellerstatus = $2, sellerratings = $3, sellershopid = $4, userkey = $5 WHERE sellerid = $6 RETURNING *',
        [ sellername, sellerstatus, sellerratings, sellershopid, userkey, sellerid]
    );
    return rows[0];
}

export const deleteSeller = async (sellerid) => {
    const { rowCount } = await query (
        'DELETE FROM seller_profile WHERE sellerid = $1', [sellerid]
    );
        return rowCount > 0;
    
}
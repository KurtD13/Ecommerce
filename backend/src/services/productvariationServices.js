import { query } from "../db.js";

export const getVariation = async() =>{
    const{rows} = await query('SELECT * FROM product_variation');
    return rows;
}


export const createVariation = async(variationInfo) => {
    const{ pvname, pvimage, productkey} = variationInfo;
    const { rows } = await query (
        'INSERT INTO product_variation (pvname, pvimage, productkey) VALUES ($1, $2, $3) RETURNING *',
        [pvname, pvimage, productkey]
    );
    return rows[0];
}

export const updateVariation = async(pvid, variationInfo) => {
    const{ pvname, pvimage, productkey  } = variationInfo;
    const { rows } = await query (
        'UPDATE product_variation SET pvname = $1, pvimage = $2, productkey = $3 WHERE pvid = $4 RETURNING *',
        [ pvname, pvimage, productkey, pvid ]
    );
    return rows[0];
}

export const deleteVariation = async (pvid) => {
    const { rowCount } = await query (
        'DELETE FROM product_variation WHERE pvid = $1', [pvid]
    );
        return rowCount > 0;
    
}

export const getVariationProduct = async(productkey) =>{
    const{rows} = await query('SELECT * FROM product_variation WHERE productkey = $1',
    [productkey]);
    return rows;
}
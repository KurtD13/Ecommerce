import { query } from "../db.js";

export const getColor = async() =>{
    const{rows} = await query('SELECT * FROM product_color');
    return rows;
}

export const createColor = async(colorInfo) => {
    const{ colorname, productkey } = colorInfo ;
    const { rows } = await query (
        'INSERT INTO product_color (colorname, productkey  ) VALUES ($1, $2) RETURNING *',
        [colorname, productkey ]
    );
    return rows[0];
}

export const updateColor = async(colorid, colorInfo) => {
    const{colorname, productkey  } = colorInfo;
    const { rows } = await query (
        'UPDATE product_color SET colorname = $1, productkey = $2 WHERE colorid = $3 RETURNING *',
        [colorname, productkey, colorid ]
    );
    return rows[0];
}


export const deleteColor = async (colorid) => {
    const { rowCount } = await query (
        'DELETE FROM product_color WHERE colorid = $1', [colorid]
    );
        return rowCount > 0;
    
}
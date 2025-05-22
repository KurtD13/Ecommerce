import { query } from "../db.js";

export const getImage = async() =>{
    const{rows} = await query('SELECT * FROM product_imagelist ');
    return rows;
}

export const createImage = async(imageinfo) => {
    const{ pimagename, pimage, productkey } = imageinfo;
    const { rows } = await query (
        'INSERT INTO product_imagelist (pimagename, pimage, productkey) VALUES ($1, $2, $3) RETURNING *',
        [pimagename, pimage, productkey]
    );
    return rows[0];
}

export const updateImage = async(pimageid, imageinfo) => {
    const{ pimagename, pimage, productkey } = imageinfo;
    const { rows } = await query (
        'UPDATE product_imagelist SET pimagename = $1, pimage = $2, productkey = $3 WHERE pimageid = $4 RETURNING *',
        [  pimagename, pimage, productkey, pimageid ]
    );
    return rows[0];
}

export const deleteImage = async (pimageid) => {
    const { rowCount } = await query (
        'DELETE FROM product_imagelist WHERE pimageid = $1', [pimageid]
    );
        return rowCount > 0;
    
}

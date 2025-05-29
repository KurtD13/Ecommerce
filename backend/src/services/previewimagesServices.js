import { query } from "../db.js";

export const getImage = async() =>{
    const{rows} = await query('SELECT * FROM images_preview');
    return rows;
}

export const createImage = async(imageinfo) => {
    const{ previewname, pimages, productkey } = imageinfo;
    const { rows } = await query (
        'INSERT INTO images_preview (previewname, pimages, productkey) VALUES ($1, $2, $3) RETURNING *',
        [previewname, pimages, productkey]
    );
    return rows[0];
}

export const updateImage = async(imageid, imageinfo) => {
    const{ pimages, productkey, previewname } = imageinfo;
    const { rows } = await query (
        'UPDATE images_preview SET pimages = $1, productkey = $2, previewname = $3 WHERE imageid = $4 RETURNING *',
        [  pimages, productkey, previewname, imageid ]
    );
    return rows[0];
}

export const deleteImage = async (imageid) => {
    const { rowCount } = await query (
        'DELETE FROM images_preview WHERE imageid = $1', [imageid]
    );
        return rowCount > 0;
    
}

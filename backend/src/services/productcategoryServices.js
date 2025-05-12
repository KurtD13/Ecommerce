import { query } from "../db.js";

export const getCategory = async() =>{
    const{rows} = await query('SELECT * FROM product_category');
    return rows;
}

export const createCategory = async(categoryInfo) => {
    const{ category, productkey} = categoryInfo;
    const { rows } = await query (
        'INSERT INTO product_category (category, productkey) VALUES ($1, $2) RETURNING *',
        [category, productkey ]
    );
    return rows[0];
}

export const updateCategory = async(categoryid, categroyInfo) => {
    const{ category, productkey } = categroyInfo;
    const { rows } = await query (
        'UPDATE product_category SET category = $1, productkey = $2 WHERE categoryid = $3 RETURNING *',
        [ category, productkey, categoryid ]
    );
    return rows[0];
}


export const deleteCategory = async (categoryid) => {
    const { rowCount } = await query (
        'DELETE FROM product_category WHERE categoryid = $1', [categoryid]
    );
        return rowCount > 0;
    
}
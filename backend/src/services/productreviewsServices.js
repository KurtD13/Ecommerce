import { query } from "../db.js";

export const getReviews = async() =>{
    const{rows} = await query('SELECT * FROM product_reviews');
    return rows;
}

export const createReviews = async(reviesInfo) => {
    const{ reviewtitle, reviewdesc, reviewimage1, reviewimage2, reviewimage3, reviewimage4, productkey, userkey, reviewscore } = reviesInfo;
    const { rows } = await query (
        'INSERT INTO product_reviews (reviewtitle, reviewdesc, reviewimage1, reviewimage2, reviewimage3, reviewimage4, productkey, userkey, reviewscore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [reviewtitle, reviewdesc, reviewimage1, reviewimage2, reviewimage3, reviewimage4, productkey, userkey, reviewscore]
    );
    return rows[0];
}

export const updateReviews = async(userkey, reviewsInfo) => {
    const{ reviewtitle, reviewdesc, reviewimage1, reviewimage2, reviewimage3, reviewimage4, productkey, reviewscore  } = reviewsInfo;
    const { rows } = await query (
        'UPDATE product_reviews SET reviewtitle = $1, reviewdesc = $2, reviewimage1 = $3, reviewimage2 = $4, reviewimage3 = $5, reviewimage4 = $6, productkey = $7, reviewscore = $8 WHERE userkey = $9 RETURNING *',
        [ reviewtitle, reviewdesc, reviewimage1, reviewimage2, reviewimage3, reviewimage4, productkey,  reviewscore, userkey ]
    );
    return rows[0];
}

export const deleteReviews = async (previewsid) => {
    const { rowCount } = await query (
        'DELETE FROM product_reviews WHERE previewsid = $1', [previewsid]
    );
        return rowCount > 0;
    
}


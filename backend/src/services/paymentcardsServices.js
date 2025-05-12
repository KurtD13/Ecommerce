import { query } from "../db.js";

export const getCards = async() =>{
    const{rows} = await query('SELECT * FROM paymentmethod_cards');
    return rows;
}

export const createCards = async(cardinfo) => {
    const{ bankname, cardnumber, expirydate, cvv, nameoncard, card_status, userkey } = cardinfo;
    const { rows } = await query (
        'INSERT INTO paymentmethod_cards (bankname, cardnumber, expirydate, cvv, nameoncard, card_status, userkey ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [bankname, cardnumber, expirydate, cvv, nameoncard, card_status, userkey ]
    );
    return rows[0];
}

export const updateCards = async(paymentid, cardInfo) => {
    const{ bankname, cardnumber, expirydate, cvv, nameoncard, card_status, userkey } = cardInfo;
    const { rows } = await query (
        'UPDATE paymentmethod_cards SET bankname = $1, cardnumber = $2, expirydate = $3, cvv = $4, nameoncard = $5, card_status = $6, userkey = $7 WHERE paymentid = $8 RETURNING *',
        [ bankname, cardnumber, expirydate, cvv, nameoncard, card_status, userkey , paymentid ]
    );
    return rows[0];
}


export const deleteCards = async (paymentid) => {
    const { rowCount } = await query (
        'DELETE FROM paymentmethod_cards WHERE paymentid = $1', [paymentid]
    );
        return rowCount > 0;
    
}
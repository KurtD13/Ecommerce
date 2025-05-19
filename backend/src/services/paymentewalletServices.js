import { query } from "../db.js";

export const getEwallet = async() =>{
    const{rows} = await query('SELECT * FROM paymentmethod_ewallet');
    return rows;
}

export const createEwallet = async (ewalletInfo) => {
  const { epaymenttype, epaymentphone, epaymentstatus, userkey } = ewalletInfo;
  console.log("Inserting eWallet:", ewalletInfo); // Debugging log
  const { rows } = await query(
    'INSERT INTO paymentmethod_ewallet (epaymenttype, epaymentphone, epaymentstatus, userkey) VALUES ($1, $2, $3, $4) RETURNING *',
    [epaymenttype, epaymentphone, epaymentstatus, userkey]
  );
  return rows[0];
};


export const updateEwallet = async(epaymentid, ewalletInfo) => {
    const{ epaymenttype, epaymentphone, epaymentstatus, userkey  } = ewalletInfo;
    const { rows } = await query (
        'UPDATE paymentmethod_ewallet SET epaymenttype = $1, epaymentphone = $2, epaymentstatus = $3, userkey = $4 WHERE epaymentid = $5 RETURNING *',
        [ epaymenttype, epaymentphone, epaymentstatus, userkey, epaymentid ]
    );
    return rows[0];
}

export const deleteEwallet = async (epaymentid) => {
    const { rowCount } = await query (
        'DELETE FROM paymentmethod_ewallet WHERE epaymentid = $1', [epaymentid]
    );
        return rowCount > 0;
    
}
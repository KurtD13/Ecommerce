import { query } from "../db.js";

export const getPstatus = async() =>{
    const{rows} = await query('SELECT * FROM product_statuslist');
    return rows;
}


export const createPstatus = async (pstatusInfo) => {
  const {
    pstatus,
    userkey,
    productkey,
    itemquantity,
    variation,
    parcelcost,
    paymenttype,
    paymentid,
    shipaddress,
    contactinfo
  } = pstatusInfo;

  const { rows } = await query(
    `INSERT INTO product_statuslist 
      (pstatus, userkey, productkey, itemquantity, variation, parcelcost, paymenttype, paymentid, shipaddress, contactinfo) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
     RETURNING *`,
    [
      pstatus,
      userkey,
      productkey,
      itemquantity,
      variation,
      parcelcost,
      paymenttype,
      paymentid,
      shipaddress,
      contactinfo
    ]
  );
  return rows[0];
};

export const updatePstatus = async(pstatusid, pstatusInfo) => {
    const{ pstatus, userkey, productkey } = pstatusInfo;
    const { rows } = await query (
        'UPDATE product_statuslist SET pstatus = $1, userkey = $2, productkey = $3 WHERE pstatusid = $4 RETURNING *',
        [ pstatus, userkey, productkey, pstatusid ]
    );
    return rows[0];
}

export const deletePstatus = async (pstatusid) => {
    const { rowCount } = await query (
        'DELETE FROM product_statuslist WHERE pstatusid = $1', [pstatusid]
    );
        return rowCount > 0;
    
}

export const updatePstatusToCancelled = async (pstatusid) => {
  const { rows } = await query(
    `UPDATE product_statuslist 
     SET pstatus = $1 
     WHERE pstatusid = $2 
     RETURNING *`,
    [5, pstatusid] // Set pstatus to 5 (Cancelled)
  );
  return rows[0];
};

export const updatePstatusToPaid = async (pstatusid) => {
  const { rows } = await query(
    `UPDATE product_statuslist 
     SET pstatus = $1 
     WHERE pstatusid = $2 
     RETURNING *`,
    [2, pstatusid] // Set pstatus to 2 (To Ship)
  );
  return rows[0];
};
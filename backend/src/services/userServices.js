import { query } from "../db.js";

export const getUser = async() =>{
    const{rows} = await query('SELECT * FROM consumer_profile ');
    return rows;
}

export const createUser = async(userInfo) => {
    const{ consumerusername, consumerpassword, consumerfirstname, consumermiddlename, consumerlastname, consumerbirthdate, consumerimage, consumerphone, consumeremail } = userInfo;
    const { rows } = await query (
        'INSERT INTO consumer_profile (consumerusername, consumerpassword, consumerfirstname, consumermiddlename, consumerlastname, consumerbirthdate, consumerimage, consumerphone, consumeremail ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [consumerusername, consumerpassword, consumerfirstname, consumermiddlename, consumerlastname, consumerbirthdate, consumerimage, consumerphone, consumeremail]
    );
    return rows[0];
}



export const updateUser = async (consumerid, userInfo) => {
  const {
    consumerusername,
    consumerpassword,
    consumerfirstname,
    consumermiddlename,
    consumerlastname,
    consumerbirthdate,
    consumerimage,
    consumerphone,
    consumeremail,
  } = userInfo;

  const { rows } = await query(
    `UPDATE consumer_profile 
     SET consumerusername = $1, 
         consumerpassword = $2, 
         consumerfirstname = $3, 
         consumermiddlename = $4, 
         consumerlastname = $5, 
         consumerbirthdate = $6, 
         consumerimage = $7, 
         consumerphone = $8, 
         consumeremail = $9 
     WHERE consumerid = $10 
     RETURNING *`,
    [
      consumerusername,
      consumerpassword || null, // Allow null if password is not updated
      consumerfirstname,
      consumermiddlename,
      consumerlastname,
      consumerbirthdate,
      consumerimage,
      consumerphone,
      consumeremail,
      consumerid,
    ]
  );
  return rows[0];
};

export const deleteUser = async (consumerid) => {
    const { rowCount } = await query (
        'DELETE FROM consumer_profile WHERE consumerid = $1', [consumerid]
    );
        return rowCount > 0;
    
}

export const searchUser = async (searchTerm) => {
    const isNumeric = /^\d+$/.test(searchTerm);
    const isPhone = /^\d{11}$/.test(searchTerm);
    const isValidConsumerId = isNumeric && parseInt(searchTerm) <= 2147483647;

    let queryText = `
        SELECT * FROM consumer_profile 
        WHERE consumerusername ILIKE $1 
           OR consumerlastname ILIKE $1 
           OR consumerfirstname ILIKE $1
           OR consumermiddlename ILIKE $1
           OR consumeremail ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    let paramIndex = 2;

    if (isValidConsumerId) {
        queryText += ` OR consumerid = $${paramIndex}`;
        values.push(parseInt(searchTerm));
        paramIndex++;
    }

    if (isPhone) {
        queryText += ` OR consumerphone = $${paramIndex}`;
        values.push(searchTerm);  // keep as string; Postgres will cast to NUMERIC
    }

    const { rows } = await query(queryText, values);
    return rows;
};


export const validateUser = async (email, password) => {
    const { rows } = await query(
        'SELECT consumerid FROM consumer_profile WHERE consumeremail = $1 AND consumerpassword = $2',
        [email, password]
    );
    return rows[0]; // Return the first matching user
};


export const getUserPhone = async (consumerid) => {
  const { rows } = await query(
    'SELECT consumerphone FROM consumer_profile WHERE consumerid = $1',
    [consumerid]
  );
  return rows[0]; // Return the first matching row
};

export const getuserSellerstatus = async (consumerid) => {
  const { rows } = await query(
    'SELECT consumersellerstatus FROM consumer_profile WHERE consumerid = $1',
    [consumerid]
  );
  return rows[0]; // Return the first matching row
};

export const getUserNameImage = async (consumerid) => {
  const { rows } = await query(
    'SELECT consumerfirstname, consumerimage FROM consumer_profile WHERE consumerid = $1',
    [consumerid]
  );
  return rows[0]; // Return the first matching row
};


export const updateSellerStatus = async (sellerinfo, consumerid) => {
  const sellerstatus = sellerinfo.sellerstatus || sellerinfo.consumersellerstatus;

  const { rows } = await query(
    `UPDATE consumer_profile SET consumersellerstatus = $1 WHERE consumerid = $2 RETURNING *`,
    [sellerstatus, consumerid]
  );

  console.log("Query result:", rows);

  return rows;
};
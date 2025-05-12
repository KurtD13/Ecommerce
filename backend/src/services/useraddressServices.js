import { query } from "../db.js";

export const getAddress = async() =>{
    const{rows} = await query('SELECT * FROM user_address');
    return rows;
}

export const createAddress = async(addressinfo) => {
    const{ country, region, province, city, barangay, postalcode, streetname, building, housenumber, userkey } = addressinfo;
    const { rows } = await query (
        'INSERT INTO user_address (country, region, province, city, barangay, postalcode, streetname, building, housenumber, userkey ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING *',
        [country, region, province, city, barangay, postalcode, streetname, building, housenumber, userkey]
    );
    return rows[0];
}

export const updateAddress = async(addressid, addressinfo) => {
    const{ country, region, province, city, barangay, postalcode, streetname, building, housenumber, userkey } = addressinfo;
    const { rows } = await query (
        'UPDATE user_address SET country = $1, region = $2, province = $3, city = $4, barangay = $5, postalcode = $6, streetname = $7, building = $8, housenumber = $9, userkey = $10 WHERE addressid = $11 RETURNING *',
        [country, region, province, city, barangay, postalcode, streetname, building, housenumber, userkey, addressid]
    );
    return rows[0];
}


export const deleteAddress = async (addressid) => {
    const { rowCount } = await query (
        'DELETE FROM user_address WHERE addressid = $1', [addressid]
    );
        return rowCount > 0;
    
}
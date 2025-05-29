import { query } from "../db.js";

export const getReports = async() =>{
    const{rows} = await query('SELECT * FROM shopreports ');
    return rows;
}

export const createReports = async(reportsInfo) => {
    const{ reportname, reportdesc, shopkey } = reportsInfo;
    const { rows } = await query (
        'INSERT INTO shopreports (reportname, reportdesc, shopkey ) VALUES ($1, $2, $3) RETURNING *',
        [reportname, reportdesc, shopkey]
    );
    return rows[0];
}



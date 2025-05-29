import { query } from "../db.js";

export const getReports = async() =>{
    const{rows} = await query('SELECT * FROM userreports ');
    return rows;
}

export const createReports = async(reportsInfo) => {
    const{ reporttitle, reportdescription, productkey, shopkey, userkey, reportstatus, reportimage } = reportsInfo;
    const { rows } = await query (
        'INSERT INTO userreports (reporttitle, reportdescription, productkey, shopkey, userkey, reportstatus, reportimage ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [reporttitle, reportdescription, productkey, shopkey, userkey, reportstatus, reportimage]
    );
    return rows[0];
}



export const updateReportstatus = async (reportid, reportsInfo) => {
  const { reportstatus  } = reportsInfo;

  const { rows } = await query(
    `UPDATE userreports 
     SET reportstatus = $1
     WHERE reportid = $2 
     RETURNING *`,
    [reportstatus, reportid]
  );
  return rows[0];
};

export const deleteReport = async (reportid) => {
    const { rowCount } = await query (
        'DELETE FROM userreports WHERE reportid = $1', [reportid]
    );
        return rowCount > 0;
    
}
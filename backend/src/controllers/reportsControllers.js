import * as Service from "../services/reportsServices.js"

export const getReports = async (req, res) =>{
    try{
        const reports = await Service.getReports();
        res.status(200).json(reports);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const createReports = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const reportsInfo = req.body;
        const newReports = await Service.createReports(reportsInfo);
        res.status(200).json(newReports);

    }catch(err){
        console.error("Error adding report", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateReportstatus = async (req, res) => {
  try {
    const reportid = req.params.reportid;
    const reportsInfo = req.body;
    const updatedReport = await Service.updateReportstatus(reportid, reportsInfo);
    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(updatedReport);
  } catch (err) {
    console.error("Error updating report: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteReport = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const reportid = req.params.reportid;   
        const deleted = await Service.deleteReport(reportid);
        if (!deleted){
            return res.status(404).json({message : 'Report not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting Report: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
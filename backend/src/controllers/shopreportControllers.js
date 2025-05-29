import * as Service from "../services/shopreportServices.js"

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

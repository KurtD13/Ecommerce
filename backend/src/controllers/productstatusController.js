import * as Service from "../services/productstatusServices.js"

export const getPstatus = async (req, res) =>{
    try{
        const pstatus = await Service.getPstatus();
        res.status(200).json(pstatus);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createPstatus = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pstatusInfo = req.body;
        const newPstatus = await Service.createPstatus(pstatusInfo);
        res.status(200).json(newPstatus);

    }catch(err){
        console.error("Error adding cart", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updatePstatus = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pstatusid = req.params.pstatusid;
        const pstatusInfo = req.body;   
        const updatedPstatusinfo = await Service.updatePstatus(pstatusid, pstatusInfo);
        if(!updatedPstatusinfo){
            return res.status(404).json({message: 'cart not found'});
        }
        res.status(200).json(updatedPstatusinfo);

    }catch(err){
        
        console.error("Error updating cart: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deletePstatus = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pstatusid = req.params.pstatusid;
        const pstatusInfo = req.body;   
        const deleted = await Service.deletePstatus(pstatusid);
        if (!deleted){
            return res.status(404).json({message : 'shop not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
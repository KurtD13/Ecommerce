import e from "express";
import * as Service from "../services/paymentewalletServices.js"

export const getEwallet = async (req, res) =>{
    try{
        const ewallet = await Service.getEwallet();
        res.status(200).json(ewallet);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const createEwallet = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const ewalletInfo = req.body;
        const newEwallet = await Service.createEwallet(ewalletInfo);
        res.status(200).json(newEwallet);

    }catch(err){
        console.error("Error adding ewallet", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateEwallet = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const epaymentid = req.params.epaymentid;
        const ewalletInfo = req.body;   
        const updatedeWallet = await Service.updateEwallet(epaymentid, ewalletInfo)
        if(!updatedeWallet){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(updatedeWallet);

    }catch(err){
        
        console.error("Error updating ewallet: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const deleteEwallet = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const epaymentid = req.params.epaymentid;
        const userInfo = req.body;   
        const deleted = await Service.deleteEwallet(epaymentid);
        if (!deleted){
            return res.status(404).json({message : 'ewallet not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting ewallet: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

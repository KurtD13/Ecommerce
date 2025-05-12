import e from "express";
import * as Service from "../services/sellerprofileServices.js"

export const getSeller = async (req, res) =>{
    try{
        const seller = await Service.getSeller();
        res.status(200).json(seller);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const createSeller = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const sellerInfo = req.body;
        const newSeller = await Service.createSeller(sellerInfo);
        res.status(200).json(newSeller);

    }catch(err){
        console.error("Error adding seller", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateSeller = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const sellerid = req.params.sellerid;
        const sellerInfo = req.body;   
        const updatedSeller = await Service.updateSeller(sellerid, sellerInfo)
        if(!updatedSeller){
            return res.status(404).json({message: 'seller not found'});
        }
        res.status(200).json(updatedSeller);

    }catch(err){
        
        console.error("Error updating seller: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const deleteSeller = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const sellerid = req.params.sellerid;
        const sellerInfo = req.body;   
        const deleted = await Service.deleteSeller(sellerid);
        if (!deleted){
            return res.status(404).json({message : 'ewallet not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting seller: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

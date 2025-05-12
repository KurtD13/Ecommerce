import e from "express";
import * as Service from "../services/useraddressServices.js"

export const getAddress = async (req, res) =>{
    try{
        const address = await Service.getAddress();
        res.status(200).json(address);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const createAddress = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const addressinfo = req.body;
        const newAddress = await Service.createAddress(addressinfo);
        res.status(200).json(newAddress);

    }catch(err){
        console.error("Error adding address", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateAddress = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const addressid = req.params.addressid;
        const addressinfo = req.body;   
        const updateAddress = await Service.updateAddress(addressid, addressinfo)
        if(!updateAddress){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(updateAddress);

    }catch(err){
        
        console.error("Error updating address: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const deleteAddress = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const addressid = req.params.addressid;
        const addressinfo = req.body;   
        const deleted = await Service.deleteAddress(addressid);
        if (!deleted){
            return res.status(404).json({message : 'address not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting address: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

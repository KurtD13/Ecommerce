import * as Service from "../services/userServices.js"

export const getUser = async (req, res) =>{
    try{
        const user = await Service.getUser();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const createUser = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const userInfo = req.body;
        const newUser = await Service.createUser(userInfo);
        res.status(200).json(newUser);

    }catch(err){
        console.error("Error adding product", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateUser = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const comsumerid = req.params.consumerid;
        const userInfo = req.body;   
        const updatedUser = await Service.updateUser(comsumerid, userInfo)
        if(!updatedUser){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(updatedUser);

    }catch(err){
        
        console.error("Error updating product: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const deleteUser = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const consumerid = req.params.consumerid;
        const userInfo = req.body;   
        const deleted = await Service.deleteUser(consumerid);
        if (!deleted){
            return res.status(404).json({message : 'Product not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting product: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const searchUser = async (req, res) => {
    try{
        const searchTerm = req.query.q;
        const userInfo = await Service.searchUser(searchTerm);
        res.status(200).json(userInfo);

    }catch(err){
        console.error("Error searching product: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
import * as Service from "../services/Services.js"

export const getProducts = async (req, res) =>{
    try{
        const products = await Service.getProducts();
        res.status(200).json(products);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};
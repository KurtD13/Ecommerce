import * as Service from "../services/Services.js"

export const getProducts = async (req, res) =>{
    try{
        const products = await Service.getProducts();
        res.status(200).json(products);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createProducts = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const productInfo = req.body;
        const newProduct = await Service.createProducts(productInfo);
        res.status(200).json(newProduct);

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const updateProduct = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const productId = req.params.id;
        const productInfo = req.body;
        const updatedProduct = await Service.updateProducts(productId, productInfo)
        if(!updatedProduct){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(updatedProduct);

    }catch(err){
        console.error("Error Fetching clients: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
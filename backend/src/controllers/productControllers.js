import * as Service from "../services/productServices.js"

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
        console.error("Error adding product", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const updateProduct = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const productId = req.params.pid;
        const productInfo = req.body;   
        const updatedProduct = await Service.updateProduct(productId, productInfo)
        if(!updatedProduct){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(updatedProduct);

    }catch(err){
        
        console.error("Error updating product: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deleteProduct = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const productId = req.params.pid;
        const productInfo = req.body;   
        const deleted = await Service.deleteProduct(productId);
        if (!deleted){
            return res.status(404).json({message : 'Product not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting product: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const searchProduct = async (req, res) => {
    try{
        const searchTerm = req.query.q;
        const productInfo = await Service.searchProduct(searchTerm);
        res.status(200).json(productInfo);

    }catch(err){
        console.error("Error searching product: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
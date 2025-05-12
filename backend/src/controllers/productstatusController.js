import * as Service from "../services/productstatusServices.js"

export const getCart = async (req, res) =>{
    try{
        const cart = await Service.getCart();
        res.status(200).json(cart);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createCart = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const cartInfo = req.body;
        const newCart = await Service.createCart(cartInfo);
        res.status(200).json(newCart);

    }catch(err){
        console.error("Error adding cart", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateCart = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pstatusid = req.params.pstatusid;
        const cartInfo = req.body;   
        const updatedcart = await Service.updateCart(pstatusid, cartInfo);
        if(!updatedcart){
            return res.status(404).json({message: 'cart not found'});
        }
        res.status(200).json(updatedcart);

    }catch(err){
        
        console.error("Error updating cart: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deleteCart = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pstatusid = req.params.pstatusid;
        const cartInfo = req.body;   
        const deleted = await Service.deleteCart(pstatusid);
        if (!deleted){
            return res.status(404).json({message : 'shop not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
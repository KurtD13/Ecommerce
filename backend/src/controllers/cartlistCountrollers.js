import * as Service from "../services/cartlistServices.js"

export const getCart = async (req, res) =>{
    try{
        const cart = await Service.getCart();
        res.status(200).json(cart);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createCart = async (req, res) => {
    try {
        const { userkey, pquantity, variation, productkey, ptotal } = req.body;

        const cartInfo = {
            userkey,
            pquantity,
            variation: variation || null,
            productkey,
            ptotal,
        };

        const newCart = await Service.createCart(cartInfo);
        res.status(200).json(newCart);
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateCart = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        const cartid = req.params.cartid;
        const { pquantity, ptotal, variation, userkey } = req.body; // Exclude productkey

        const cartInfo = { pquantity, ptotal, variation, userkey }; // Only include allowed fields
        const updatedCart = await Service.updateCart(cartid, cartInfo);

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(updatedCart);
    } catch (err) {
        console.error("Error updating cart: ", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteCart = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const cartid = req.params.cartid;
        const cartInfo = req.body;   
        const deleted = await Service.deleteCart(cartid);
        if (!deleted){
            return res.status(404).json({message : 'reviews not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting reviews: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

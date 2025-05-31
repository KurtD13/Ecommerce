import * as Service from "../services/shopprofileServices.js"

export const getShop = async (req, res) =>{
    try{
        const shop = await Service.getShop();
        res.status(200).json(shop);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createShop = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const shopInfo = req.body;
        const newShop = await Service.createShop(shopInfo);
        res.status(200).json(newShop);

    }catch(err){
        console.error("Error adding shop", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateShop = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const shopid = req.params.shopid;
        const shopInfo = req.body;   
        const updatedShop = await Service.updateShop(shopid, shopInfo)
        if(!updatedShop){
            return res.status(404).json({message: 'shop not found'});
        }
        res.status(200).json(updatedShop);

    }catch(err){
        
        console.error("Error updating shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deleteShop = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const shopid = req.params.shopid;
        const shopInfo = req.body;   
        const deleted = await Service.deleteShop(shopid);
        if (!deleted){
            return res.status(404).json({message : 'shop not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const getShopkey = async (req, res) => {
  try {
    const userkey = req.params.q; // Extract userkey from the route parameter
    const shopUserkey = await Service.getShopID(userkey);
    if (!shopUserkey) {
      return res.status(404).json({ message: "shopid not found" });
    }
    res.status(200).json(shopUserkey);
  } catch (err) {
    console.error("Error fetching shopid:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getShopData = async (req, res) => {
  try {
    const shopkey = req.params.shopkey; // Extract userkey from the route parameter
    const shopUserData = await Service.getShopData(shopkey);
    if (!shopUserData) {
      return res.status(404).json({ message: "Shop Data not found" });
    }
    res.status(200).json(shopUserData);
  } catch (err) {
    console.error("Error fetching Shop Data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateShopRatings = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const shopid = req.params.shopid;
        const shopinfo = req.body;   
        const updatedshop = await Service.updateShopRatings(shopinfo, shopid)
        if(!updatedshop){
            return res.status(404).json({message: 'shop not found'});
        }
        res.status(200).json(updatedshop);

    }catch(err){
        
        console.error("Error updating shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const updateShopStatus = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const shopid = req.params.shopid;
        const shopinfo = req.body;   
        const updatedshop = await Service.updateShopStatus(shopinfo, shopid)
        if(!updatedshop){
            return res.status(404).json({message: 'shop not found'});
        }
        res.status(200).json(updatedshop);

    }catch(err){
        
        console.error("Error updating shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const getShopBanner = async (req, res) =>{
    try{
        const shop = await Service.getShopBanner();
        res.status(200).json(shop);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};
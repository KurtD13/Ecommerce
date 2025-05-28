import * as Service from "../services/productvariationServices.js"

export const getVariation = async (req, res) =>{
    try{
        const variation = await Service.getVariation();
        res.status(200).json(variation);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createVariation = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const variationInfo = req.body;
        const newVariation = await Service.createVariation(variationInfo);
        res.status(200).json(newVariation);

    }catch(err){
        console.error("Error adding variation", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateVariation = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pvid = req.params.pvid;
        const variationInfo = req.body;   
        const updatedvariation = await Service.updateVariation(pvid, variationInfo);
        if(!updatedvariation){
            return res.status(404).json({message: 'variation not found'});
        }
        res.status(200).json(updatedvariation);

    }catch(err){
        
        console.error("Error updating variation: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deleteVariation = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pvid = req.params.pvid;
        const variationInfo = req.body;   
        const deleted = await Service.deleteVariation(pvid);
        if (!deleted){
            return res.status(404).json({message : 'shop not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const getVariationProduct = async (req, res) => {
  try {
    const productkey = req.params.q; // Extract consumerid from the route parameter
    const Variation = await Service.getVariationProduct(productkey);
    if (!Variation) {
      return res.status(404).json({ message: "Variation not found" });
    }
    res.status(200).json(Variation);
  } catch (err) {
    console.error("Error fetching Variation:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

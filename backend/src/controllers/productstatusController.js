import * as Service from "../services/productstatusServices.js"

export const getPstatus = async (req, res) =>{
    try{
        const pstatus = await Service.getPstatus();
        res.status(200).json(pstatus);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const createPstatus = async (req, res) => {
  try {
    const orderData = req.body; // Array of orders
    const results = await Promise.all(
      orderData.map((data) => Service.createPstatus(data))
    );
    res.status(201).json(results);
  } catch (err) {
    console.error("Error creating product status:", err.message);
    res.status(500).json({ error: "Failed to create product status" });
  }
};


export const updatePstatus = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pstatusid = req.params.pstatusid;
        const pstatusInfo = req.body;   
        const updatedPstatusinfo = await Service.updatePstatus(pstatusid, pstatusInfo);
        if(!updatedPstatusinfo){
            return res.status(404).json({message: 'cart not found'});
        }
        res.status(200).json(updatedPstatusinfo);

    }catch(err){
        
        console.error("Error updating cart: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deletePstatus = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pstatusid = req.params.pstatusid;
        const pstatusInfo = req.body;   
        const deleted = await Service.deletePstatus(pstatusid);
        if (!deleted){
            return res.status(404).json({message : 'shop not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const cancelOrder = async (req, res) => {
  try {
    const { pstatusid } = req.params;

    const updatedPstatus = await Service.updatePstatusToCancelled(pstatusid);
    if (!updatedPstatus) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedPstatus);
  } catch (err) {
    console.error("Error cancelling order:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const payOrder = async (req, res) => {
  try {
    const { pstatusid } = req.params;

    const updatedPstatus = await Service.updatePstatusToPaid(pstatusid);
    if (!updatedPstatus) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedPstatus);
  } catch (err) {
    console.error("Error updating order to paid:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
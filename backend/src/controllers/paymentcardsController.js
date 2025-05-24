import * as Service from "../services/paymentcardsServices.js"

export const getCards = async (req, res) =>{
    try{
        const cards = await Service.getCards();
        res.status(200).json(cards);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createCards = async (req, res) => {
  try {
    console.log("REQ BODY (Card):", req.body); // Debugging log
    const cardInfo = req.body;
    const newCard = await Service.createCards(cardInfo);
    res.status(200).json(newCard);
  } catch (err) {
    console.error("Error adding card:", err); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCards = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const paymentid = req.params.paymentid;
        const cardInfo = req.body;   
        const updatedCards = await Service.updateCards(paymentid, cardInfo)
        if(!updatedCards){
            return res.status(404).json({message: 'card not found'});
        }
        res.status(200).json(updatedCards);

    }catch(err){
        
        console.error("Error updating card: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deleteCards = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const paymentid = req.params.paymentid;
        const cardInfo = req.body;   
        const deleted = await Service.deleteCards(paymentid);
        if (!deleted){
            return res.status(404).json({message : 'card not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting card: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const getUserCard = async (req, res) => {
  try {
    const userid = req.params.q;
    const userCard = await Service.getUserCard(userid);
    if (!userCard) {
      return res.status(404).json({ message: "Cards not found" });
    }
    res.status(200).json(userCard);
  } catch (err) {
    console.error("Error fetching user cards:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
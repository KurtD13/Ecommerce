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
  try {
    const consumerid = req.params.consumerid;
    const userInfo = req.body;
    const updatedUser = await Service.updateUser(consumerid, userInfo);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user: ", err);
    res.status(500).json({ message: "Internal Server Error" });
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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Service.validateUser(email, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json(user); // Return the consumerid
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getUserPhone = async (req, res) => {
  try {
    const consumerid = req.params.q; // Extract consumerid from the route parameter
    const userPhone = await Service.getUserPhone(consumerid);
    if (!userPhone) {
      return res.status(404).json({ message: "Phone number not found" });
    }
    res.status(200).json(userPhone);
  } catch (err) {
    console.error("Error fetching user phone:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getuserSellerstatus = async (req, res) => {
  try {
    const consumerid = req.params.q; // Extract consumerid from the route parameter
    const userSellerstatus = await Service.getuserSellerstatus(consumerid);
    if (!userSellerstatus) {
      return res.status(404).json({ message: "Sellerstatus not found" });
    }
    res.status(200).json(userSellerstatus);
  } catch (err) {
    console.error("Error fetching Sellerstatus:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
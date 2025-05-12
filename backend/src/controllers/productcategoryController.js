import * as Service from "../services/productcategoryServices.js"

export const getCategory = async (req, res) =>{
    try{
        const category = await Service.getCategory();
        res.status(200).json(category);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createCategory = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const categoryInfo = req.body;
        const newCategory = await Service.createCategory(categoryInfo);
        res.status(200).json(newCategory);

    }catch(err){
        console.error("Error adding Category", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateCategory = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const categoryid = req.params.categoryid;
        const categoryInfo = req.body;   
        const updatedcategory = await Service.updateCategory(categoryid, categoryInfo)
        if(!updatedcategory){
            return res.status(404).json({message: 'category not found'});
        }
        res.status(200).json(updatedcategory);

    }catch(err){
        
        console.error("Error updating category: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deleteCategory = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const categoryid = req.params.categoryid;
        const categoryInfo = req.body;   
        const deleted = await Service.deleteCategory(categoryid);
        if (!deleted){
            return res.status(404).json({message : 'shop not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting shop: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
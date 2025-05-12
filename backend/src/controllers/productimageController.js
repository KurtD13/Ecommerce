import * as Service from "../services/productimageServices.js"

export const getImage = async (req, res) =>{
    try{
        const image = await Service.getImage();
        res.status(200).json(image);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createImage = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const imageInfo = req.body;
        const newImage = await Service.createImage(imageInfo);
        res.status(200).json(newImage);

    }catch(err){
        console.error("Error adding image", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};


export const updateImage = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pimageid = req.params.pimageid;
        const imageInfo = req.body;   
        const updatedImage = await Service.updateImage(pimageid, imageInfo);
        if(!updatedImage){
            return res.status(404).json({message: 'image not found'});
        }
        res.status(200).json(updatedImage);

    }catch(err){
        
        console.error("Error updating image: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deleteImage = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const pimageid = req.params.pimageid;
        const imageInfo = req.body;   
        const deleted = await Service.deleteImage(pimageid);
        if (!deleted){
            return res.status(404).json({message : 'image not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting image: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
import * as Service from "../services/productreviewsServices.js"

export const getReviews = async (req, res) =>{
    try{
        const reviews = await Service.getReviews();
        res.status(200).json(reviews);

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const createReviews = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const reviewsInfo = req.body;
        const newReviews = await Service.createReviews(reviewsInfo);
        res.status(200).json(newReviews);

    }catch(err){
        console.error("Error adding reviews", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const updateReviews = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const previewsid = req.params.previewsid;
        const reviewsInfo = req.body;   
        const updatedreviews = await Service.updateReviews(previewsid, reviewsInfo)
        if(!updatedreviews){
            return res.status(404).json({message: 'reviews not found'});
        }
        res.status(200).json(updatedreviews);

    }catch(err){
        
        console.error("Error updating reviews: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export const deleteReviews = async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const previewsid = req.params.previewsid;
        const reviewsInfo = req.body;   
        const deleted = await Service.deleteReviews(previewsid);
        if (!deleted){
            return res.status(404).json({message : 'reviews not found'})
        }
        res.status(200).send();

    }catch(err){
        
        console.error("Error deleting reviews: ", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

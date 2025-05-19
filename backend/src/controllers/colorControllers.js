import * as Service from "../services/colorServices.js";

export const getColor = async (req, res) => {
    try {
        const colors = await Service.getColor();
        res.status(200).json(colors);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createColor = async (req, res) => {
    try {
        const colorInfo = req.body;
        const newColor = await Service.createColor(colorInfo);
        res.status(201).json(newColor);
    } catch (err) {
        console.error("Error adding color:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateColor = async (req, res) => {
    try {
        const colorid = req.params.colorid;
        const colorInfo = req.body;
        const updatedColor = await Service.updateColor(colorid, colorInfo);
        if (!updatedColor) {
            return res.status(404).json({ message: 'Color not found' });
        }
        res.status(200).json(updatedColor);
    } catch (err) {
        console.error("Error updating color:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteColor = async (req, res) => {
    try {
        const colorid = req.params.colorid;
        const deleted = await Service.deleteColor(colorid);
        if (!deleted) {
            return res.status(404).json({ message: 'Color not found' });
        }
        res.status(200).send();
    } catch (err) {
        console.error("Error deleting color:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

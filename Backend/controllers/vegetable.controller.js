import { Vegetable } from "../models/vegetable.model.js";
import DataUriParser from "datauri/parser.js";
import path from "path";
import cloudinary from "../utils/cloudinary.js";

export const postVegetable = async (req, res) => {
    try {
        const { name, description, price, category, weight, stock } = req.body;
        const file = req.file; 

        // 1. LOG THE DATA: This helps us see exactly what arrived in the terminal
        console.log("Data received:", { name, price, weight, stock, hasFile: !!file });

        if (!name || !description || !price || !category || !weight || !stock || !file) {
            return res.status(400).json({
                message: "All fields including an image are required.",
                success: false
            });
        }

        const parser = new DataUriParser();
        const extName = path.extname(file.originalname).toString();
        const file64 = parser.format(extName, file.buffer);

        const cloudResponse = await cloudinary.uploader.upload(file64.content);

        const vegetable = await Vegetable.create({
            name,
            description,
            price: Number(price),
            category,
            weight,
            stock: Number(stock),
            image: cloudResponse.secure_url,
            // If req.id is missing, we use a fallback or make it optional for testing
            created_by: req.id || null 
        });

        return res.status(201).json({
            message: "Vegetable added successfully!",
            vegetable,
            success: true
        });
    } catch (error) {
        console.log("Backend Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
export const getAllVegetables = async (req, res) => {
    try {
        const vegetables = await Vegetable.find().populate({
            path: "created_by"
        }).sort({ createdAt: -1 });
        
        return res.status(200).json({
            vegetables,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getVegetableById = async (req, res) => {
    try {
        const vegetableId = req.params.id;
        const vegetable = await Vegetable.findById(vegetableId).populate({
            path: "created_by"
        });
        if (!vegetable) {
            return res.status(404).json({
                message: "Vegetable not found.",
                success: false
            })
        };
        return res.status(200).json({ vegetable, success: true });
    } catch (error) {
        console.log(error);
    }
}


export const searchVegetable = async (req, res) => {
    try {
        const query = req.query.keyword || "";
        const queryReports = {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } }
            ]
        };
        const vegetables = await Vegetable.find(queryReports);
        if (!vegetables) {
            return res.status(404).json({
                message: "No vegetables found.",
                success: false
            })
        };
        return res.status(200).json({
            vegetables,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteVegetable = async (req, res) => {
    try {
        const vegetableId = req.params.id;
        const vegetable = await Vegetable.findByIdAndDelete(vegetableId);
        
        if (!vegetable) {
            return res.status(404).json({
                message: "Product not found.",
                success: false
            });
        }
        
        return res.status(200).json({
            message: "Product deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

export const updateVegetable = async (req, res) => {
    try {
        const vegetableId = req.params.id;
        const updates = req.body;

        const vegetable = await Vegetable.findByIdAndUpdate(vegetableId, updates, { new: true });

        if (!vegetable) {
            return res.status(404).json({
                message: "Product not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product updated successfully.",
            success: true,
            vegetable
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
import mongoose from "mongoose";

const vegetableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String, 
        // UPDATED: Matches the values sent from your AddProduct.jsx form
        enum: ['chopped-veg', 'gourmet-gravy', 'peeled-fruit', 'kitchen-staple'],
        required: true
    },
    weight: {
        type: String, // e.g., "kg", "g", "pcs"
        required: true
    },
    image: {
        type: String, // Cloudinary URL
        default: ""
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Vegetable = mongoose.model('Vegetable', vegetableSchema);
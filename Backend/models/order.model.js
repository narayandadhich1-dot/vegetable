import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            vegetable: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vegetable',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
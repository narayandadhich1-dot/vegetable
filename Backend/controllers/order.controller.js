import { Order } from "../models/order.model.js";
import { Vegetable } from "../models/vegetable.model.js";

// 1. Create a new order (Server-side price calculation)
export const createOrder = async (req, res) => {
    try {
        const userId = req.id;
        const { items, address } = req.body;

        if (!items || items.length === 0 || !address) {
            return res.status(400).json({
                message: "Cart is empty or address missing.",
                success: false
            });
        }

        let totalAmount = 0;

        // Verify prices and calculate total on the server for security
        for (const item of items) {
            const vegetable = await Vegetable.findById(item.vegetable);
            if (!vegetable) {
                return res.status(404).json({ message: `Vegetable not found`, success: false });
            }
            totalAmount += vegetable.price * item.quantity;
        }

        const order = await Order.create({
            user: userId,
            items,
            totalAmount,
            address
        });

        return res.status(201).json({
            message: "Order placed successfully.",
            order,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// 2. Get My Orders (Customer History View)
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.id; 
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'items.vegetable',
                model: 'Vegetable'
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            orders,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// 3. Update Order Status (Admin Action)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;

        if (!status) {
            return res.status(400).json({ message: "Status is required", success: false });
        }

        const order = await Order.findByIdAndUpdate(
            orderId, 
            { status }, 
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }

        return res.status(200).json({
            message: "Order status updated successfully.",
            order,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// 4. Get All Orders (Admin Dashboard View)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'fullname email') // Populate customer details
            .populate('items.vegetable')         // Populate vegetable details
            .sort({ createdAt: -1 });

        return res.status(200).json({
            orders,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
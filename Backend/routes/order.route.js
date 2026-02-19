import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import { 
    createOrder, 
    getMyOrders, 
    updateOrderStatus, 
    getAllOrders 
} from "../controllers/order.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createOrder);

router.route("/myorders").get(isAuthenticated, getMyOrders);

router.route("/admin/status/:id").put(isAuthenticated, isAdmin, updateOrderStatus);

router.route("/all").get(isAuthenticated, isAdmin, getAllOrders);

export default router;
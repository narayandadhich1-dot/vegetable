import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAllVegetables, postVegetable, deleteVegetable, updateVegetable } from "../controllers/vegetable.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();
router.route("/add").post(isAuthenticated, isAdmin, singleUpload, postVegetable);
router.route("/get").get(getAllVegetables);
router.route("/delete/:id").delete(isAuthenticated, isAdmin, deleteVegetable);
router.route("/update/:id").put(isAuthenticated, isAdmin, updateVegetable);

export default router;
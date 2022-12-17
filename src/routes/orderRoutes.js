import { Router } from "express";
import { orderController } from "../controllers/orderController.js";

const router = Router();



router.get("/", orderController.getOrders);

//creates an empty cart and returns id
router.post("/", orderController.createCart);

//get all orders
router.get("/all", orderController.getAllOrders);

export default router;
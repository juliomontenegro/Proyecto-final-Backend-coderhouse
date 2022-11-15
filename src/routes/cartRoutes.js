import { Router } from "express";
import { cartController } from "../controllers/cartController.js";

const router = Router();

router.get("/", cartController.getCart);

//creates an empty cart and returns id
router.post("/", cartController.addCart);

//empties a cart and removes by id
router.delete("/:id", cartController.deleteCart);

//get all products from a cart by id
router.get("/:id/productos", cartController.getCartProducts);

// add a product to the cart
router.post("/:id/productos", cartController.addProductCart);

// delete a product from the cart by id and product id
router.delete("/:id/productos/:id_Prod", cartController.delProductCart);

// get a cart by id
router.get("/:id", cartController.getCartById);

export default router;

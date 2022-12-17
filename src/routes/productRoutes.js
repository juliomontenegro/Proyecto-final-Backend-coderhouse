import { Router } from "express";
import { productController } from "../controllers/productController.js";


const router = Router();


// middleware admin


const autAdmin = (req, res, next) => {

  if(req.session.user.role ==="admin"){ next()}

};

router.get("/", productController.getProducts);

//save a product
router.post("/", autAdmin, productController.saveProduct);

//get a product by id
router.get("/:id", productController.getProductById);

//update a product by id
router.put("/:id", autAdmin, productController.updateProduct);

//delete a product by id
router.delete("/:id", autAdmin, productController.deleteProduct);

export default router;

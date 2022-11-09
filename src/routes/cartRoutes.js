import { Router } from "express";
import{cartDao}from'../DAO/index.js';
import { debugLogger } from "../utils.js";

const router = Router();
let api=cartDao


router.get("/", async (req, res) => {
  const cart = await api.getAll();
  res.send(cart);
});

//creates an empty cart and returns id
router.post("/", async (req, res) => {
  const cart = {
    productos: [],
  };
  await api.add(cart);
  debugLogger.info("Cart created");
  const idCart = cart.id;
  req.session.user.idCart = idCart;
  res.json(idCart);
});

//empties a cart and removes by id
router.delete("/:id", async (req, res) => {
  await api.delete(parseInt(req.params.id));
  debugLogger.info("Cart deleted");
  res.json(api.getAll());
});

//get all products from a cart by id
router.get("/:id/productos", async (req, res) => {
  res.json(await api.getById(parseInt(req.params.id)).productos);
});

// add a product to the cart
router.post("/:id/productos", async (req, res) => {
  const idCart = parseInt(req.params.id);
  const idProduct = parseInt(req.body.idProducto);
  await api.updateCart(idCart, idProduct);
  debugLogger.info("Product added to cart");
  res.json(await api.getById(idCart));
});

// delete a product from the cart by id and product id
router.delete("/:id/productos/:id_Prod", async (req, res) => {
  await api.deleteProductCart(
    parseInt(req.params.id),
    parseInt(req.params.id_Prod)
  );
  debugLogger.info("Product deleted from cart");
  res.json(await api.getAll());
});

// get a cart by id
router.get("/:id", async (req, res) => {
  res.json(await api.getById(parseInt(req.params.id)));
});

export default router;

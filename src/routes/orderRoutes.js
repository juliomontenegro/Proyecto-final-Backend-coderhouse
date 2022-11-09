import { Router } from "express";
import{orderDao}from'../DAO/index.js';
import { debugLogger } from "../utils.js";

const router = Router();
let api=orderDao


router.get("/", async (req, res) => {
    
    let id=req.session.user.email

    res.json(await api.getById(id));
});

//creates an empty cart and returns id
router.post("/", async (req, res) => {
    
  const order = {
    user: req.session.user.email,
    productos: [],
  };
  await api.add(order);
  
  const idOrder = parseInt(order.id);
  let products=req.body.productos
    products[0].forEach(async (element) => {
        await api.updateCart(idOrder,[element.id])
    });
  debugLogger.info("Order created");

  res.send({ message: "order created" });
});

export default router;
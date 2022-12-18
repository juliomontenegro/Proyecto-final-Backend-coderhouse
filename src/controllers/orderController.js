import { debugLogger } from "../utils.js";
import { orderDao } from "../DAO/index.js";

let api = orderDao;

export const orderController = {
  getOrders: async (req, res) => {
    try {
      
      if (!req.params.id) {
        return res.status(400).json({
          error: "Missing ID parameter in request",
        });
      }
      
      let id = req.session.user.email;
      
      res.status(200).json(await api.getById(id));
    } catch (error) {
      debugLogger.error("Error in orderController getOrders method:", error);
      res.status(500).json({
        error: "An error occurred while trying to get the orders"
      });
    }
  },
  createCart: async (req, res) => {
    try {
      
      if (!req.body.productos) {
        return res.status(400).json({
            error: "Missing productos parameter in request",
        });
      }
      
      const order = {
        user: req.session.user.email,
        productos: [],
      };
      
      await api.add(order);
      debugLogger.info("Order created");
      const idOrder = parseInt(order.id);
      
      let products = req.body.productos;
      products[0].forEach(async (element) => {
        await api.updateCart(idOrder, [element.id]);
      });
      
      
      res.status(201).json({
        message: "Order created",
      });
    } catch (error) {
      debugLogger.error("Error in orderController createCart method:", error);
      res.status(500).json({
        error: "An error occurred while trying to create the order"
      });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const email=req.session.user.email;
    const orders = await api.getAll({email:email});
   
    res.status(200).json(orders);
    } catch (error) {
      debugLogger.error("Error in orderController getAllOrders method:", error);
      res.status(500).json({
        error: "An error occurred while trying to get the orders"
      });
    }
  },
};



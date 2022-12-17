import { debugLogger } from "../utils.js";
import {cartDao} from '../DAO/index.js';

let api = cartDao;

export const cartController = {
  getCart: async (req, res) => {
    try {
      
      if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).json({
          error: "Missing or invalid ID parameter in request",
        });
      }
  
      
      let cart = await api.getCart(req.params.id);
  
      
      if (!cart) {
        return res.status(404).json({
          error: "Cart not found",
        });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      debugLogger.error("Error in cartController getCart method: ", error);
      res.status(500).json({
        error:"An error occurred while trying to get the cart"
      });
    }
  },
  
  addCart: async (req, res) => {
    try {
      const cart = {
        productos: [],
      };
      
      await api.add(cart);
      debugLogger.info("Cart created");
      const idCart = cart.id;
      req.session.user.idCart = idCart;
      
      
      res.status(201).json(idCart);
    } catch (error) {
      debugLogger.error("Error in cartController addCart method: ", error);
      res.status(500).json({
        error: "An error occurred while trying to create the cart"
      });
    }
  },
  deleteCart: async (req, res) => {
    try {
      
      if (!req.params.id) {
        return res.status(400).json({
          error: "Missing ID parameter in request",
        });
      }
      
      await api.delete(parseInt(req.params.id));
      debugLogger.info("Cart deleted");
      res.status(200).json(api.getAll());
    } catch (error) {
      debugLogger.error("Error in cartController deleteCart method: ", error);
      res.status(500).json({
        error:"An error occurred while trying to delete the cart"
      });
    }
  },
  getCartProducts: async (req, res) => {
    try {
      
      if (!req.params.id) {
        return res.status(400).json({
          error: "Missing ID parameter in request",
        });
      }
      
      res.status(200).json(await api.getById(parseInt(req.params.id)).productos);
    } catch (error) {
      debugLogger.error("Error in cartController getCartProducts method: ", error);
      res.status(500).json({
        error:"An error occurred while trying to get the cart products"
      });
    }
  },
  addProductCart: async (req, res) => {
    try {
      
      if (!req.params.id || !req.body.idProducto) {
        return res.status(400).json({
          error: "Missing ID parameters in request",
        });
      }
      
      const idCart = parseInt(req.params.id);
      const idProduct = parseInt(req.body.idProducto);
      
      await api.updateCart(idCart, idProduct);
      debugLogger.info("Product added to cart");
      
      
      res.status(200).json(await api.getById(idCart));
    } catch (error) {
      debugLogger.error("Error in cartController addProductCart method: ", error);
      res.status(500).json({
        error:"An error occurred while trying to add the product to the cart"
      });
    }
  },
  delProductCart: async (req, res) => {
    try {
      // Validar que se recibieron los parámetros necesarios en la solicitud
      if (!req.params.id || !req.params.id_Prod) {
        return res.status(400).json({
          error: "Missing ID parameters in request",
        });
      }
      
      await api.deleteProductCart(
        parseInt(req.params.id),
        parseInt(req.params.id_Prod)
      );
      
      debugLogger.info("Product deleted from cart");
      res.status(200).json(await api.getAll());
    } catch (error) {
      debugLogger.error("Error in cartController delProductCart method: ", error);
      res.status(500).json({
        error:"An error occurred while trying to delete the product from the cart"
      });
    }
  },
  getCartById: async (req, res) => {
    try {
      // Validar que se recibió un ID válido en la solicitud
      if (!req.params.id) {
        return res.status(400).json({
          error: "Missing ID parameter in request",
        });
      }
      
      // Parsear el ID del carrito a un número
      const idCart = parseInt(req.params.id);
        
      // Usar el ID parseado en lugar del valor original
      const cart = await api.getById(idCart);
      
      // Si el carrito no existe, devolver un código de estado 404
      if (!cart) {
        return res.status(404).json({
          error: "Cart not found",
        });
      }
      
      res.status(200).json(cart);
    } catch (error) {
      // Capturar y analizar el error
      debugLogger.error("Error in cartController getCartById method:", error);
      res.status(500).json({
        error: "An error occurred while trying to get the cart",
      });
    }
  },
  
};








import { debugLogger } from "../utils.js";
import {cartDao}from'../DAO/index.js';

let api=cartDao

export const cartController={
    getCart:async(req,res)=>{
        try{
            let cart=await api.getCart(req.params.id)
            res.json(cart)
        }catch(e){
            debugLogger(e)
        }
    },
    addCart:async(req,res)=>{
        try{
            const cart = {
                productos: [],
              };
              await api.add(cart);
              debugLogger.info("Cart created");
              const idCart = cart.id;
              req.session.user.idCart = idCart;
              res.json(idCart);
        }catch(e){
            debugLogger(e)
        }
    },
    deleteCart:async(req,res)=>{
        try{
            await api.delete(parseInt(req.params.id));
            debugLogger.info("Cart deleted");
            res.json(api.getAll());
        }catch(e){
            debugLogger(e)
        }
    },
    getCartProducts:async(req,res)=>{
        try{
            res.json(await api.getById(parseInt(req.params.id)).productos);
        }catch(e){
            debugLogger(e)
        }
    },
    addProductCart:async(req,res)=>{
        try{
            const idCart = parseInt(req.params.id);
            const idProduct = parseInt(req.body.idProducto);
            await api.updateCart(idCart, idProduct);
            debugLogger.info("Product added to cart");
            res.json(await api.getById(idCart));
        }catch(e){
            debugLogger(e)
        }
    },
    delProductCart:async(req,res)=>{
        try{
            await api.deleteProductCart(
                parseInt(req.params.id),
                parseInt(req.params.id_Prod)
              );
              debugLogger.info("Product deleted from cart");
              res.json(await api.getAll());
        }catch(e){
            debugLogger(e)
        }
    },
    getCartById:async(req,res)=>{
        try{
            res.json(await api.getById(parseInt(req.params.id)));
        }catch(e){
            debugLogger(e)
        }
    }

}



import{orderDao}from'../DAO/index.js';
import { debugLogger } from "../utils.js";

let api=orderDao

export const orderController={
    getOrders:async(req,res)=>{ 
        try{
            let id=req.session.user.email

            res.json(await api.getById(id));
        }catch(e){
            debugLogger(e)
        }
    },
    createCart:async(req,res)=>{
        try{
            const order = {
                user: req.session.user.email,
                productos: [],
              };
              await api.add(order);
              debugLogger.info("Order created");
              const idOrder = parseInt(order.id);
              let products=req.body.productos
                products[0].forEach(async (element) => {
                    await api.updateCart(idOrder,[element.id])
                });
              res.send({ message: "order created" });
        }catch(e){
            debugLogger(e)
        }
    }
}


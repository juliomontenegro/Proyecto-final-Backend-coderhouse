import mongoose from "mongoose";
import { productModels } from "./productModels.js";

const{Schema, model}=mongoose;

const cartCollection = "carrito";

const cartSchema = new Schema({
    id: {type:Number,required:true},
    productos: { type: [productModels.schema], required: true },
    timestamp: { type: Date }
});


const cartModel = model(cartCollection, cartSchema);

export {cartModel,cartSchema};


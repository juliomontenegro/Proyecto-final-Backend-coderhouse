import mongoose from "mongoose";
import { productModels } from "./productModels.js";

const{Schema, model}=mongoose;

const orderCollection = "ordenes";

const orderSchema = new Schema({
  id: { type: Number, required: true },
  user: { type: String, required: true },
  productos: { type: [productModels.schema], required: true },
  timestamp: { type: Date },
});


const orderModel = model(orderCollection, orderSchema);

export {orderModel,orderSchema};
import mongoose from "mongoose";
import { productoModelo } from "../productoModels/index.js";

const{Schema, model}=mongoose;

const carritoColeccion = "carrito";

const carritoSchema = new Schema({
    id: {type:Number,required:true},
    productos: { type: [productoModelo.schema], required: true },
    timestamp: { type: Date },
});


const carritoModelo = model(carritoColeccion, carritoSchema);

export {carritoModelo,carritoSchema};
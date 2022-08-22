import mongoose from "mongoose";
const {Schema,model}=mongoose;

const productosColeccion="productos";

const productoSchema=new Schema({
    id: {type:Number,required:true},
    nombre:{type:String,required:true,maxlength:100},
    descripcion:{type:String,required:true,maxlength:100},
    codigo:{type:Number,required:true},
    foto:{type:String,required:true,maxlenght:100},
    precio:{type:Number,required:true},
    stock:{type:Number,required:true},
    timestamp:{type:Date}

})


const productoModelo = model(productosColeccion,productoSchema);

// module.exports={productoModelo,productoSchema};
export{productoModelo,productoSchema};
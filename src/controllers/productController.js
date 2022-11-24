import { productDao } from "../DAO/index.js";
import { debugLogger } from "../utils.js";
import productDto from "../DTO/productDto.js";


let api=productDao

export const productController={
    getProducts:async(req,res)=>{ 
        try{
            const productget=await api.getAll()
            const product = productget.map((product) => {
                return new productDto(product);
              }
              );
             console.log(product);
            res.json(product);
        }catch(e){
            debugLogger(e)
        }
    },
    saveProduct:async(req,res)=>{
        try{
            const product = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                foto: req.body.foto,
                precio: req.body.precio,
                stock: req.body.stock,
              };
              await api.add(product);
              debugLogger.info("Product created");
              res.json(api.getAll());
        }catch(e){
            debugLogger(e)
        }
    },
    getProductById:async(req,res)=>{
        try{
            res.json(await api.getById(parseInt(req.params.id)));
        }catch(e){
            debugLogger(e)
        }
    },
    updateProduct:async(req,res)=>{
        try{
            const product = {
                nombre: req.body.nombreUpdate,
                descripcion: req.body.descripcionUpdate,
                codigo: req.body.codigoUpdate,
                foto: req.body.fotoUpdate,
                precio: req.body.precioUpdate,
                stock: req.body.stockUpdate,
              };
              await api.update(parseInt(req.params.id), product);
              debugLogger.info("Product updated");
              res.json(product);
        }catch(e){
            debugLogger(e)
        }
    },
    deleteProduct:async(req,res)=>{
        try{
            await api.delete(parseInt(req.params.id));
            debugLogger.info("Product deleted");
            res.json(api.getAll());
        }catch(e){
            debugLogger(e)
        }
    }   
}
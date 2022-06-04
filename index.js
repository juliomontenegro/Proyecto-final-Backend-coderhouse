const Contenedor =require('./contenedor');

const express = require('express');
const app = express();


const contenedorProductos= new Contenedor('./productos.txt');

const PORT=8080;


app.listen(PORT, () => {console.log(`Servidor corriendo en el puerto ${PORT}`)});

app.get('/productos', async (req,res) => {
   try{
      const productos = await contenedorProductos.getAll();
      res.json(productos);

   }catch (err){ 
    
      res.json(err);

   }});

app.get('/productoRandom', async (req,res) => {
   try{
      const productos = await contenedorProductos.getAll();
      const producto = productos[Math.floor(Math.random() * productos.length)];
      res.json(producto);

   }catch (err){
      res.json(err);
   }});

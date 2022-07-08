const API =require('./api');
const express = require('express');
const {Router} = express;
const router = Router();
const app = express();
const path = require('path');
const handlebars =require('express-handlebars');

const fs = require('fs');
const pathchat=(path.join(__dirname,'../public/chat-data/messages.json'));


const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


let api= new API();

const PORT=8080;

// app.listen(PORT, () => {console.log(`Servidor corriendo en el puerto ${PORT}`)});
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', './public')))
app.use('/productos', router);





app.engine(
      "hbs", handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
      })
    );

app.set('view engine', 'hbs');
app.set('views', '../views');



app.get('/', (req, res) => {
   res.render("productos");
   });




   router.get("/", (req, res) => {
      const response = api.getAll();
    
      if (!response) res.send({ error: productNotFound });
    
      res.render("productos", { productos: response });
    });
    
    router.post("/", (req, res) => {
      const { title, price, thumbnail } = req.body;
    
      api.add({ title, price, thumbnail });
    
      res.redirect("/");
    });

// socket.io
const mensajesArray = [];

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

   socket.emit("productosServ", api.productos);


  socket.on("add-product", (data) => {
    api.add(data);
    io.sockets.emit("productosServ", api.productos);
  });
  

  socket.on('mensaje', message => {

  mensajesArray.push(message)
 
fs.writeFileSync(pathchat,JSON.stringify(mensajesArray,null,2)+"\n");
 

io.sockets.emit("nuevoMsj",mensajesArray);
});

if(mensajesArray.length>0){
  fs.readFile(pathchat,(err,data)=>{
    if(err) throw err;
    let mensajes = JSON.parse(data);
    io.sockets.emit("nuevoMsj",mensajes);
    });

}

});
  


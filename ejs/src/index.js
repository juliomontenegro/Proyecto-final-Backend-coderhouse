const API =require('./api');
const express = require('express');
const {Router} = express;
const router = Router();
const app = express();


let api= new API();

const PORT=8080;

app.listen(PORT, () => {console.log(`Servidor corriendo en el puerto ${PORT}`)});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', router);



app.set('view engine', 'ejs');
app.set('views', '../views');



app.get('/', (req, res) => {
   res.render("home");
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
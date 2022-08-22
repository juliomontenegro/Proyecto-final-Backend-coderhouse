import express from 'express';
import {Router} from'express';
// import {contenedorArchivo} from './Api/ContenedorArchivo.js';
import{productoDao,carritoDao}from'./daos/index.js';

const router = Router();
const routerCarrito=Router();




const app = express();

//configuracion de path
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', './public')))

//Rutas
app.use('/api/productos', router);
app.use('/api/carrito', routerCarrito);

 
// let api= new contenedorArchivo('productos'); 
// let apicarrito= new contenedorArchivo('carrito');
let api=productoDao;  
let apicarrito=carritoDao;






const PORT=8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});

// middleware para administrador
const ADMIN = true;

const autAdmin = (req, res, next) => {
  if (!ADMIN) res.send({ error: "Usuario no autorizado" });

  next();
};




// ////////////////////////////////
// Rutas de ingreso de productos//
/////////////////////////////////

router.get("/", async (req, res) => {
  const productos = await api.getAll();
  res.json(productos);
});



// guarda un producto
router.post("/",autAdmin, async (req, res) => {
  const producto ={
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    codigo: req.body.codigo,
    foto: req.body.foto,
    precio: req.body.precio,
    stock: req.body.stock,};
  await api.add(producto);
  console.log(producto);
  res.json(api.getAll());

  });

// devuelve un producto segun su id 
router.get('/:id', async (req, res) => {
  res.json(await api.getById(parseInt(req.params.id)));
  });


// actualiza un producto segun su id
router.put('/:id',autAdmin, async (req, res) => {
  const producto ={
    nombre: req.body.nombreUpdate,
    descripcion: req.body.descripcionUpdate,
    codigo: req.body.codigoUpdate,
    foto: req.body.fotoUpdate,
    precio: req.body.precioUpdate,
    stock: req.body.stockUpdate,
  };
  await api.update(parseInt(req.params.id), producto);
  res.json(producto);
});

//elimina un producto segun su id.
router.delete('/:id',autAdmin, async (req, res) => {
  await api.delete(parseInt(req.params.id));
  res.json(api.getAll());
});

////////////////////////////////
// Rutas de ingreso de carrito// 
///////////////////////////////


routerCarrito.get("/", async (req, res) => {
  const carrito = await apicarrito.getAll();
  res.send(carrito);
});


// crea un carrito vacio y devuelve su id
routerCarrito.post('/', async (req, res) => {
  const carrito ={
    productos: [],
    };
  await apicarrito.add(carrito);
  const idCarrito=carrito.id;
  res.json(idCarrito);
});

//vacia un carrito y lo elimina con un boton por su id
routerCarrito.delete('/:id', async (req, res) => {
  await apicarrito.delete(parseInt(req.params.id));
  res.json(apicarrito.getAll());
});


//me permite listar todos los productos guardados en el carrito
routerCarrito.get('/:id/productos', async (req, res) => {
  res.json(await apicarrito.getById(parseInt(req.params.id)).productos);
});





// recibir la id del producto por params y agregarlo al carrito.
routerCarrito.post('/:id/productos', async (req, res) => {
  const idcarrito=parseInt(req.params.id);
  const idproducto=parseInt(req.body.idProducto);
  const producto=await api.getById(idproducto);
  await apicarrito.updatecarrito(idcarrito,producto);
  res.json(await apicarrito.getById(idcarrito)); 
});



// eliminar un producto del carrito por su id de producto y su id de carrito
routerCarrito.delete('/:id/productos/:id_Prod', async (req, res) => {
  await apicarrito.deleteProductocarrito(parseInt(req.params.id), parseInt(req.params.id_Prod));
  res.json(await apicarrito.getAll());
});


// devuelve un carrito segun su id
routerCarrito.get('/:id', async (req, res) => {
  res.json(await apicarrito.getById(parseInt(req.params.id)));
});
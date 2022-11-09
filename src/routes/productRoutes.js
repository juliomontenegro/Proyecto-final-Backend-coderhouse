import { Router } from "express";
import { productDao } from "../DAO/index.js";
import { debugLogger } from "../utils.js";

const router = Router();
let api = productDao;


// middleware admin
const ADMIN = true;

const autAdmin = (req, res, next) => {
  if (!ADMIN) res.send({ error: "unauthorized user" });

  next();
};

router.get("/", async (req, res) => {
  const product = await api.getAll();
  res.json(product);
});

//save a product
router.post("/", autAdmin, async (req, res) => {
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
});

//get a product by id
router.get("/:id", async (req, res) => {
  res.json(await api.getById(parseInt(req.params.id)));
});

//update a product by id
router.put("/:id", autAdmin, async (req, res) => {
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
});

//delete a product by id
router.delete("/:id", autAdmin, async (req, res) => {
  await api.delete(parseInt(req.params.id));
  debugLogger.info("Product deleted");
  res.json(api.getAll());
});

export default router;

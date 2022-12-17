import { productDao } from "../DAO/index.js";
import { debugLogger } from "../utils.js";
import productDto from "../DTO/productDto.js";

let api = productDao;

export const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await api.getAll();

      if (products.length === 0) {
        return res.status(404).json({
          error: "No products found",
        });
      }

      const mappedProducts = products.map((product) => {
        return new productDto(product);
      });

      res.status(200).json(mappedProducts);
    } catch (error) {
      debugLogger.error("Error in productController getProducts method: ",error);
        res.status(500).json({
            error:"An error ocurred while trying to get the products"
        })
    }
  },
  saveProduct: async (req, res) => {
    try {
     
      if (
        !req.body.nombre ||
        !req.body.descripcion ||
        !req.body.codigo ||
        !req.body.foto ||
        !req.body.precio ||
        !req.body.stock
      ) {
        return res.status(400).json({
          error: "Missing required parameters in request body",
        });
      }

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

      
      res.status(201).json(product);
    } catch (error) {
      debugLogger.error("Error in productController saveProduct method: ", error);
      res.status(500).json({
        error:"An error ocurred while trying to save the product"
    })
    }
  },
  getProductById: async (req, res) => {
    try {
      
      if (!req.params.id) {
        return res.status(400).json({
          error: "Missing ID parameter in request",
        });
      }

      const product = await api.getById(parseInt(req.params.id));

      
      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      res.status(200).json(product);
    } catch (error) {
      debugLogger.error("Error in productController getProductById method: ",error);
      error: "An error ocurred while trying to get the product by id"
    }
  },
  updateProduct: async (req, res) => {
    try {
      
      if (
        !req.params.id ||
        !req.body.nombreUpdate ||
        !req.body.descripcionUpdate ||
        !req.body.codigoUpdate ||
        !req.body.fotoUpdate ||
        !req.body.precioUpdate ||
        !req.body.stockUpdate
      ) {
        return res.status(400).json({
          error: "Missing required parameters in request body",
        });
      }

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

      
      res.status(200).json(product);
    } catch (error) {
      debugLogger.error("Error in productController updateProduct method: ",error);
        res.status(500).json({
            error:"An error ocurred while trying to update the product"
    })
  }
  },
  deleteProduct: async (req, res) => {
    try {
      
      if (!req.params.id) {
        return res.status(400).json({
          error: "Missing ID parameter in request",
        });
      }
       
      await api.delete(parseInt(req.params.id));
      debugLogger.info("Product deleted");

      
      res.status(200).json(api.getAll());
    } catch (error) {
      debugLogger.error("Error in productController deleteProduct method: ",error);
      res.status(500).json({
        error:"An error ocurred while trying to delete the product"
    })
    }
  }
};


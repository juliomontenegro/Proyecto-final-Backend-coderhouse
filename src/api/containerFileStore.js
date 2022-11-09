import fs from "fs";
import {debugLogger} from "../utils.js";

class containerFileStore {
  constructor(route) {
    try {
      this.route = `src/db/${route}.json`;
    } catch (err) {
      debugLogger.error("Error in containerFileStore class constructor");
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.route, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      debugLogger.error("Error in containerFileStore class getAll method");
      throw new Error(err);
    }
  }

  async save(data) {
    try {
      await fs.promises.writeFile(this.route, JSON.stringify(data, null, 2));
    } catch (err) {
      debugLogger.error("Error in containerFileStore class save method");
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      const product = data.find((product) => product.id === id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (err) {
      debugLogger.error("Error in containerFileStore class getById method");
      throw new Error(err);
    }
  }

  async add(product) {
    try {
      const data = await this.getAll();
      product.id = data.length + 1;
      product.timestamp = Date.now();
      data.push(product);
      await this.save(data);
    } catch (err) {
      debugLogger.error("Error in containerFileStore class add method");
      throw new Error(err);
    }
  }

  async update(id, producto) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error("Product not found");
      }
      data[index].title = producto.title;
      data[index].price = producto.price;
      data[index].thumbnail = producto.thumbnail;
      await this.save(data);
    } catch (err) {
      debugLogger.error("Error in containerFileStore class update method");
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error("Product not found");
      }
      data.splice(index, 1);
      await this.save(data);
    } catch (err) {
      debugLogger.error("Error in containerFileStore class delete method");
      throw new Error(err);
    }
  }

  async updateCart(id, producto) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((product) => product.id === id);
      if (index === -1) {
        debugLogger.error("Error product not found in containerFileStore class updateCart method");
        throw new Error("Product not found");
      }
      data[index].productos.push(producto);
      await this.save(data);
    } catch (error) {
      debugLogger.error("Error in containerFileStore class updateCart method");
      throw new Error(err);
    }
  }
  async deleteProductCart(id_Cart, id_Prod) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((producto) => producto.id === id_Cart);
      if (index === -1) {
        debugLogger.error("Error product not found in containerFileStore class deleteProductCart method");
        throw new Error("Product not found");
      }
      const index2 = data[index].productos.findIndex(
        (producto) => producto.id === id_Prod
      );
      if (index2 === -1) {
        debugLogger.error("Error index not found in containerFileStore class deleteProductCart method");
        throw new Error("Product not found");
      }
      data[index].productos.splice(index2, 1);
      await this.save(data);
    } catch (err) {
      debugLogger.error("Error in containerFileStore class deleteProductCart method");
      throw new Error(err);
    }
  }
}

export { containerFileStore };

import {debugLogger} from "../utils.js";

class containerMemory {
  constructor() {
    
    this.memory = [];
  }

  async getAll() {
    try {
      return this.memory;
    } catch (error) {
      debugLogger.error("Error in containerMemory getAll method");
      throw new Error(err);
    }
  }
  async save(data) {
    try {
      this.memory = [...data];
    } catch (error) {
      debugLogger.error("Error in containerMemory save method");
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      const product = data.find((product) => product.id === id);
      if (!product) {
        debugLogger.error("Error product not found in containerMemory getById method");
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      debugLogger.error("Error in containerMemory getById method");
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
    } catch (error) {
      debugLogger.error("Error in containerMemory add method");
      throw new Error(err);
    }
  }
  async update(id, product) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((product) => product.id === id);
      if (index === -1) {
        debugLogger.error("Error product not found in containerMemory update method");
        throw new Error("Product not found");
      }
      data[index] = product;
      data[index].id = id;
      data[index].timestamp = Date.now();
      await this.save(data);
    } catch (error) {
      debugLogger.error("Error in containerMemory update method");
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((product) => product.id === id);
      if (index === -1) {
        debugLogger.error("Error index not found in containerMemory delete method");
        throw new Error("Product not found");
      }
      data.splice(index, 1);
      await this.save(data);
    } catch (error) {
      debugLogger.error("Error in containerMemory delete method");
      throw new Error(err);
    }
  }

  async updateCart(id, product) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((product) => product.id === id);
      if (index === -1) {
        debugLogger.error("Error index not found in containerMemory updateCart method");
        throw new Error("Product not found");
      }
      data[index].productos = [...data[index].productos, product];
      await this.save(data);
    } catch (error) {
      debugLogger.error("Error in containerMemory updateCart method");
      throw new Error(err);
    }
  }

  async deleteProductCart(id_Cart, id_Prod) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((producto) => producto.id === id_Cart);
      if (index === -1) {
        debugLogger.error("Error index not found in containerMemory deleteProductCart method");
        throw new Error("Product not found");
      }
      const index2 = data[index].productos.findIndex(
        (producto) => producto.id === id_Prod
      );
      if (index2 === -1) {
        debugLogger.error("Error index2 not found in containerMemory deleteProductCart method");
        throw new Error("Product not found");
      }
      data[index].productos.splice(index2, 1);

      await this.save(data);
    } catch (error) {
      debugLogger.error("Error in containerMemory deleteProductCart method");
      throw new Error(err);
    }
  }
}
export { containerMemory };

import mongoose from "mongoose";
import { productModels } from "../models/productModels.js";
import { debugLogger } from "../utils.js";

class containerMongoDb {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }
  async getAll(params) {
    try {
        const product = await this.collection.find(params);
        return product;
    } catch (error) {
      debugLogger.error("Error in containerMongoDb getAll method");
        throw error;
    }
        
    

  }
  async save(data) {
    try {
        await this.collection.create(data);
    } catch (error) {
      debugLogger.error("Error in containerMongoDb save method");
        throw error;
    }

  }
  async getById(id) {
    try {
        const product = await this.collection.findOne({ id: id });
        return product;
    } catch (error) {
      debugLogger.error("Error in containerMongoDb getById method");
        throw error;
    }

  }
  async add(product) {
    try {
        const data = await this.getAll();
        product.id = data.length + 1;
        product.timestamp = Date.now();
        await this.save(product);
    } catch (error) {
      debugLogger.error("Error in containerMongoDb add method");
        throw error;
    }

  }
  async update(id, product) {
    try {
        await this.collection.findOneAndUpdate({ id: id }, product);
    } catch (error) {
      debugLogger.error("Error in containerMongoDb update method");
        throw error;
    }

  }
  async delete(id) {
    try {

        const response = await this.collection.findOneAndDelete({id:id});
        return response;
    } catch (error) {
      debugLogger.error("Error in containerMongoDb delete method");
        throw error;
    }


  
  }

  async updateCart(id, producto) {
    try {
        const product=await productModels.findOne({id:producto})
        await this.collection.findOneAndUpdate(
            { id: id },
            { $push: { productos: product } }
          );
    } catch (error) {
      debugLogger.error("Error in containerMongoDb updateCart method");
      throw error;
    }

  }


async deleteProductCart(id_Cart, id_Prod) {
  try {
    const cart = await this.collection.findOne({ id: id_Cart });
    let found = false;
    const newProduct = cart.productos.filter(producto => {
      if (producto.id === id_Prod && !found) {
        found = true;
        return false;
      }
      return true;
    });
    await this.collection.updateOne(
      { id: id_Cart },
      { $set: { productos: newProduct} }
    );
    return cart;

  } catch (error) {
    debugLogger.error("Error in containerMongoDb deleteProductCart method");
      throw error;
  }
}


}

export { containerMongoDb };
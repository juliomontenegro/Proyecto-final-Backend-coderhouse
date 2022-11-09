import mongoose from "mongoose";
import { productModels } from "../models/productModels.js";
import { debugLogger } from "../utils.js";

class containerMongoDb {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }
  async getAll() {
    try {
        const product = await this.collection.find({});
        return product;
    } catch (error) {
      debugLogger.error("Error in containerMongoDb getAll method");
      throw new Error(error);
    }
        
    

  }
  async save(data) {
    try {
        await this.collection.create(data);
    } catch (error) {
      debugLogger.error("Error in containerMongoDb save method");
      throw new Error(error);
    }

  }
  async getById(id) {
    try {
        const product = await this.collection.findOne({ id: id });
        return product;
    } catch (error) {
      debugLogger.error("Error in containerMongoDb getById method");
      throw new Error(error);
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
      throw new Error(error);
    }

  }
  async update(id, product) {
    try {
        await this.collection.findOneAndUpdate({ id: id }, product);
    } catch (error) {
      debugLogger.error("Error in containerMongoDb update method");
      throw new Error(error);
    }

  }
  async delete(id) {
    try {
        const response = await this.collection.findOneAndDelete({ id: id });
        return response;
    } catch (error) {
      debugLogger.error("Error in containerMongoDb delete method");
      throw new Error(error);
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
      throw new Error(error);
    }

  }

  async deleteProductCart(id_Cart, id_Prod) {
    try {
        const data = await this.getAll();
        const index = data.findIndex((product) => product.id === id_Cart);
        if (index === -1) {
          debugLogger.error("Error index not found in containerMongoDb deleteProductCart method");
          throw new Error("Product not found");
        }
        data[index].productos.splice(data[index].productos.indexOf(id_Prod), 1);
        await this.save(data);
    } catch (error) {
      debugLogger.error("Error in containerMongoDb deleteProductCart method");
      throw new Error(error);
    }

  }

}

export { containerMongoDb };
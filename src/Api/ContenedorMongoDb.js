import mongoose from "mongoose";

class contenedorMongoDb {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }
  async getAll() {
    const producto = await this.collection.find({});
    return producto;
  }
  async save(data) {
    await this.collection.create(data);
  }
  async getById(id) {
    const producto = await this.collection.findOne({ id: id });
    return producto;
  }
  async add(producto) {
    const data = await this.getAll();
    producto.id = data.length + 1;
    producto.timestamp = Date.now();
    await this.save(producto);
  }
  async update(id, producto) {
    await this.collection.findOneAndUpdate({ id: id }, producto);
  }
  async delete(id) {
    const response = await this.collection.findOneAndDelete({ id: id });

    return response;
  }

  async updatecarrito(id, producto) {
    await this.collection.findOneAndUpdate(
      { id: id },
      { $push: { productos: producto } }
    );
  }

  async deleteProductocarrito(id_Carrito, id_Prod) {
    const data = await this.getAll();
    const index = data.findIndex((producto) => producto.id === id_Carrito);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    data[index].productos.splice(data[index].productos.indexOf(id_Prod), 1);
    await this.save(data);
  }
}

export { contenedorMongoDb };

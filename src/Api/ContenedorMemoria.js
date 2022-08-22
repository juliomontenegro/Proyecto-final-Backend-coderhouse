class contenedorMemoria {
  constructor() {
    this.memoria = [];
  }

  async getAll() {
    return this.memoria;
  }
  async save(data) {
    this.memoria = [...data];
  }

  async getById(id) {
    const data = await this.getAll();
    const producto = data.find((producto) => producto.id === id);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    return producto;
  }

  async add(producto) {
    const data = await this.getAll();
    producto.id = data.length + 1;
    producto.timestamp = Date.now();
    data.push(producto);
    await this.save(data);
  }
  async update(id, producto) {
    const data = await this.getAll();
    const index = data.findIndex((producto) => producto.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    data[index] = producto;
    data[index].id = id;
    data[index].timestamp = Date.now();
    await this.save(data);
  }

  async delete(id) {
    const data = await this.getAll();
    const index = data.findIndex((producto) => producto.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    data.splice(index, 1);
    await this.save(data);
  }

  async updatecarrito(id, producto) {
    const data = await this.getAll();
    const index = data.findIndex((producto) => producto.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    data[index].productos = [...data[index].productos, producto];
    await this.save(data);
  }

  async deleteProductocarrito(id_Carrito, id_Prod) {
    const data = await this.getAll();
    const index = data.findIndex((producto) => producto.id === id_Carrito);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    const index2 = data[index].productos.findIndex(
      (producto) => producto.id === id_Prod
    );
    if (index2 === -1) {
      throw new Error("Producto no encontrado");
    }
    data[index].productos.splice(index2, 1);

    await this.save(data);
  }
}
export { contenedorMemoria };

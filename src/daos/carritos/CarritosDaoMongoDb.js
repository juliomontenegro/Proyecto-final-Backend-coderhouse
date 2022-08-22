import {contenedorMongoDb} from'../../Api/ContenedorMongoDb.js';
import{carritoSchema}from'../../models/carritoModels/index.js';

class carritoDaoMongoDb extends contenedorMongoDb{
  constructor(){
    super('carrito',carritoSchema);
  }
}
export {carritoDaoMongoDb};
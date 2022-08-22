import{contenedorMongoDb}from'../../Api/ContenedorMongoDb.js';
import{productoSchema}from'../../models/productoModels/index.js';

class productosDaoMongoDb extends contenedorMongoDb{
    constructor(){
        super('productos',productoSchema);
    }
    }
export {productosDaoMongoDb};
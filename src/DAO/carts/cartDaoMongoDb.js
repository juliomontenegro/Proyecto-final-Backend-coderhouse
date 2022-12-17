import {containerMongoDb} from'../../service/containerMongoDb.js';
import{cartSchema}from'../../models/cartModels.js';

class cartDaoMongoDb extends containerMongoDb{
  constructor(){
    super('carrito',cartSchema);
  }
}
export {cartDaoMongoDb};
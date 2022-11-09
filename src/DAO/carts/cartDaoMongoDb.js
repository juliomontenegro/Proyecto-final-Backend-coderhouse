import {containerMongoDb} from'../../api/containerMongoDb.js';
import{cartSchema}from'../../models/cartModels.js';

class cartDaoMongoDb extends containerMongoDb{
  constructor(){
    super('carrito',cartSchema);
  }
}
export {cartDaoMongoDb};
import {containerMongoDb} from'../../api/containerMongoDb.js';
import{orderSchema}from'../../models/orderModels.js';

class orderDaoMongoDb extends containerMongoDb{
  constructor(){
    super('ordenes',orderSchema);
  }
}
export {orderDaoMongoDb};
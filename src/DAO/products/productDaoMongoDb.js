import{containerMongoDb}from'../../service/containerMongoDb.js';
import{productSchema}from'../../models/productModels.js';

class productDaoMongoDb extends containerMongoDb{
    constructor(){
        super('productos',productSchema);
    }
    }
export {productDaoMongoDb};
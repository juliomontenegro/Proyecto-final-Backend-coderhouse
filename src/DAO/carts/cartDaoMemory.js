import {containerMemory} from'../../api/containerMemory.js';
import {config} from'../../config/databaseConnections.js';

class cartDaoMemory extends containerMemory{
  constructor(){
    super(config.ARCHIVO_DB.carrito);
  }
}
export {cartDaoMemory};
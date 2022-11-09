import {containerFileStore} from'../../api/containerFileStore.js';
import {config} from'../../config/databaseConnections.js';


class cartDaoFiles extends containerFileStore{
  constructor(){
    super(config.ARCHIVO_DB.carrito);
  }
}
export {cartDaoFiles};
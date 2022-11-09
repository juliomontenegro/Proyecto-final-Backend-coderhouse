import {containerFileStore} from '../../api/containerFileStore.js';
import {config} from '../../config/databaseConnections.js';

class productDaoFiles extends containerFileStore{
  constructor(){
    super(config.ARCHIVO_DB.productos);
  }
}
export {productDaoFiles};
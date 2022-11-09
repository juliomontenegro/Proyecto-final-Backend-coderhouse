import {containerMemory} from '../../api/containerMemory.js';
import {config} from '../../config/databaseConnections.js';

class productDaoMemory extends containerMemory{
    constructor(){
        super(config.ARCHIVO_DB.productos);
    }
    }

export {productDaoMemory};
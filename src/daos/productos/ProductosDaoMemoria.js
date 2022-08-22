import {contenedorMemoria} from '../../Api/ContenedorMemoria.js';
import {config} from '../../config/index.js';

class productosDaoMemoria extends contenedorMemoria{
    constructor(){
        super(config.ARCHIVO_DB.productos);
    }
    }

export {productosDaoMemoria};
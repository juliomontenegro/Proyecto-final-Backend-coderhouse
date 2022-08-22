import {contenedorArchivo} from '../../Api/contenedorArchivo.js';
import {config} from '../../config/index.js';

class productosDaoArchivo extends contenedorArchivo{
  constructor(){
    super(config.ARCHIVO_DB.productos);
  }
}
export {productosDaoArchivo};
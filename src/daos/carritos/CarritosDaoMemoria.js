import {contenedorMemoria} from'../../Api/ContenedorMemoria.js';
import {config} from'../../config/index.js';

class carritoDaoMemoria extends contenedorMemoria{
  constructor(){
    super(config.ARCHIVO_DB.carrito);
  }
}
export {carritoDaoMemoria};
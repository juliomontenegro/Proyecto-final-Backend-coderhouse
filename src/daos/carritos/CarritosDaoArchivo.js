import {contenedorArchivo} from'../../Api/ContenedorArchivo.js';
import {config} from'../../config/index.js';


class carritoDaoArchivo extends contenedorArchivo{
  constructor(){
    super(config.ARCHIVO_DB.carrito);
  }
}
export {carritoDaoArchivo};
import{contenedorFirebase}from'../../Api/ContenedorFirebase.js';
import{config,dbFirebase}from'../../config/index.js';

class carritoDaoFirebase extends contenedorFirebase{
  constructor(){
    super(dbFirebase,config.ARCHIVO_DB.carrito);
  }
}
export{carritoDaoFirebase};
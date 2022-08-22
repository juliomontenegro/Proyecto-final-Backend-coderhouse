import{contenedorFirebase}from'../../Api/ContenedorFirebase.js';
import{config,dbFirebase}from'../../config/index.js';

class productosDaoFirebase extends contenedorFirebase{
    constructor(){
        super(dbFirebase,config.ARCHIVO_DB.productos);
    }}
    
    export{productosDaoFirebase};
import {config}from'../config/index.js';
import { carritoDaoArchivo,carritoDaoMemoria,carritoDaoMongoDb,carritoDaoFirebase } from './carritos/index.js';
import { productosDaoArchivo,productosDaoMemoria,productosDaoMongoDb,productosDaoFirebase } from './productos/index.js';



const persistencia=config.PersistSeleccion;

const DBSseleccion={
    archivo:()=>{
        const productoDao=new productosDaoArchivo();
        const carritoDao=new carritoDaoArchivo();
        return{productoDao,carritoDao};

    },
    memoria:()=>{
        const productoDao=new productosDaoMemoria();
        const carritoDao=new carritoDaoMemoria();
        return{productoDao,carritoDao};
    },
    mongo:()=>{
        const productoDao=new productosDaoMongoDb();
        const carritoDao=new carritoDaoMongoDb();
        return{productoDao,carritoDao};
    },
    firebase:()=>{
        const productoDao=new productosDaoFirebase();
        const carritoDao=new carritoDaoFirebase();
        return{productoDao,carritoDao};
    }

}

const {productoDao,carritoDao}=DBSseleccion[persistencia]();

export{productoDao,carritoDao};


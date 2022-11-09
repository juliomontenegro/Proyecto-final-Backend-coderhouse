import{config}from'../config/databaseConnections.js';
import{cartDaoFiles,cartDaoMemory,cartDaoMongoDb}from'./carts/index.js';
import{productDaoFiles,productDaoMemory,productDaoMongoDb}from'./products/index.js';
import {orderDaoMongoDb} from './orders/index.js'

const persistency=config.Persistence;

const DBSselect={
    filestorage:()=>{
        const productDao=new productDaoFiles();
        const cartDao=new cartDaoFiles();
        const orderDao=new orderDaoMongoDb();
        return{productDao,cartDao,orderDao};

    },
    memory:()=>{
        const productDao=new productDaoMemory();
        const cartDao=new cartDaoMemory();
        const orderDao=new orderDaoMongoDb();
        return{productDao,cartDao,orderDao};
    },
    mongo:()=>{
        const productDao=new productDaoMongoDb();
        const cartDao=new cartDaoMongoDb();
        const orderDao=new orderDaoMongoDb();
        return{productDao,cartDao,orderDao};
    }


}

const {productDao,cartDao,orderDao}=DBSselect[persistency]();

export{productDao,cartDao,orderDao};
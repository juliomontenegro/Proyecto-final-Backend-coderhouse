import{config}from'../config/databaseConnections.js';
import{cartDaoMongoDb}from'./carts/index.js';
import{productDaoMongoDb}from'./products/index.js';
import {orderDaoMongoDb} from './orders/index.js'

const persistency=config.Persistence;

const DBSselect={

    mongo:()=>{
        const productDao=new productDaoMongoDb();
        const cartDao=new cartDaoMongoDb();
        const orderDao=new orderDaoMongoDb();
        return{productDao,cartDao,orderDao};
    }
}

const {productDao,cartDao,orderDao}=DBSselect[persistency]();

export{productDao,cartDao,orderDao};
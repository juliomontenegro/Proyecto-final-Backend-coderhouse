import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

//persistence types
const DBS = {
  filestorage:"filestorage",
  memory:"memory",
  mongo:"mongo",
};

const config = {
  ARCHIVO_DB: {
    productos: "productos",
    carrito: "carrito",
    ordenes: "ordenes",
  },
  MONGO_DB: {
    URL: process.env.MONGODB_URI,
  },
  Persistence: process.env.PERSISTENCE_SELECTED || DBS.filestorage,
};



//mongo connection
if (process.env.PERSISTENCE_SELECTED == DBS.mongo) {

mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('Connected to Mongo')})
.catch((err)=>{console.log(err)})
}



export {config};
import dotenv from "dotenv";
import mongoose from "mongoose";
import admin from "firebase-admin";
import{createRequire} from "module";
dotenv.config();

//tipos de persistencias, pueden cambiarse desde el .env
const DBS = {
  archivo: "archivo",
  memoria: "memoria",
  mongo: "mongo",
  firebase: "firebase",
};

const config = {
  ARCHIVO_DB: {
    productos: "productos",
    carrito: "carrito",
  },
  MONGO_DB: {
    URL: process.env.MONGODB_URI,
  },
  PersistSeleccion: process.env.PERSISTENCIA_SELECCIONADA || DBS.archivo,
};

//conectar a mongo si se selecciono la persistencia mongo


if (process.env.PERSISTENCIA_SELECCIONADA == DBS.mongo) {
  mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conectado a MongoDB");
    })
    .catch((err) => {
      console.log("Error al conectar a MongoDB: " + err);
    });
}

//conectar a firebase si se selecciono la persistencia firebase

if (process.env.PERSISTENCIA_SELECCIONADA == DBS.firebase) {
  const require =createRequire(import.meta.url);
  const serviceAccount = require('../db/firebase.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  
  });
  console.log("Conectado a Firebase");
 
 
}

const dbFirebase = process.env.PERSISTENCIA_SELECCIONADA==DBS.firebase? admin.firestore():null;

export { config, dbFirebase };

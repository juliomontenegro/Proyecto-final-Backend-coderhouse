// const {FieldValue}=require('firebase-admin/app')
import {FieldValue} from 'firebase-admin/firestore'

class contenedorFirebase{
    constructor(db,coleccion){
    this.query=db.collection(coleccion);
    }
    async getAll(){
        const data=await this.query.get();
        return data.docs.map(doc=>{
            const data=doc.data();
            data.id=doc.id;
            return data;
        });
    }
    async getById(id){

        const data=await this.query.doc(id.toString()).get();
        return data.data();

    }
    async add(producto){
        const data=await this.getAll();
        producto.id=data.length+1;
        let idproducto=producto.id;
        producto.timestamp=Date.now();
        await this.query.doc(`${idproducto}`).set(producto);
    }
    async update(id,producto){
        await this.query.doc(id.toString()).update(producto);
    }
    async delete(id){
 

        await this.query.doc(id.toString()).delete();

        
      
    }
    async updatecarrito(id,producto){
        //contar la cantidad de documentos en el array productos
         const data = await this.query.doc(id.toString()).get();
         const index = data.data().productos.length;
            producto.id=index+1;       
        await this.query.doc(id.toString()).update({
            productos:FieldValue.arrayUnion(producto)})
        


    }
    async deleteProductocarrito(id_Carrito,id_Prod){
        const data = await this.getById(id_Carrito.toString());
        
        //encontrar el objeto dentro del array productos
        const index = data.productos.findIndex(
            (producto) => producto.id === id_Prod
        );
        //eliminar el objeto del array productos
        data.productos.splice(index, 1);
        //actualizar el array productos en la base de datos
        await this.query.doc(id_Carrito.toString()).update({productos:data.productos});
 


    }
}
export{contenedorFirebase};
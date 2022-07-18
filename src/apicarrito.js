const fs = require('fs');

class apicarrito{

    constructor(ruta){
        this.ruta=ruta;
    }
    
    async getAllcarrito(){
        const data=await fs.promises.readFile(this.ruta);
        return JSON.parse(data);
    }
    
    async savecarrito(data){
        await fs.promises.writeFile(this.ruta,JSON.stringify(data,null,2));
    }
    
    async getByIdcarrito(id){
        const data=await this.getAllcarrito();
        const producto=data.find(producto=>producto.id===id);
        if(!producto){
            throw new Error('Producto no encontrado');
        }
        return producto;
    }
   
    async addcarrito(producto){
        const data=await this.getAllcarrito();
        producto.id=data.length+1;
        data.push(producto);
        await this.savecarrito(data);
    }
 
    async updatecarrito(id,producto){
        const data=await this.getAllcarrito();
        const index=data.findIndex(producto=>producto.id===id);
        if(index===-1){
            throw new Error('Producto no encontrado');
        }
        data[index].productos=producto;
        await this.savecarrito(data);
    }
    
    async deletecarrito(id){
        const data=await this.getAllcarrito();
        const index=data.findIndex(producto=>producto.id===id);
        if(index===-1){
            throw new Error('Producto no encontrado');
        }
        data.splice(index,1);
        await this.savecarrito(data);
    }
 

   async getIdcarrito (){
        const data=await this.getAllcarrito();
        return data.length>0?data[data.length-1].id+1:1;
    }
    async deleteProductocarrito(id_Prod,id_Carrito){
        const data=await this.getAllcarrito();
        const index=data.findIndex(producto=>producto.id===id_Carrito);
        if(index===-1){
            throw new Error('Producto no encontrado');
        }
        const index2=data[index].productos.findIndex(producto=>producto.id===id_Prod);
        if(index2===-1){
            throw new Error('Producto no encontrado');
        }
        data[index].productos.splice(index2,1);
        await this.savecarrito(data);
    }

}
module.exports=apicarrito;
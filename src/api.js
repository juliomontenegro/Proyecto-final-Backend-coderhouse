const fs = require('fs');

class api{
    constructor(ruta){
        this.ruta=ruta;
    }
   
    async getAll(){
        const data=await fs.promises.readFile(this.ruta);
        return JSON.parse(data);
    }
    
    async save(data){
        await fs.promises.writeFile(this.ruta,JSON.stringify(data,null,2));
    }

   
    async getById(id){
        const data=await this.getAll();
        const producto=data.find(producto=>producto.id===id);
        if(!producto){
            throw new Error('Producto no encontrado');
        }
        return producto;
    }
  
    async add(producto){
        const data=await this.getAll();
        producto.id=data.length+1;
        data.push(producto);
        await this.save(data);
    }
   
    async update(id,producto){
        const data=await this.getAll();
        const index=data.findIndex(producto=>producto.id===id);
        if(index===-1){
            throw new Error('Producto no encontrado');
        }
        data[index]=producto;
        data[index].id=id;
        data[index].timestamp=Date.now();
        await this.save(data);
    }

    async delete(id){
        const data=await this.getAll();
        const index=data.findIndex(producto=>producto.id===id);
        if(index===-1){
            throw new Error('Producto no encontrado');
        }
        data.splice(index,1);
        await this.save(data);
    }

    getId(){
        return this.getAll().length>0?this.getAll()[this.getAll().length-1].id+1:1;
    }


   }
    module.exports=api;




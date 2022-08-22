let nombre=document.getElementById("nombre");
let descripcion=document.getElementById("descripcion");
let codigo=document.getElementById("codigo");
let foto=document.getElementById("foto");
let precio=document.getElementById("precio");
let stock=document.getElementById("stock");
let botonProd= document.getElementById("botonProd");




//fetch a /api/productos 
botonProd.addEventListener("click", async () => {

    const response = await fetch('/api/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,
            descripcion: descripcion.value,
            codigo: codigo.value,
            foto: foto.value,
            precio: precio.value,
            stock: stock.value
        })
    });
    const data = await response.json();
    renderProducts();
    return data;
})



// hacer un fetch a: /api/productos
const getProducts = async () => {
    const response = await fetch("api/productos");
    const products = await response.json();
    return products;
  }
  const createProductTable = async (products) => {
    const archivoTemplate = await fetch("./hb/form.hbs");
    const templateText = await archivoTemplate.text();
    const templateCompiled = Handlebars.compile(templateText);
    return templateCompiled({ products });
  }
  const renderProducts = async () => {
    const products = await getProducts();
    const table = await createProductTable(products);
    document.getElementById("contenidoTabla").innerHTML = table;
  }
    renderProducts();

// eliminar un producto con un boton tomar su value y eliminar
const deleteProduct = async (id) => {
   
    const response = await fetch(`api/productos/${id}`, {
        method: "DELETE"
    });
    const products = await response.json();
    renderProducts();
    return products;
   
}



const editar= async (id) => {

    const archivoTemplate = await fetch("./hb/edit.hbs");
    const templateText = await archivoTemplate.text();
    const templateCompiled = Handlebars.compile(templateText);
    document.getElementById(id).innerHTML = templateCompiled();

    let nombreUpdate = document.getElementById("nombreUpdate");
    let descripcionUpdate = document.getElementById("descripcionUpdate");
    let codigoUpdate = document.getElementById("codigoUpdate");
    let fotoUpdate = document.getElementById("fotoUpdate");
    let precioUpdate = document.getElementById("precioUpdate");
    let stockUpdate = document.getElementById("stockUpdate");
    
    const botonEditar=document.getElementById("botonUpdate");
    botonEditar.addEventListener("click", async () => {
        const response = {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nombreUpdate: nombreUpdate.value,
                descripcionUpdate: descripcionUpdate.value,
                codigoUpdate: codigoUpdate.value,
                fotoUpdate: fotoUpdate.value,
                precioUpdate: precioUpdate.value,
                stockUpdate:stockUpdate.value
            })
        };
        const data = await fetch(`api/productos/${id}`, response);
        console.log(data);
        renderProducts();
        
    })}

                                 ///////////////////////
                                // CARRITO DE COMPRAS//
                               ///////////////////////

// hacer un fetch a: /api/carrito y mostrarlo en una tabla con el id "contenidoCarrito"
const getCarrito = async () => {

    const response = await fetch("api/carrito/");
    const carro = await response.json();
    return carro;
    }
    const createCarritoTable = async (carro) => {
        const archivoTemplate = await fetch("./hb/carrito.hbs");
        const templateText = await archivoTemplate.text();
        const templateCompiled = Handlebars.compile(templateText);
        return templateCompiled({ carro });
        }
        const renderCarrito = async () => {
            const carro = await getCarrito();
            const table2 = await createCarritoTable(carro);
            document.getElementById("contenidoCarrito").innerHTML = table2;
            }
            renderCarrito();
 

// crear un carrito usando post con un fetch a la ruta /api/carrito
let btncrearCarrito = async () => {
    const response = await fetch('/api/carrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    renderCarrito();
    
    return data;
}

// eliminar el carrito con un fetch delete a la ruta /api/carrito/:id
let btneliminarCarrito = async (id) => {
    const response = await fetch(`api/carrito/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    renderCarrito();
    return data;
}

// agregar un producto al carrito por su id con un post a la ruta ${id}/productos
let btnagregarCarrito = async (idProd) => {
    const response = await fetch(`api/carrito`);
    const carrito = await response.json();
    const id = carrito[0].id;
    let botonAgregar = idProd
    const response2 = await fetch(`api/carrito/${id}/productos`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idProducto:botonAgregar
        })
        
    });
    const data = await response2.json();
    renderCarrito();
   
    return data;

}

//eliminar un producto con la id de carrito y de producto con un delete a la ruta /api/carrito/:id/productos/:idProducto
let btneliminarProducto = async (idProd) => {
    const response = await fetch(`api/carrito/${idProd}/productos`, {
        method: "DELETE"
    });
    const data = await response.json();
    renderCarrito();
    return data;
}
let btnEliProdCarrito = async (id_Prod) => {
    const response=await fetch('api/carrito');
    const carrito = await response.json();
    const id = carrito[0].id;
    const response2 = await fetch(`api/carrito/${id}/productos/${id_Prod}`, {
        method: "DELETE"
    });
    const data = await response2.json();
    renderCarrito();
    return data;
}







     





   

    









    































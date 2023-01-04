const Login= async()=>{
    const response = await fetch("/api/sessions/current")
    const userInfo = await response.json()
    const templateHbs = `{{#if userInfo.user}}
    <div class="container pt-4">
    <h4><img height="90px" width="90px" src="{{userInfo.user.avatar}}" > Bienvenido! {{userInfo.user.name}}</h4>
    <button onclick=logOut() class="btn btn-danger" >Desloguear</button>
    </div>
    {{/if}}`;
    const template = Handlebars.compile(templateHbs);
    document.getElementById("loginAdmin").innerHTML = template({userInfo});

    }

Login()

const logOut= async()=>{
    const response = await fetch("/api/sessions/current")
    const userInfo = await response.json()

    document.getElementById("loginAdmin").innerHTML = `<h3 class="text-danger text-center">Hasta Luego ${userInfo.user.name}!</h3>`;
    const responselogout= await fetch("/api/sessions/logout")
    const logout= await responselogout.json()

    setTimeout(()=>{ location.reload(); }, 2000);
    }




let nombre=document.getElementById("nombre");
let descripcion=document.getElementById("descripcion");
let codigo=document.getElementById("codigo");
let foto=document.getElementById("foto");
let precio=document.getElementById("precio");
let stock=document.getElementById("stock");
let botonProd= document.getElementById("botonProd");



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
    const data = await response.json()
    productTable();
    return data;
})

const deleteProduct = async (id) => {
    const response = await fetch(`/api/productos/${id}`, {
        method: "DELETE"
    });
    const products = await response.json();
    productTable();
    return products;
   
}






const productTable =async ()=>{
    const response=await fetch('/api/productos');
    const data=await response.json();
    const templateHbs=`              {{#if products.length}}
    <hr>
    <h4 class="text-center">Productos Ingresados</h4>
    {{#each products}}
<div class="container mt-5 mb-5">
<div class="d-flex justify-content-center row">
  <div class="col-md-10">

      <div class="row p-2 bg-white border rounded">
          <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src={{this.foto}}></div>
          <div class="col-md-6 mt-1">
              <h5>{{this.nombre}}</h5>
              <div class="d-flex flex-row">
                  <div class="ratings mr-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div><br>
              </div>
              <div class="mt-1 mb-1 spec-1"><span class="dot"></span><span>Codigo:{{this.codigo}}</span></div>
              <div class="mt-1 mb-1"><h5><span class="dot"></span>Stock: {{this.stock}}</h5></div><br>
              <p class="text-justify text-truncate para mb-0"><p>Descripcion del Producto: {{this.descripcion}} </p><br><br></p>
          </div>
          <div class="align-items-center align-content-center col-md-3 border-left mt-1">
              <div class="d-flex flex-row align-items-center">
                  <h4 class="mr-1">$ {{this.precio}} </h4>
              </div>
              <h6 class="text-success">Envio Gratis</h6>
              <div class="d-flex flex-column mt-4"><button class="btn btn-success btn-sm mt-1" type="button" onclick=editar({{this.id}})>Editar Producto</button><button class="btn btn-outline-danger btn-sm mt-2" type="button" onclick=deleteProduct({{this.id}})>Borrar producto</button></div>
          </div>
      </div>
</div>
</div>
</div>
<div id={{this.id}}></div>

    {{/each}}
    <hr>     
    {{/if}}
   
    {{#unless products.length}}
     <hr>
              <h4 class="text-center">No Hay Productos Guardados</h4>
    {{/unless}}`;
        let products=data;
        let template = Handlebars.compile(templateHbs);
        document.getElementById("contentTable").innerHTML =template({products});
}
productTable();

const editar= async (id) => {

const templateHbs=`<section class="container pt-4">
<div>
    <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" name="nombreUpdate" class="form-control" id="nombreUpdate">
    </div>

    <div class="mb-3">
        <label for="descripcion" class="form-label">Descripcion</label>
        <input type="text" name="descripcionUpdate" class="form-control" id="descripcionUpdate">
    </div>

    <div class="mb-3">
        <label for="codigo" class="form-label">Codigo</label>
        <input type="text" name="codigoUpdate" class="form-control" id="codigoUpdate">
    </div>
    <div class="mb-3">
        <label for="foto" class="form-label">Foto</label>
        <input type="text" name="fotoUpdate" class="form-control" id="fotoUpdate">
    </div>
    <div class="mb-3">
        <label for="precio" class="form-label">Precio</label>
        <input type="number" name="precioUpdate" class="form-control" id="precioUpdate">
    </div>
    <div class="mb-3">
        <label for="stock" class="form-label">Stock</label>
        <input type="number" name="stockUpdate" class="form-control" id="stockUpdate">
    </div>

    <button class="btn btn-primary" id="botonUpdate">Editar</button>

    <a href="/admin" class="btn btn-secondary btn-danger">Cancelar</a>

</div>`
    document.getElementById(id).innerHTML =templateHbs;

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
      
        productTable();
        
    })}
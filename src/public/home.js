
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
              <div class="d-flex flex-column mt-4">
              <button class="btn btn-primary btn-sm" type="button" onclick=addProductCart({{this.id}}) value={{this.id}} >Agregar al Carrito</button>
              
              </div>
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


//login
const Login= async()=>{
    const response = await fetch("/api/sessions/current")
    const userInfo = await response.json()
    const templateHbs = `{{#if userInfo.user}}
    <div class="container pt-4">
    <h4><img height="90px" width="90px" src="{{userInfo.user.avatar}}" > Bienvenido! {{userInfo.user.name}}</h4>
    <button onclick=logOut() class="btn btn-danger" >Desloguear</button>
    <button onclick=location.href="/orders" class="btn btn-primary" >Ver Ordenes</button>
    </div>
    {{/if}}`;
    const template = Handlebars.compile(templateHbs);
    document.getElementById("login").innerHTML = template({userInfo});
    if (userInfo.user.idCart === null) {
      createCart();
    } else {
      renderCart(userInfo.user.idCart);
    }
    }
    

Login()


const logOut= async()=>{
    const response = await fetch("/api/sessions/current")
    const userInfo = await response.json()

    document.getElementById("login").innerHTML = `<h3 class="text-danger text-center">Hasta Luego ${userInfo.user.name}!</h3>`;
    const responselogout= await fetch("/api/sessions/logout")
    const logout= await responselogout.json()

    setTimeout(()=>{ location.reload(); }, 2000);
    }


//cart


        const renderCart = async (id) => {
          const response = await fetch(`api/carrito/${id}`);
          const cart = await response.json();
           //total de la compra del carrito en cart.productos.precio
           cart.total = cart.productos.reduce((acc, prod) => acc + prod.precio, 0);
           

          const templateHbs = `              <div class="col text-center">
          {{#unless cart}}
          <button class="btn btn-success btn-lg" onclick=createCart()>Crear Carrito</button>
          </div>
          {{/unless}}
          {{#if cart}}
           {{#cart}}
           {{#if this.productos.length}}
           <button class="btn btn-danger btn-lg" onclick=deleteCart({{this.id}})>Eliminar Carrito</button>
           <button class="btn btn-success btn-lg" onclick=finalOrder()>Finalizar Compra</button>
           {{/if}}
           </div>
 
<hr>    

<div class="mt-3 w-75 mx-auto">

<h1 class="text-center">Carrito de compras</h1>
<h2 class="text-center">Total de la compra: $ {{this.total}}</h2>
<table class="table table-dark  table-striped ">
<tr>
<th scope="col">Producto</th>
<th scope="col">Descripcion</th>
<th scope="col">Precio</th>
</tr>


{{#productos}}
<tr>
<td>{{this.nombre}}</td>
<td>{{this.descripcion}}</td>
<td>$ {{this.precio}}</td>
<td style="width:0px"><button class="btn btn-danger btn-sm" onclick=deleteProdCart({{this.id}})>BORRAR</button></td>
</tr>
{{/productos}}
{{#unless productos}}
  <tr>
<td>No Hay Productos en el Carrito</td>
<td>No Hay Productos en el Carrito </td>
<td>No Hay productos en el Carrito</td> 
</tr>
{{/unless}}
</table>
{{/cart}}
{{/if}}`
          const template = Handlebars.compile(templateHbs);
          document.getElementById("contentCart").innerHTML=template({cart});
        } 
 
            
         

// create cart
let createCart = async () => {
    const response = await fetch('/api/carrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    let id = data;
    renderCart(id);
    
    return data;
}


// delete the cart
let deleteCart = async (id) => {
    const response = await fetch(`api/carrito/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    createCart();
    return data;
}

let current= async () => {
    const response = await fetch('/api/sessions/current');
    const data = await response.json();
    let idCurrent=data.user.idCart
    return idCurrent
}



// add product in the cart by id
let addProductCart = async (idProd) => {
    let id = await current();
    let idprod = idProd;

    const product= await fetch(`api/productos/${idprod}`);
    const dataproduct = await product.json();
    if(dataproduct.stock===0){
        alert("No hay stock disponible")
        return
    }


   
    const response = await fetch(`api/carrito/${id}/productos`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idProducto: dataproduct
        })
        
    });
    const data = await response.json();
     Login();
   
    return data;

}

// delete product in the cart by id
let deleteProdCart = async (id_Prod) => {
    let id = await current();
    await fetch(`api/carrito/${id}/productos/${id_Prod}`, {
        method: "DELETE"
    });
   
    Login();
}


// final order
let finalOrder = async () => {
    try{
      let id = await current();
      const responseCart = await fetch(`api/carrito/${id}`);
      const cart = await responseCart.json();
      const response = await fetch("api/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productos: [cart.productos],
        }),
      });
      const data = await response.json();
     
        if (data.message === "Order created") {
          cartSuccess();
        }
    }catch{
    cartError()
}
}



let cartSuccess =async() => {
  document.getElementById(
    "contentCart"
  ).innerHTML = `<h3 class="text-center color-success">Su compra se ha realizado con exito</h3>`;

    setTimeout(() => {
      createCart();
    }, 2000);

}

let cartError =async() => {
    document.getElementById("contentCart").innerHTML = `<h3 class="text-center color-danger">Hubo un error, realize su compra nuevamente.</h3>`;
    
     setTimeout(() => {createCart();}, 2000);
    
    }











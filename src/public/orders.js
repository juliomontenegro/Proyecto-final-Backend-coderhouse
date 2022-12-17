const renderAllOrders = async () => {
  const data = await fetch(`api/ordenes/all`);
  const dataOrders = await data.json();
  console.log(dataOrders);
  let templateHbs = "";
  dataOrders.forEach((order) => {
    order.total = order.productos.reduce(
      (total, product) => total + product.precio,
      0
    );

    const productsCount = order.productos.reduce((count, product) => {
      count[product.nombre] = 1;
      return count;
    }, {});

    order.productos.forEach((product) => {
      if (product.nombre in productsCount) {
        productsCount[product.nombre]++;
      } else {
        productsCount[product.nombre] = 1;
      }
    });

    const productosCountList = Object.entries(productsCount).map(
      ([nombre, count]) => `<li>${count} ${nombre} </li>`
    );

    templateHbs += `
        <div class="card mx-auto" style="width:35rem;">
            <div class="card-body mx-auto">
                <h5 class="card-title">Usuario: ${order.user}</h5>
                <h5 class="card-subtitle mb-2 text-muted">Dia de la compra: ${new Date(
                  order.timestamp
                ).toLocaleString()}</h5>
                <p class="card-text">Numero de orden: ${order._id}</p>
                <p class="card-text">
                    Productos Comprados:
                    <ul class="mx-auto">
                        ${productosCountList.join("")}
                    </ul>
                </p>
                <p class="card-text">Total de su compra: $${order.total}</p>
            </div>
        </div>
        <hr>`;
  });

  document.getElementById("orders").innerHTML = templateHbs;
};

renderAllOrders();

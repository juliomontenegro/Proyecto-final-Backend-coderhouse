import axios from "axios";

const axiosTestGet = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/productos");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

const axiosTestPost = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/productos", {  
        nombre: "Titulo",
        descripcion: "Descripcion",
        precio: 123,
        foto: "https://picsum.photos/200/300",
        timestamp: "2021-09-09T10:00:00.000Z",
        stock: 123,
        codigo:1530,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const axiosTestPut = async () => {
  try {
    const response = await axios.put("http://localhost:8080/api/productos/5", {
      nombreUpdate: "Titulonuevo",
      descripcionUpdate: "Descripcionnueva",
      codigoUpdate: 1560,
      fotoUpdate: "https://picsum.photos/200/300",
      precioUpdate: 1234,
      stockUpdate: 1234,
      
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const axiosTestDelete = async () => {
  try {
    const response = await axios.delete(
      "http://localhost:8080/api/productos/5"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}



axiosTestGet();
// axiosTestPost();
// axiosTestPut();
// axiosTestDelete();



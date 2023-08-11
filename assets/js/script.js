const getProductos = async () => {
  const respuesta = await fetch("./assets/data/data.json");
  return await respuesta.json();
};

const listadoProductos = document.querySelector("#listadoProductos");
const listaCarrito = document.querySelector("#listaCarrito");
const totalDeCompra = document.getElementById("totalDeCompraCarrito");

let productos = [];
let carrito = [];
let totalCompra = 0;
let cantidadesEnCarrito = {};

async function init() {
  productos = await getProductos();
  renderProductos(productos);
}
init();
//
//
//   VARIABLES
//
//
const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const mensajeBienvenida = document.getElementById("bienvenido");
const btnPagar = document.getElementById("botonPagar");
const btnSalir = document.getElementById("salir");
const boxCrear = document.getElementById("boxCrear");
const boxLogin = document.getElementById("boxLogin");
const btnI = document.getElementById("i");
const btnC = document.getElementById("c");
const usuario = JSON.parse(localStorage.getItem("usuarioON")) || [];
//
//
//   FUNCIONES
//
//
function bienvenida() {
  if (usuario.length == 1) {
    const acceso = usuario[0];
    btnI.style.display = "none";
    btnC.style.display = "none";
    btnPagar.style.display = "block";
    btnSalir.style.display = "block";
    mensajeBienvenida.textContent = `Bienvenido ${acceso.nombreLogin}`;
  } else {
    btnI.style.display = "block";
    btnC.style.display = "block";
    btnPagar.style.display = "none";
    btnSalir.style.display = "none";
  }
}
bienvenida();
//
//
function renderProductos(productos) {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("cardProducto");
    card.innerHTML = `
    <img src="${producto.imgUrl}">
    <div class="textosProductos">
      <h3>${producto.nombre}</h3>
      <p style="margin-top:10px"><span style="font-weight: bold">Precio: $</span>${producto.precio}</p>
      <button class="agregarAlCarrito" id="${producto.id}">Agregar al carrito</button>
    </div>
    `;
    listadoProductos.appendChild(card);
  });
}
//
//
function ingre() {
  window.location.href = "./assets/pages/login.html";
}
//
//
function crea() {
  window.location.href = "./assets/pages/crear.html";
}
//
function salir() {
  mensajeBienvenida.textContent = "";
  btnPagar.style.display = "none";
  btnSalir.style.display = "none";
  btnC.style.display = "block";
  btnI.style.display = "block";
  localStorage.removeItem("usuarioON");
  window.location.href = "index.html";
}
//
//
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const cantidadEnCarrito = cantidadesEnCarrito[producto.id];
    if (cantidadEnCarrito > 0) {
      const articuloCarrito = document.createElement("div");
      articuloCarrito.classList.add("cardMini");
      articuloCarrito.innerHTML = `
      <img src="${producto.imgUrl}">
      <p>${producto.nombre}</p> 
      <p>${cantidadEnCarrito}</p>
      <button class="eliminarProducto" id="${producto.id}">Eliminar</button>
      `;
      listaCarrito.appendChild(articuloCarrito);
    }
  });
  totalDeCompra.textContent = totalCompra;
  const eliminarBotones = listaCarrito.querySelectorAll(".eliminarProducto");
  eliminarBotones.forEach((button) => {
    button.addEventListener("click", () => eliminarProducto(parseInt(button.id)));
  });
  let restarProductos = listaCarrito.querySelectorAll(".restarProdu");
  restarProductos.forEach((restarProducto) => {
    restarProducto.addEventListener("click", () => {
      let productoId = parseInt(restarProducto.parentElement.getAttribute("id"));
      if (cantidadesEnCarrito[productoId] !== 1) {
        cantidadesEnCarrito[productoId]--;
        totalCompra -= productos.find((producto) => producto.id === productoId).precio;
        actualizarCarrito();
      }
    });
  });
}
//
//
function agregarCarrito(id) {
  let producto = productos.find((item) => item.id === id);
  if (producto) {
    if (!cantidadesEnCarrito[producto.id]) {
      cantidadesEnCarrito[producto.id] = 1;
      carrito.push(producto);
    } else {
      cantidadesEnCarrito[producto.id]++;
    }
    totalCompra += producto.precio;

    actualizarCarrito();
    Toastify({
      text: "Agregado con exito",
      duration: 1500,
    }).showToast();
  }
}
//
//
function eliminarProducto(id) {
  let producto = productos.find((item) => item.id === id);
  if (producto && cantidadesEnCarrito[producto.id]) {
    totalCompra -= producto.precio * cantidadesEnCarrito[producto.id];
    delete cantidadesEnCarrito[producto.id];
    carrito = carrito.filter((item) => item.id !== id);
    actualizarCarrito();
  }
}
//
//
function vaciarCarrito() {
  carrito.length = 0;
  totalCompra = 0;
  cantidadesEnCarrito = {};
  listaCarrito.innerHTML = "";
  totalDeCompra.textContent = 0;
}
//
//
function mensajeGracias() {
  if (carrito.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No es posible realizar la operación",
      text: "Tu carrito está vacío",
      ConfirmButtonText: "Continuar",
      timer: 3000,
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Muchas gracias",
      text: "Tu compra se ah realizado correctamente",
      ConfirmButtonText: "Continuar",
      timer: 3000,
    });
    vaciarCarrito();
  }
}
//
//
//       EVENTOS
//
//
document.getElementById("botonVaciarCarrito").addEventListener("click", vaciarCarrito);
document.getElementById("botonPagar").addEventListener("click", mensajeGracias);

listadoProductos.addEventListener("click", (event) => {
  if (event.target.classList.contains("agregarAlCarrito")) {
    const productoId = parseInt(event.target.getAttribute("id"));
    agregarCarrito(productoId);
  }
});

btnSalir.addEventListener("click", salir);
btnC.addEventListener("click", crea);
btnI.addEventListener("click", ingre);

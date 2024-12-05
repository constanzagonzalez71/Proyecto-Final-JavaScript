// Productos disponibles
const productos = [
    { id: 1, nombre: "Unicornio Multicolor", precio: 60000, img:"imagenescomprimidas/unicornio multicolor.jpg"},
    { id: 2, nombre: "Amigurumi Muñeca Razpunsel", precio: 80000, img: "imagenescomprimidas/Muñeca Raspunzel.jpg"},
    { id: 3, nombre: "Koala Bebe", precio: 40000, img: "imagenescomprimidas/Koala Bebé.jpg"},
    { id: 4, nombre: "Amigurumi Conejita con moño", precio: 40000, img:"imagenescomprimidas/Conejita con moño.jpg"},
    { id: 5, nombre: "Amigurumi Oso grande con jardinero", precio: 80000, img:"imagenescomprimidas/Oso con jardinero.jpg"},
    { id: 6, nombre: "Amigurumi Elefanta Rosa", precio: 40000, img:"imagenescomprimidas/Elefanta Rosa .jpg"},
    { id: 7, nombre: " Amigurumi Conejo Dormilon", precio: 80000, img:"imagenescomprimidas/Conejo dormilón.jpg"},
    { id: 8, nombre: "Amigurumi Jirafas cortinas", precio: 80000, img:"imagenescomprimidas/Jirafas para cortinas.jpg" },
    { id: 9, nombre: "Amigurumi Combo Bebe", precio: 80000, img: "imagenescomprimidas/Combo bebé.jpg" },
    { id: 10, nombre: "Amigurumi Pepa Pig", precio: 40000, img:"imagenescomprimidas/Pepa pig.jpg" },
    { id: 11, nombre: "Amigurumi Zorrito Bebe", precio: 80000, img:"imagenescomprimidas/Zorrito bebé.jpg" },
    { id: 12, nombre: "Amigurumi Pikachu", precio: 80000, img:"imagenescomprimidas/Picachú.jpg" },
    { id: 13, nombre: "Amigurumi Principito", precio: 80000, img:"imagenescomprimidas/Principito.jpg" },
    { id: 14, nombre: "Amigurumi Baby Yoda", precio: 80000, img:"imagenescomprimidas/Starwars.jpg" },
    { id: 15, nombre: "Canasta Multiuso decorada", precio: 60000, img:"imagenescomprimidas/Canasta multiuso.jpg" },
    { id: 16, nombre: "Set Nacimiento", precio: 80000,img:"imagenescomprimidas/Set nacimiento.jpg" },
    { id: 17, nombre: "Amigurumi Oso Panda", precio: 35000,img:"imagenescomprimidas/Oso Panda.jpg" },
    { id: 18, nombre: "Amigurumi Oso con Bufanda", precio: 40000,img:"imagenescomprimidas/Oso con bufanda.jpg" },
    { id: 19, nombre: "Amigurumi Vaca Rosa", precio: 35000, img:"imagenescomprimidas/vacarosa.jpg" },
    { id: 20, nombre: "Amigurumi Conejita con cartera", precio: 40000, img:"imagenescomprimidas/conejita con cartera.jpg" },
    { id: 21, nombre: "Ajuar Recien Nacido", precio: 70000, img:"imagenescomprimidas/Ajuar nacimiento.jpg" },
    { id: 22, nombre: "Amigurumi Hipopotamo bebe", precio: 40000, img:"imagenescomprimidas/Hipopótamobebe.jpg" },
    { id: 23, nombre: "Amigurumi Papá Noel", precio: 80000, img:"imagenescomprimidas/Papá noel.jpg" },
    { id: 24, nombre: "Amigurumi Arbolito Navidad", precio: 60000,img:"imagenescomprimidas/Arbolito Navidad.jpg"},
    { id: 25, nombre: "Amigurumi Angelito Gabriel", precio: 40000,img:"imagenescomprimidas/Ángel Gabriel.jpg"},
    { id: 26, nombre: "Amigurumi Angelito Pesebre", precio: 35000,img:"imagenescomprimidas/angelito pesebre.jpg"},
    { id: 27, nombre: "Pesebre Navideño", precio: 90000, img:"imagenescomprimidas/Pesebre.jpg" }
];




// Constantes globales
const container = document.getElementById("productos-container");
const carritoContainer = document.getElementById("carrito-container");
const totalElement = document.getElementById("total");
const mensajesGlobales = document.getElementById("mensajes-globales");
const contadorCarrito = document.querySelector(".cart-count");
const finalizarBtn = document.getElementById("finalizar-compra");

// Manejo del carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Inicializar carrito
let carrito = cargarCarrito();

// Función para mostrar los productos
function mostrarProductos() {
    if (!container) {
        console.error("Contenedor no encontrado.");
        return;
    }

    container.innerHTML = "";
    productos.forEach(producto => {
        const card = crearElementoProducto(producto);
        container.appendChild(card);
    });
}

// Crear elementos de productos
function crearElementoProducto(producto) {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
        <div class="card">
            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio.toLocaleString()}</p>
                <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            </div>
        </div>
    `;
    return card;
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        guardarCarrito(carrito);
        actualizarVistaCarrito();
        mostrarMensaje(`${producto.nombre} agregado al carrito.`, "success");
    } else {
        console.error("Producto no encontrado.");
    }
}

// Mostrar el carrito detallado
function mostrarCarrito() {
    if (!carritoContainer) {
        console.error("Contenedor del carrito no encontrado.");
        return;
    }

    carritoContainer.innerHTML = "";
    if (carrito.length === 0) {
        carritoContainer.innerHTML = `<p class="text-center">El carrito está vacío.</p>`;
        return;
    }

    carrito.forEach((producto, index) => {
        const item = crearElementoCarrito(producto, index);
        carritoContainer.appendChild(item);
    });
}

// Crear elementos del carrito
function crearElementoCarrito(producto, index) {
    const item = document.createElement("div");
    item.className = "row mb-3 align-items-center";
    item.innerHTML = `
        <div class="col-md-6">
            <h6>${producto.nombre}</h6>
        </div>
        <div class="col-md-3">
            <p>$${producto.precio.toLocaleString()}</p>
        </div>
        <div class="col-md-3">
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        </div>
    `;
    return item;
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    if (index >= 0 && index < carrito.length) {
        const producto = carrito[index];
        carrito.splice(index, 1);
        guardarCarrito(carrito);
        actualizarVistaCarrito();
        mostrarMensaje(`${producto.nombre} eliminado del carrito.`, "danger");
    }
}

// Calcular el total del carrito
function calcularTotal() {
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    if (totalElement) {
        totalElement.textContent = total.toLocaleString();
    }
}

// Finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarMensaje("El carrito está vacío.", "warning");
        return;
    }

    carrito = [];
    guardarCarrito(carrito);
    actualizarVistaCarrito();
    mostrarMensaje("Gracias por su compra.", "success");
}

// Mostrar mensaje dinámico
function mostrarMensaje(mensaje, tipo = "info") {
    const mensajeContainer = document.createElement("div");
    mensajeContainer.className = `alert alert-${tipo} mt-3`;
    mensajeContainer.textContent = mensaje;

    if (mensajesGlobales) {
        mensajesGlobales.appendChild(mensajeContainer);
        setTimeout(() => mensajeContainer.remove(), 3000);
    }
}

// Actualizar el contador de productos en el carrito
function actualizarContadorCarrito() {
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }
}

// Actualizar vistas relacionadas al carrito
function actualizarVistaCarrito() {
    mostrarCarrito();
    calcularTotal();
    actualizarContadorCarrito();
}

// Inicializar eventos y datos
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarVistaCarrito();

    if (finalizarBtn) {
        finalizarBtn.addEventListener("click", finalizarCompra);
    }
});

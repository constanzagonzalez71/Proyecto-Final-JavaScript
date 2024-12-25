// Selección de elementos importantes
const container = document.getElementById("productos-container");
const carritoContainer = document.getElementById("productos.container");
let carrito = [];
const mensajesGlobales = document.getElementById("mensajes-globales");
const contadorCarrito = document.querySelector(".cart-count");
const totalElement = document.querySelector("#total");
const finalizarBtn = document.getElementById("finalizar-compra");

// Número de WhatsApp y mensaje predeterminado
const numeroWhatsApp = "+543413491868"; 
const mensajeWhatsApp = "Hola, estoy interesado en sus productos. ¿Podría darme más información?";

// Cargar productos desde el archivo JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch('JS/productos.json'); 
        if (!respuesta.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        mostrarMensaje("Hubo un error al cargar los productos. Intente más tarde.", "danger");
        return [];
    }
}

// Mostrar productos en la página
async function mostrarProductos() {
    const productos = await cargarProductos();
    if (!container) {
        console.error("Contenedor de productos no encontrado.");
        return;
    }

    container.innerHTML = ""; // Limpiar el contenedor antes de agregar productos
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
    cargarProductos().then(productos => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            carrito.push(producto); // Agregar producto al carrito
            guardarCarrito(carrito); // Guardar en localStorage
            calcularTotal(); // Calcular y actualizar el total
            actualizarVistaCarrito(); // Actualizar la vista del carrito
            mostrarMensaje(`${producto.nombre} agregado al carrito.`, "success");
        } else {
            console.error("Producto no encontrado.");
        }
    });
}

// Mostrar productos en el carrito
function mostrarCarrito() {
    if (!carritoContainer) {
        console.error("Contenedor del carrito no encontrado.");
        return;
    }

    carritoContainer.innerHTML = ""; // Limpiar el contenido antes de renderizar

    if (carrito.length === 0) {
        carritoContainer.innerHTML = `<p class="text-center">El carrito está vacío.</p>`;
        return;
    }

    carrito.forEach((producto, index) => {
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
        carritoContainer.appendChild(item);
    });
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    if (index >= 0 && index < carrito.length) {
        const producto = carrito[index];
        carrito.splice(index, 1); // Eliminar el producto del array
        guardarCarrito(carrito); // Guardar el carrito actualizado
        mostrarCarrito(); // Actualizar la vista del carrito
        calcularTotal(); // Actualizar el total
        actualizarContadorCarrito(); // Actualizar el contador
        mostrarMensaje(`${producto.nombre} eliminado del carrito.`, "danger");
    }
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Calcular el total del carrito
function calcularTotal() {
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    if (totalElement) {
        totalElement.textContent = total.toLocaleString(); // Mostrar el total formateado
    }
}

// Actualizar el contador de productos en el carrito
function actualizarContadorCarrito() {
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length; // Mostrar la cantidad de productos
    }
}

// Actualizar vistas relacionadas al carrito
function actualizarVistaCarrito() {
    mostrarCarrito(); // Mostrar productos en el carrito
    calcularTotal(); // Actualizar el total
    actualizarContadorCarrito(); // Actualizar el contador
}

// Mostrar mensajes dinámicos
function mostrarMensaje(mensaje, tipo = "info") {
    const mensajeContainer = document.createElement("div");
    mensajeContainer.className = `alert alert-${tipo} mt-3`;
    mensajeContainer.textContent = mensaje;

    if (mensajesGlobales) {
        mensajesGlobales.appendChild(mensajeContainer);
        setTimeout(() => mensajeContainer.remove(), 3000);
    }
}

// Abrir chat de WhatsApp
function abrirChatWhatsApp() {
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(url, "_blank");
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
    carrito = cargarCarrito(); // Cargar el carrito si existe
    mostrarProductos(); // Mostrar productos
    actualizarVistaCarrito(); // Actualizar vistas iniciales del carrito

    if (finalizarBtn) {
        finalizarBtn.addEventListener("click", () => {
            carrito = [];
            guardarCarrito(carrito);
            actualizarVistaCarrito();
            mostrarMensaje("Gracias por tu compra.", "success");
        });
    }

    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', abrirChatWhatsApp);
    }
});

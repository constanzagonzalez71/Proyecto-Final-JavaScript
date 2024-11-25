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

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos en index.html
function mostrarProductos() {
    const container = document.getElementById("productos-container");
    container.innerHTML = "";
    productos.forEach(producto => {
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
        container.appendChild(card);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));  // Guardar el carrito actualizado en localStorage
    alert(`${producto.nombre} agregado al carrito.`);
    console.log("Contenido del carrito después de agregar:", carrito);
}

// Mostrar carrito en finalizar.html
function mostrarCarrito() {
    const container = document.getElementById("carrito-container");
    const totalElement = document.getElementById("total");
    container.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        container.innerHTML = `<div class="col-md-12">El carrito está vacío.</div>`;
        totalElement.textContent = "$0";
        return;
    }

    carrito.forEach(item => {
        const row = document.createElement("div");
        row.className = "col-md-12 mb-3";
        row.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${item.nombre}</span>
                <span>$${item.precio.toLocaleString()}</span>
            </div>
        `;
        container.appendChild(row);
        total += item.precio;
    });

    totalElement.textContent = total.toLocaleString();
}

// Finalizar compra
document.getElementById("finalizar-compra")?.addEventListener("click", () => {
    alert("Gracias por tu compra.");
    // Vaciar carrito y localStorage
    localStorage.removeItem("carrito");
    carrito = []; // Vaciar el carrito en el frontend

    // Actualizar la vista
    mostrarCarrito();
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("productos-container")) {
        mostrarProductos();
    }
    if (document.getElementById("carrito-container")) {
        mostrarCarrito();
    }
});

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    const index = carrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
        carrito.splice(index, 1); // Eliminar el producto del array
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar el localStorage
        alert("Producto eliminado del carrito.");
        mostrarCarrito(); // Actualizar la vista del carrito
    }
}

// Mostrar carrito actualizado
function mostrarCarrito() {
    const container = document.getElementById("carrito-container");
    const totalElement = document.getElementById("total");
    container.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        container.innerHTML = `<div class="col-md-12">El carrito está vacío.</div>`;
        totalElement.textContent = "$0";
        return;
    }

    carrito.forEach(item => {
        const row = document.createElement("div");
        row.className = "col-md-12 mb-3";
        row.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${item.nombre}</span>
                <span>$${item.precio.toLocaleString()}</span>
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </div>
        `;
        container.appendChild(row);
        total += item.precio;
    });

    totalElement.textContent = total.toLocaleString();
}

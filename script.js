const url =
  "https://backservicetest-g8emcvdff0fqe2b8.canadacentral-01.azurewebsites.net/api/producto";

const contenedor = document.getElementById("contenedorProductos");
const contadorCarrito = document.getElementById("contadorCarrito");
const cantidadProductos = document.getElementById("cantidadProductos");

let carrito = 0;

async function cargarProductos() {
  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("No se pudieron obtener los productos");
    }

    const productos = await respuesta.json();

    contenedor.innerHTML = "";
    cantidadProductos.textContent = `${productos.length} productos`;

    productos.forEach((producto) => {
      const columna = document.createElement("div");
      columna.className = "col-sm-12 col-md-4 mb-4";

      let precioHTML;

      if (producto.enOferta && producto.precioOferta != null) {
        precioHTML = `
          <span class="text-danger fw-bold fs-5">
            Q ${parseFloat(producto.precioOferta).toFixed(2)}
          </span>

          <small class="text-muted text-decoration-line-through ms-2">
            Q ${parseFloat(producto.precio).toFixed(2)}
          </small>
        `;
      } else {
        precioHTML = `
          <span class="text-primary fw-bold fs-5">
            Q ${parseFloat(producto.precio).toFixed(2)}
          </span>
        `;
      }

      columna.innerHTML = `
        <article class="card h-100 product-card shadow-sm">
          <img
            src="${producto.imagen}"
            class="card-img-top product-image img-fluid"
            alt="${producto.nombre}"
          >

          <div class="card-body d-flex flex-column">
            <h3 class="card-title h5">${producto.nombre}</h3>

            <p class="card-text text-secondary">
              ${producto.descripcion}
            </p>

            <p>${precioHTML}</p>

            <button
              class="btn btn-primary mt-auto agregarCarrito"
              type="button"
            >
              <i class="bi bi-cart-plus me-1"></i>
              Agregar al carrito
            </button>
          </div>
        </article>
      `;

      const boton = columna.querySelector(".agregarCarrito");

      boton.addEventListener("click", () => {
        carrito++;
        contadorCarrito.textContent = carrito;
      });

      contenedor.appendChild(columna);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);

    cantidadProductos.textContent = "Error";

    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">
          No se pudieron cargar los productos.
        </div>
      </div>
    `;
  }
}

cargarProductos();
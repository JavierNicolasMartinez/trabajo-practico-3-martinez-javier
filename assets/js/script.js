const btnBuscar = document.getElementById("btn-buscar");
const urlDragonBall = "https://dragonball-api.com/api/characters";
const padre = document.getElementById("contenedor-data");
const formBuscador = document.getElementById("form-buscador");
let personajes = [];



//punto 2 de validación
const validacion = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error en la API");
        }

        const data = await response.json();

        return data;
    }catch (error) {
        console.error(error);
        //ver si hay errores de console.log
    }
};

const verPersonajes = async (id) => {
    try {
        const response = await fetch(`${urlDragonBall}/${id}`);

        if (!response.ok) {
            throw new Error("Error en la API");
        }

        const data = await response.json();

        // agregar modal 
        const modalBody = document.getElementById("modalDetalleBody");
    modalBody.innerHTML = `
    <div class="text-center mb-3">
        <img src="${data.image}" alt="${data.name}" class="img-fluid" style="max-height: 200px;">
    </div>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Raza:</strong> ${data.race}</p>
    <p><strong>Género:</strong> ${data.gender}</p>
    <p><strong>Descripción:</strong> ${data.description}</p>
    `;
// Crear y mostrar el modal usando la API de Bootstrap
    const myModal = new bootstrap.Modal(document.getElementById("modalDetalles"));
    myModal.show();
} catch (error) {
    console.error(error);
    alert("Ocurrió un error al obtener los detalles del personaje");
}
};



//Para cargar de la API de dragón Ball - ver si funciona
btnBuscar.addEventListener("click", async () => {
    const data = await validacion(urlDragonBall);
    const dataPersonajes = data.items || data;

    //agregado de limpieza
    padre.innerHTML = "";

    // console.log(dataPersonajes);

dataPersonajes.forEach((personaje) => {
    personajes.push(personaje);
    console.log(personajes);
        padre.innerHTML += `
        <div class="col-md-3 mb-4">
                    <div class="card h-100 bg-secondary text-warning">
                        <img src=${personaje.image} class="card-img-top" alt="personaje de Dragón Ball">
                        <div class="card-body ">
                            <h5 class="card-title text-center">${personaje.name}</h5>
                            <p class="card-text text-center">${personaje.race} - ${personaje.gender}</p>
                        </div>
                        <div class= "d-flex justify-content-center px-3 pb-3">
                            <button data-id="${personaje.id}" class="btn btn-dark btn-ver-detalles text-center">Ver detalles</button>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">Este es un personaje mostrado desde la API</small>
                        </div>
                    </div>
                </div>
        `;
    
    });
});

// Delegación de eventos: Detectar clicks en "Ver detalles" y activar el modal

padre.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ver-detalles")) {
        const id = e.target.getAttribute("data-id");
        verPersonajes(id);

    }    
});
    
formBuscador.addEventListener("submit", async(event)=> {
    event.preventDefault();
    const query = document.getElementById("buscador").value.trim();
    try {
        const response = await fetch (`${urlDragonBall}?name=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error("Error en la API");
        }
        const data = await response.json();
        const personajes = data.items || data;
        padre.innerHTML = "";

        personajes.forEach(personaje => {
            padre.innerHTML +=`
            <div class="col-md-3 mb-4">
                    <div class="card h-100 bg-secondary text-warning">
                        <img src=${personaje.image} class="card-img-top" alt="personaje de Dragón Ball">
                        <div class="card-body ">
                            <h5 class="card-title text-center">${personaje.name}</h5>
                            <p class="card-text text-center">${personaje.race} - ${personaje.gender}</p>
                        </div>
                        <div class= "d-flex justify-content-center px-3 pb-3">
                            <button data-id="${personaje.id}" class="btn btn-dark btn-ver-detalles text-center">Ver detalles</button>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">Este es un personaje mostrado desde la API</small>
                        </div>
                    </div>
                </div>`
        });
    }catch (error) {
        console.error(error);
        alert("Ocurrio un error al consultar la API")
    }

});

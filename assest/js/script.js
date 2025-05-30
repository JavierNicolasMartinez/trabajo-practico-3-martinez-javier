const btnBuscar = document.getElementById("btn-buscar");
const urlDragonBall = "https://dragonball-api.com/api/characters";
const padre = document.getElementById("contenedor-data");

//punto 2 de validación
const validacion = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new error("Error en la API");
        }

        const data = await response.json();

        return data;
    }catch (error) {
        console.log(error);
    }
};

const verPersonajes = async (id) => {
    try {
        const response = await fetch(`${urlDragonBall}/${id}`);

        if (!response.ok) {
            throw new error("Error en la API");
        }

        const data = await response.json();

        alert(data.description);
    } catch (error) {
        console.log(error);
    }
};
//Para cargar de la API de dragón Ball
btnBuscar.addEventListener("click", async () => {
    const data = await validacion(urlDragonBall);
    const dataPersonajes = data.items;

    console.log(dataPersonajes);

dataPersonajes.forEach((personaje) => {
        padre.innerHTML += `
        <div class="container text-center mt-4 p-2">
               <div class="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
                <div class="col">
                    <div class="card h-100 bg-secondary text-warning">
                        <img src=${personaje.image} class="card-img-top" alt="personaje de Dragón Ball">
                        <div class="card-body ">
                            <h5 class="card-title">${personaje.name}</h5>
                            <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                        </div>
                        <div>
                            <button class="btn btn-dark btn-ver-detalles">Ver detalles</button>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">Este es un personaje mostrado desde la API</small>
                        </div>
                    </div>
                </div>
        `;
        
    });
});

padre.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ver-detalles")) {
        const cardPadre = e.target.closest(".col-3");
        const id = cardPadre.dataset.id;

        verDetalles(id);

    }    
});
    
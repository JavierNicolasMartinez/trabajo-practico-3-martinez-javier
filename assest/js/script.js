const btnBuscar = document.getElementById("btn-buscar");
const urlDragonBall = "https://dragonball-api.com/api/characters";
const padre = document.getElementById("contenedor-data");

//punto 2 de validación
const cargaPersonajes = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new console.error("Error en la API");
        }

        const data = await response.json();
        return data;
    }catch (error) {
        console.log(error);
    }
};


//Buscar dato del pokemon dependiendo de su numero o nombre
function buscarPokemon(contenedorNumero) { 
    let inputId = `pokemonInput${contenedorNumero}`;
    let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;
    


    fetch(urlApi)
        .then(response => response.json())
        .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
        .catch(()=>mostrarError(contenedorNumero));
    
}

//Mostrar informacion del pokemon

function mostrarPokemon(datosPokemon, contenedorNumero) {
    let infoDivId = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);
    let idFormateado = formatearId(datosPokemon.id);

    infoDiv.innerHTML = `
    <h2 class = "pk-name">${datosPokemon.name.toUpperCase()}</h2>
    <img class= "pk-img" src="${datosPokemon.sprites.other["official-artwork"].front_default}" alt="${datosPokemon.name.toUpperCase()}">
    <p class="pk-info">Type: ${datosPokemon.types.map(type => type.type.name.toUpperCase()).join(', ')}</p>
    <p class="pk-info">Id: ${idFormateado}</p>
    <p class="pk-info">Base Experience: ${datosPokemon.base_experience}</p>
    <p class="pk-info">Weight: ${datosPokemon.weight / 10}Kg</p>
    <p class="pk-info">Height: ${datosPokemon.height / 10}m</p>
    <p class="pk-info">Abilities: ${datosPokemon.abilities.map(ability => ability.ability.name.toUpperCase()).join(', ')}</p>
    <p class="pk-info">Estadísticas:</p>
    <ul class="stats-list">
            ${datosPokemon.stats.map(stat => `<li>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</li>`).join('')}
    </ul>
`
}
    
// Error en busqueda de pokemon

function mostrarError(contenedorNumero) { 
    let infoDivId = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);
    infoDiv.innerHTML = `
    <p class="pk-ms">Pokemon no encontrado. <br> Intenta con otro nombre o Número</p>

`
}

// Formatear ID
function formatearId(id) {
    let idFormateado = id.toString();
    while (idFormateado.length < 4) {
        idFormateado = '0' + idFormateado;
    }
    return `#${idFormateado}`;
}

// Mostrar Pokemon Inicial

window.onload = function () { 
    document.getElementById("pokemonInput1").value = "25";
    buscarPokemon(1);
    document.getElementById("pokemonInput2").value = "4";
    buscarPokemon(2);
}
function prevSlide(button) {
    const carousel = button.parentElement;
    const inner = carousel.querySelector('.carousel-inner');
    const items = inner.querySelectorAll('.carousel-item');
    const activeItem = inner.querySelector('.carousel-item.active');
    let prevItem = activeItem.previousElementSibling;

    if (!prevItem) {
        prevItem = items[items.length - 1];
    }

    activeItem.classList.remove('active');
    prevItem.classList.add('active');
    inner.style.transform = `translateX(-${prevItem.offsetLeft}px)`;
}

function nextSlide(button) {
    const carousel = button.parentElement;
    const inner = carousel.querySelector('.carousel-inner');
    const items = inner.querySelectorAll('.carousel-item');
    const activeItem = inner.querySelector('.carousel-item.active');
    let nextItem = activeItem.nextElementSibling;

    if (!nextItem) {
        nextItem = items[0];
    }

    activeItem.classList.remove('active');
    nextItem.classList.add('active');
    inner.style.transform = `translateX(-${nextItem.offsetLeft}px)`;
}

document.addEventListener("DOMContentLoaded", () => {
    const regiones = {
        Kanto: ["red-blue", "yellow", "firered-leafgreen", "lets-go-pikachu-lets-go-eevee"],
        Johto: ["gold-silver", "crystal", "heartgold-soulsilver"],
        Hoenn: ["ruby-sapphire", "emerald", "omega-ruby-alpha-sapphire"],
        Sinnoh: ["diamond-pearl", "platinum", "brilliant-diamond-and-shining-pearl"],
        Teselia: ["black-white", "black-2-white-2"],
        Kalos: ["x-y"],
        Alola: ["sun-moon", "ultra-sun-ultra-moon"],
        Galar: ["sword-shield"],
        Paldea: ["scarlet-violet"]
    };

    async function obtenerJuegos(region, idLista) {
        const lista = document.getElementById(idLista);
        if (!lista) return;

        try {
            for (const juegoSlug of regiones[region]) {
                const response = await fetch(`https://pokeapi.co/api/v2/version-group/${juegoSlug}/`);
                const data = await response.json();
                const listItem = document.createElement("li");
                listItem.textContent = data.name.replace(/-/g, " ").toUpperCase();
                lista.appendChild(listItem);
            }
            
        } catch (error) {
            console.error(`Error obteniendo juegos de ${region}:`, error);
        }
    }

    // Llamamos a la función para cada región
    Object.keys(regiones).forEach(region => {
        obtenerJuegos(region, `juegos-${region}`);
    });
});

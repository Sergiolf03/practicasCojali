function moverCarrusel(id, direccion) {
    const carrusel = document.getElementById(id);
    const inner = carrusel.querySelector('.carrusel-inner');
    const items = carrusel.querySelectorAll('.carrusel-item');
    const totalItems = items.length;
    let currentIndex = Array.from(items).findIndex(item => item.classList.contains('active'));

    currentIndex = (currentIndex + direccion + totalItems) % totalItems;

    items.forEach(item => item.classList.remove('active'));
    items[currentIndex].classList.add('active');

    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
}
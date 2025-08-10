const header = document.querySelector('header');
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links li a');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');

// Toggle para el menú hamburguesa en móviles
menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Cierra el menú si se hace clic fuera de él en dispositivos móviles
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 900) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Funcionamiento del modal cuando se da click en una imagen
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeButton = document.querySelector('.close-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentIndex = 0; // Para rastrear el índice de la imagen actual

// Función para mostrar una imagen específica
function showImage(index) {
    // Aseguramos que el índice esté dentro de los límites
    if (index < 0 || index >= galleryImages.length) {
        return;
    }
        
    currentIndex = index;
    const imageUrl = galleryImages[currentIndex].getAttribute('src');
    lightboxImage.setAttribute('src', imageUrl);
        
    // Comprobar y deshabilitar/habilitar los botones
    if (currentIndex === 0) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }
        
    if (currentIndex === galleryImages.length - 1) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}

// Funciones de navegación
function showPrev() {
    showImage(currentIndex - 1);
}
    
function showNext() {
    showImage(currentIndex + 1);
}

// Event listeners para abrir el lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener('click', function() {
        lightbox.classList.add('active');
        showImage(index);
    });
});

// Event listeners para cerrar el lightbox
closeButton.addEventListener('click', function() {
    lightbox.classList.remove('active');
});
    
lightbox.addEventListener('click', function(event) {
    if (event.target === this) {
        lightbox.classList.remove('active');
    }
});

// Event listeners para los botones de navegación
prevButton.addEventListener('click', showPrev);
nextButton.addEventListener('click', showNext);

// Event listener para las teclas del teclado
document.addEventListener('keydown', function(event) {
    if (lightbox.classList.contains('active')) {
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
            showPrev();
        } else if (event.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) {
            showNext();
        } else if (event.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    }
});
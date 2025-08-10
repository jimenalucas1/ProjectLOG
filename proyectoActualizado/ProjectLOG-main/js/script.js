const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const header = document.querySelector('header');
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links li a');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');


// =====================================================================
// Lógica para sección de noticias
// =====================================================================
const contenedor = document.querySelector('.contenedor-carrusel');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slidesPorVista = 2; // Cantidad de slides que se muestran a la vez
let indice = 0;

// Calcular el número de pasos posibles para el carrusel
const numPasos = totalSlides - (slidesPorVista - 1);

    // Flecha derecha → avanzar una noticia, con ciclo infinito
    document.querySelector('.flecha.derecha').addEventListener('click', () => {
    indice = (indice + 1) % numPasos;
    moverCarrusel();
    });

    // Flecha izquierda ← retroceder una noticia, con ciclo infinito
    document.querySelector('.flecha.izquierda').addEventListener('click', () => {
    indice = (indice - 1 + numPasos) % numPasos;
    moverCarrusel();
    });

    // Función que aplica la transformación
    function moverCarrusel() {
    contenedor.style.transform = `translateX(-${indice * (100 / slidesPorVista)}%)`;
    }
// CULMINA SECCIÓN NOTICIAS


// =====================================================================
// Lógica para el boton de index que te mande arriba
// =====================================================================

    // Lógica para mostrar/ocultar el botón de "Volver arriba"
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }

        // Resaltar el enlace de navegación activo basado en la sección visible
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // Desplazamiento suave al hacer clic en el botón "Volver arriba"
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

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

    // Desplazamiento suave al hacer clic en los enlaces de navegación (y cerrar menú móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Si el enlace es interno (empieza con '#'), aplica desplazamiento suave
            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    if (window.innerWidth <= 900) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });



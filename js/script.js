    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    const noticiasSection = document.getElementById('noticias'); // La sección principal de noticias
    const cardWrapper = document.querySelector('.card-wrapper'); // Contenedor de las cards
    const newsDetailContainer = document.getElementById('news-detail-container'); // Contenedor del detalle
    const newsDetailImage = document.getElementById('news-detail-image');
    const newsDetailTitle = document.getElementById('news-detail-title');
    const newsDetailParagraph = document.getElementById('news-detail-paragraph');
    const closeDetailBtn = document.getElementById('close-detail-btn');
    const cardItems = document.querySelectorAll('.card-item'); // Todas las cards

    // Almacena una referencia a la tarjeta DOM que fue seleccionada para poder restaurarla
    let selectedCardDomElement = null;

    // Datos de las noticias detalladas
    const newsData = {
        'feria-1': {
            image: 'image/noticia2.jpg',
            title: 'Participación en la feria de proyectos de la FIEE',
            text: '<strong>17 de Junio, 2025:</strong> El equipo del Proyecto Matrícula FIEE 26-1 con IA participará en la reciente Feria de Proyectos organizada por la facultad. Agradecemos enormemente a la facultad por la valiosa oportunidad de participar en este importante concurso y dar a conocer nuestro proyecto. Presentamos un prototipo funcional del sistema, demostrando cómo la Inteligencia Artificial optimizará el proceso de matrícula y cómo la infraestructura en AWS garantizará su estabilidad y escalabilidad. La acogida de estudiantes y docentes fue excepcional, recibiendo valioso feedback que nos ayudará a perfeccionar el sistema antes de su implementación. Agradecemos a todos los que se acercaron a conocer nuestra propuesta innovadora.'
        },
        'vrip': {
            image: 'image/noticia1.jpg',
            title: 'VRIP impulsa el proyecto con la adquisición de equipos de última generación',
            text: '<strong>10 de Junio, 2025:</strong> Se recibió en los ambientes del Instituto de Investigación de la FIEE, dos laptops marca HP que ha financiado el Vicerrectorado de Investigación y Posgrado (VRIP). Este importante aporte se enmarca en el desarrollo del nuevo sistema de matrícula en base a IA que se estaría implementando desde el ciclo 2026-1. Estas laptops de alto rendimiento son cruciales para el equipo de desarrollo, ya que facilitarán las tareas de programación, pruebas de algoritmos de inteligencia artificial y el procesamiento de grandes volúmenes de datos necesarios para la optimización del sistema. La inversión del VRIP subraya el compromiso de la universidad con la innovación tecnológica y la mejora continua de los servicios estudiantiles, sentando las bases para una matrícula más eficiente y adaptada a las necesidades modernas.'
        },
        'feria-2': {
            image: 'image/noticia2.jpg',
            title: 'Participación en la feria de proyectos de la FIEE (2)',
            text: '<strong>17 de Junio, 2025:</strong> Una segunda nota sobre la participación en la feria de proyectos de la FIEE. Aquí más detalles sobre la recepción y el impacto del Proyecto Matrícula FIEE 26-1 en la comunidad estudiantil. La exposición permitió un diálogo fructífero con los asistentes, quienes mostraron gran interés en las funcionalidades de inteligencia artificial y la eficiencia del nuevo sistema. Este evento reafirma el compromiso de la facultad con la innovación y el desarrollo tecnológico.'
        },
        'lanzamiento': {
            // Se ha eliminado la propiedad 'image' para esta noticia
            title: '¡Lanzamiento oficial de la landing page del proyecto!',
            text: '<strong>15 de Mayo, 2025:</strong> Con gran entusiasmo anunciamos el lanzamiento de nuestra landing page oficial. Este espacio digital será el punto de encuentro principal para la comunidad FIEE, ofreciendo información detallada sobre el proyecto, noticias, preguntas frecuentes y canales de comunicación. Esta plataforma es un pilar fundamental para mantener a todos informados sobre el progreso y los beneficios del nuevo sistema de matrícula inteligente.'
        },
        'sin-imagen': { // Noticia de prueba para casos sin imagen
            title: 'Noticia de prueba sin imagen',
            text: '<strong>20 de Junio, 2025:</strong> Esta es una noticia de prueba para demostrar que el sistema funciona correctamente incluso cuando no se proporciona una imagen específica para la noticia. El layout se mantendrá y se usará una imagen por defecto.'
        }
        // Agrega más noticias aquí con sus respectivos IDs
    };

    // Función para mostrar la vista detallada de una noticia
    function showNewsDetail(newsId) {
        const news = newsData[newsId];
        if (news) {
            // Si ya hay una noticia desplegada, la mostramos de nuevo en su posición original
            if (selectedCardDomElement) {
                selectedCardDomElement.classList.remove('hidden');
            }

            // Rellenar el contenedor de detalles de la noticia
            // Usa la imagen de la noticia o una imagen de marcador de posición si no hay imagen
            newsDetailImage.src = news.image ? news.image : 'image/placeholder_news.jpg';
            newsDetailImage.alt = news.title;
            newsDetailTitle.textContent = news.title;
            newsDetailParagraph.innerHTML = news.text; // Usar innerHTML para mantener el negrita

            // Encontrar la tarjeta clicada en el DOM y ocultarla
            selectedCardDomElement = document.querySelector(`.card-item[data-news-id="${newsId}"]`);
            if (selectedCardDomElement) {
                selectedCardDomElement.classList.add('hidden'); // Oculta la tarjeta clicada de la rejilla
            }

            // Mover newsDetailContainer para que esté justo después del párrafo inicial de #noticias
            // Esto lo posiciona visualmente por encima de card-wrapper
            const firstPInNoticias = noticiasSection.querySelector('p');
            noticiasSection.insertBefore(newsDetailContainer, firstPInNoticias.nextElementSibling);

            // Mostrar el contenedor de detalles de la noticia (si ya estaba visible, no hay cambio)
            newsDetailContainer.classList.remove('hidden');

            // Desplazarse al contenedor de detalles de la noticia
            window.scrollTo({ top: newsDetailContainer.offsetTop - header.offsetHeight, behavior: 'smooth' });
        }
    }

    // Función para ocultar la vista detallada y volver a la matriz de tarjetas
    function hideNewsDetail() {
        // Ocultar el contenedor de detalles de la noticia
        newsDetailContainer.classList.add('hidden');

        // Restaurar la tarjeta de noticia previamente oculta
        if (selectedCardDomElement) {
            selectedCardDomElement.classList.remove('hidden');
            selectedCardDomElement = null; // Limpiar la referencia
        }

        // Mover newsDetailContainer de nuevo a su posición original (al final de la sección)
        noticiasSection.appendChild(newsDetailContainer);


        // Desplazarse de vuelta a la parte superior de la sección de noticias
        window.scrollTo({ top: noticiasSection.offsetTop - header.offsetHeight, behavior: 'smooth' });
    }

    // Asignar listeners a cada card para mostrar el detalle
    cardItems.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que el enlace # recargue la página o salte
            const newsId = this.dataset.newsId; // Obtiene el ID de la noticia de los datos
            showNewsDetail(newsId);
        });
    });

    // Asignar listener al botón para ocultar el detalle
    closeDetailBtn.addEventListener('click', hideNewsDetail);

//========================= CUARENTENA ====================================================
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
    
    // Galería de imagen: modal
    document.addEventListener("DOMContentLoaded", function() {
        const modal = document.getElementById("imgModal");
        const modalImg = document.getElementById("imgModalContent");
        const closeBtn = document.querySelector(".modal .close");

        document.querySelectorAll(".gallery-grid img").forEach(img => {
            img.addEventListener("click", () => {
                modal.style.display = "block";
                modalImg.src = img.src;
            });
        });

        closeBtn.onclick = () => {
            modal.style.display = "none";
        };

        window.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        };
    });
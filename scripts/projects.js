// ===============================
// GESTOR DE PROYECTOS AVANZADO
// ===============================

class ProjectsManager {
    constructor() {
        this.projects = []; // Array de proyectos
        this.currentFilter = 'all'; // Filtro actual
        this.modal = null; // Modal de proyecto
        this.currentProject = null; // Proyecto actual en modal
        this.currentSlide = 0; // Slide actual del carrusel

        this.init(); // Inicializar sistema
    }

    // Inicializar gestor de proyectos
    init() {
        this.loadProjectsData(); // Cargar datos de proyectos
        this.setupFilters(); // Configurar filtros
        this.setupModal(); // Configurar modal
        this.setupProjectCards(); // Configurar tarjetas de proyecto
    }

    // Cargar datos de proyectos
    loadProjectsData() {
        this.projects = [
            {
                id: 'proyecto-1',
                title: 'Sistema de Gestión Bancario',
                images: [
                    './img/projects/banco-2.jpg',
                    './img/projects/banco-3.jpg',
                    './img/projects/banco-4.jpg'
                ],
                links: {
                    github: '"https://github.com/lunilop/banking_management_system"',
                    // demo: '#',
                    detail: 'pages/projects-detail.html#proyecto-1'
                },

            },
            {
                id: 'proyecto-2',
                title: 'Asignación de Turnos eCommerce',
                images: [
                    './img/projects/ecommerce-2.png',
                    './img/projects/ecommerce-3.png',
                    './img/projects/ecommerce-4.png'
                ],
                links: {
                    github: 'https://github.com/lunilop/ecommerce_turn_system"',
                    // demo: '#',
                    detail: 'pages/projects-detail.html#proyecto-2'
                },

            },
            {
                id: 'proyecto-3',
                title: 'Selección del Mundial 2022',
                images: [
                    './img/projects/mundial-2.png',
                    './img/projects/mundial-3.png',
                    './img/projects/mundial-4.png'
                ],
                links: {
                    github: 'https://github.com/lunilop/Mundial_2022"',
                    demo: 'https://amazing-gecko-3114c5.netlify.app/',
                    detail: 'pages/projects-detail.html#proyecto-3'
                },

            }
        ];
    }

    // Configurar filtros de proyectos
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Añadir clase active al botón clickeado
                button.classList.add('active');

                // Obtener filtro seleccionado
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }

    // Filtrar proyectos con animación
    filterProjects(filter) {
        this.currentFilter = filter;
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category').split(' ');
            const shouldShow = filter === 'all' || categories.includes(filter);

            if (shouldShow) {
                // Mostrar tarjeta con animación
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            } else {
                // Ocultar tarjeta con animación
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';

                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Configurar modal de proyecto
    setupModal() {
        this.modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = this.modal.querySelector('.modal-overlay');

        // Cerrar modal
        modalClose.addEventListener('click', () => this.closeModal());
        modalOverlay.addEventListener('click', () => this.closeModal());

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Configurar carrusel
        this.setupCarousel();

        // Configurar código colapsable
    }

    // Configurar tarjetas de proyecto
    setupProjectCards() {
        const modalButtons = document.querySelectorAll('.project-modal-btn');

        modalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project');
                this.openModal(projectId);
            });
        });
    }

    // Abrir modal con proyecto específico
    openModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.currentProject = project;
        this.populateModal(project);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    // Cerrar modal
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
        this.currentProject = null;
        this.currentSlide = 0;
    }

    // Poblar modal con datos del proyecto
    populateModal(project) {
        // Título
        document.getElementById('modalTitle').textContent = project.title;

        // Enlaces
        const projectButtons = document.getElementById('modalProjectButtons');
        projectButtons.innerHTML = `
            <a href="${project.links.github}" class="btn btn-secondary" target="_blank">
                <i data-lucide="github"></i>
                GitHub
            </a>
        `;
        if (project.id === 'proyecto-3') {
            projectButtons.innerHTML = `
            <a href="${project.links.github}" class="btn btn-secondary" target="_blank">
                <i data-lucide="github"></i>
                GitHub
            </a>
            <a href="${project.links.demo}" class="btn btn-primary" target="_blank">
                <i data-lucide="external-link"></i>
                Demo
            </a>
        `;
        }

        // Carrusel de imágenes
        this.populateCarousel(project.images);

        // Reinicializar iconos
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // Poblar carrusel de imágenes
    populateCarousel(images) {
        const slidesContainer = document.getElementById('carouselSlides');
        const indicatorsContainer = document.getElementById('carouselIndicators');

        // Limpiar contenido anterior
        slidesContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        // Crear slides
        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `<img src="${image}" alt="Captura ${index + 1}">`;
            slidesContainer.appendChild(slide);

            // Crear indicador
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        this.currentSlide = 0;
    }

    // Configurar carrusel
    setupCarousel() {
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');

        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        // Soporte para swipe en móvil
        let startX = 0;
        let endX = 0;

        const carousel = document.querySelector('.carousel-container');

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) { // Mínimo 50px de swipe
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    // Ir al slide anterior
    previousSlide() {
        if (!this.currentProject) return;

        const totalSlides = this.currentProject.images.length;
        this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
        this.updateCarousel();
    }

    // Ir al siguiente slide
    nextSlide() {
        if (!this.currentProject) return;

        const totalSlides = this.currentProject.images.length;
        this.currentSlide = (this.currentSlide + 1) % totalSlides;
        this.updateCarousel();
    }

    // Ir a slide específico
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    // Actualizar carrusel
    updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    // Configurar toggle de código

}

// Inicializar gestor de proyectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.projectsManager = new ProjectsManager();
});
// =======================================
// NAVEGACIÓN PARA PÁGINAS DE DETALLE
// =======================================

class DetailNavigation {
    constructor() {
        this.sidebarLinks = []; // Enlaces de la barra lateral
        this.sections = []; // Secciones de la página
        this.currentSection = ''; // Sección actualmente visible
        
        this.init(); // Inicializar navegación
    }
    
    // Inicializar sistema de navegación de detalle
    init() {
        this.cacheElements(); // Obtener elementos del DOM
        this.setupSidebarNavigation(); // Configurar navegación lateral
        this.setupScrollSpy(); // Configurar detección de secciones
        this.setupSmoothScroll(); // Configurar scroll suave
    }
    
    // Cachear elementos del DOM
    cacheElements() {
        this.sidebarLinks = document.querySelectorAll('.sidebar-link');
        this.sections = document.querySelectorAll('.detail-section');
    }
    
    // Configurar navegación de la barra lateral
    setupSidebarNavigation() {
        this.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevenir comportamiento por defecto
                
                const targetId = link.getAttribute('href'); // Obtener ID de destino
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calcular posición considerando altura del header
                    const headerHeight = 70; // Altura fija del header
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    // Scroll suave hacia la sección
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Sistema de detección de sección activa (scroll spy)
    setupScrollSpy() {
        const observerOptions = {
            root: null, // Viewport como root
            rootMargin: '-20% 0px -70% 0px', // Margenes para detección
            threshold: 0 // Activar apenas sea visible
        };
        
        // Crear observer para detectar secciones visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveSidebarLink(entry.target.id);
                }
            });
        }, observerOptions);
        
        // Observar todas las secciones
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Marcar enlace de la barra lateral como activo
    setActiveSidebarLink(sectionId) {
        // Remover clase active de todos los enlaces
        this.sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Añadir clase active al enlace correspondiente
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            this.currentSection = sectionId;
        }
    }
    
    // Configurar scroll suave
    setupSmoothScroll() {
        // Ya implementado en setupSidebarNavigation
        // Esta función puede expandirse para más funcionalidades
    }
    
    // Obtener sección activa actual
    getCurrentSection() {
        return this.currentSection;
    }
    
    // Navegar programáticamente a una sección
    navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerHeight = 70;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Inicializar navegación de detalle cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.detailNavigation = new DetailNavigation();
});
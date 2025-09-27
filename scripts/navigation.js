// ================================
// SISTEMA DE NAVEGACIÓN Y SCROLL
// ================================

class NavigationManager {
    constructor() {
        this.navLinks = []; // Enlaces de navegación
        this.sections = []; // Secciones de la página
        this.header = null; // Header principal
        this.mobileMenuBtn = null; // Botón menú móvil
        this.navMenu = null; // Menú de navegación
        this.isMenuOpen = false; // Estado del menú móvil
        
        this.init(); // Inicializar navegación
    }
    
    // Inicializar sistema de navegación
    init() {
        this.cacheElements(); // Obtener elementos del DOM
        this.setupSmoothScroll(); // Configurar scroll suave
        this.setupScrollSpy(); // Configurar detección de secciones activas
        this.setupMobileMenu(); // Configurar menú móvil
        this.setupHeaderScroll(); // Configurar efectos del header al scroll
    }
    
    // Cachear elementos del DOM para mejor rendimiento
    cacheElements() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.header = document.getElementById('header');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navMenu = document.getElementById('navMenu');
    }
    
    // Configurar scroll suave hacia secciones
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevenir comportamiento por defecto
                
                const targetId = link.getAttribute('href'); // Obtener ID de destino
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calcular posición considerando altura del header
                    const headerHeight = this.header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    // Scroll suave hacia la sección
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    if (this.isMenuOpen) {
                        this.toggleMobileMenu();
                    }
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
                    this.setActiveNavLink(entry.target.id);
                }
            });
        }, observerOptions);
        
        // Observar todas las secciones
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Marcar enlace de navegación como activo
    setActiveNavLink(sectionId) {
        // Remover clase active de todos los enlaces
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Añadir clase active al enlace correspondiente
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Configurar menú móvil
    setupMobileMenu() {
        if (!this.mobileMenuBtn || !this.navMenu) return;
        
        // Evento click del botón hamburguesa
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.mobileMenuBtn.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });
        
        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        });
    }
    
    // Alternar estado del menú móvil
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        // Añadir/remover clases CSS
        if (this.isMenuOpen) {
            this.navMenu.classList.add('mobile-menu-open');
            this.mobileMenuBtn.classList.add('menu-open');
            
            // Cambiar icono a X
            const icon = this.mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'x');
                lucide.createIcons();
            }
        } else {
            this.navMenu.classList.remove('mobile-menu-open');
            this.mobileMenuBtn.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
            
            // Cambiar icono de vuelta a hamburguesa
            const icon = this.mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    }
    
    // Configurar efectos del header al hacer scroll
    setupHeaderScroll() {
        let lastScrollY = window.scrollY;
        let isHeaderHidden = false;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY);
            
            // Solo procesar si el scroll es significativo (evita micro-movimientos)
            if (scrollDifference < 5) return;
            
            // Agregar/quitar clase de scroll
            if (currentScrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            // Ocultar/mostrar header según dirección del scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                // Scrolling hacia abajo - ocultar header
                if (!isHeaderHidden) {
                    this.header.classList.add('header-hidden');
                    isHeaderHidden = true;
                }
            } else {
                // Scrolling hacia arriba - mostrar header
                if (isHeaderHidden) {
                    this.header.classList.remove('header-hidden');
                    isHeaderHidden = false;
                }
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Obtener sección activa actual
    getCurrentSection() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPos = window.scrollY + this.header.offsetHeight + 50;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.id;
            }
        });
        
        return current;
    }
    
    // Navegar programáticamente a una sección
    navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerHeight = this.header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Estilos adicionales para menú móvil (se añaden dinámicamente)
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: absolute;
        top: 70px; /* debajo del header */
        left: 70%;
        transform: translateX(-50%) translateY(-20px);
        width: 90%; /* más pequeño que el 100% */
        max-width: 260px; /* límite para que parezca tarjeta */
        background: var(--bg-menu);
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        padding: 12px 0;
        z-index: 1000;
    }

    .nav-menu.mobile-menu-open {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
        visibility: visible;
    }

    .nav-menu li {
        list-style: none;
        margin: 4px 12px;
    }

    .nav-link {
        display: block;
        padding: 10px 14px;
        font-size: 16px;
        font-weight: 500;
        color: var(--text-primar);
        border-radius: 8px;
        transition: background 0.3s, color 0.3s;
    }

    .nav-link:hover {
        background: #f8f8f8;
    }

    .nav-link.active {
        background: #f06292;
        color: var(--text-primar);
        font-weight: 600;
    }
}

`;

// Añadir estilos móviles al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Inicializar navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});
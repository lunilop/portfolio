// ============================================================================
// CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
// ============================================================================

// Elementos del DOM que se usan frecuentemente
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const customCursor = document.getElementById('customCursor');
const scrollTopBtn = document.getElementById('scrollTop');
const scrollBottomBtn = document.getElementById('scrollBottom');

// Configuración inicial del tema y idioma desde localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
const savedLang = localStorage.getItem('language') || 'es';

// Aplicar configuraciones guardadas al cargar la página
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon();
updateLanguage(savedLang);

// ============================================================================
// GESTIÓN DE TEMA OSCURO/CLARO
// ============================================================================

// Función para cambiar entre tema oscuro y claro
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Aplicar nuevo tema y guardarlo en localStorage
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Actualizar el ícono del botón de tema según el tema actual
function updateThemeIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    const icon = themeToggle.querySelector('i');
    
    // Cambiar ícono: luna para tema claro, sol para tema oscuro
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ============================================================================
// GESTIÓN DE IDIOMAS (ESPAÑOL/INGLÉS)
// ============================================================================

// Cambiar idioma al hacer clic en el botón
langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'es' ? 'en' : 'es';
    updateLanguage(newLang);
});

// Función para actualizar todos los textos según el idioma seleccionado
function updateLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    
    // Actualizar texto del botón de idioma
    const langText = langToggle.querySelector('.lang-text');
    langText.textContent = lang === 'es' ? 'EN' : 'ES';
    
    // Buscar todos los elementos con atributos de idioma y actualizar su contenido
    const elements = document.querySelectorAll('[data-es][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Manejar diferentes tipos de elementos (input, textarea, otros)
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
}

// ============================================================================
// CURSOR PERSONALIZADO CON EFECTO DE SOMBRA
// ============================================================================

// Seguir el movimiento del mouse con el cursor personalizado
document.addEventListener('mousemove', (e) => {
    // Actualizar posición del cursor personalizado
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});

// Cambiar apariencia del cursor al hacer hover sobre elementos interactivos
document.addEventListener('mouseover', (e) => {
    // Lista de elementos que activan el efecto hover del cursor
    const hoverElements = ['a', 'button', '.project-card', '.tech-tag', '.contact-link'];
    
    // Verificar si el elemento actual coincide con algún selector
    const isHoverable = hoverElements.some(selector => 
        e.target.matches(selector) || e.target.closest(selector)
    );
    
    // Aplicar o quitar clase hover según corresponda
    if (isHoverable) {
        customCursor.classList.add('hover');
    } else {
        customCursor.classList.remove('hover');
    }
});

// ============================================================================
// NAVEGACIÓN MÓVIL (MENÚ HAMBURGUESA)
// ============================================================================

// Toggle del menú móvil
hamburger.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// ============================================================================
// NAVEGACIÓN SUAVE Y EFECTOS DE SCROLL
// ============================================================================

// Scroll suave para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Calcular posición considerando la altura del navbar fijo
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Cerrar menú móvil si está abierto
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================================================
// NAVEGACIÓN ACTIVA Y EFECTOS DE NAVBAR
// ============================================================================

// Actualizar enlace activo en la navegación según la sección visible
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        // Determinar qué sección está actualmente visible
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Actualizar clases activas en los enlaces de navegación
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Cambiar fondo del navbar al hacer scroll
function updateNavbarBackground() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================================================
// BOTONES DE NAVEGACIÓN FLOTANTES
// ============================================================================

// Funcionalidad de los botones de scroll
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollBottomBtn.addEventListener('click', () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});

// Mostrar/ocultar botones según la posición del scroll
function updateScrollButtons() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    
    // Mostrar botón "ir arriba" después de hacer scroll
    if (scrollTop > 300) {
        scrollTopBtn.classList.remove('hidden');
    } else {
        scrollTopBtn.classList.add('hidden');
    }
    
    // Ocultar botón "ir abajo" cuando se está cerca del final
    if (scrollTop + windowHeight >= documentHeight - 100) {
        scrollBottomBtn.classList.add('hidden');
    } else {
        scrollBottomBtn.classList.remove('hidden');
    }
}

// ============================================================================
// ANIMACIONES DE SCROLL Y APARICIÓN DE ELEMENTOS
// ============================================================================

// Función principal para manejar animaciones al hacer scroll
function animateOnScroll() {
    // Elementos que se animan al entrar en viewport
    const elements = document.querySelectorAll('.section-animate, .stagger-item, .about-card, .project-card, .competency-card');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Activar animación cuando el elemento está visible
        if (elementTop < windowHeight - 100 && !element.classList.contains('animate-in')) {
            // Agregar delay escalonado para elementos de lista
            if (element.classList.contains('stagger-item')) {
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 100); // 100ms de delay entre elementos
            } else {
                element.classList.add('animate-in');
            }
        }
    });
}

// ============================================================================
// ANIMACIÓN DE ESCRITURA PARA EL TÍTULO PRINCIPAL
// ============================================================================

// Función para crear efecto de máquina de escribir
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            // Remover cursor parpadeante al terminar
            element.classList.add('typing-complete');
        }
    }
    
    typing();
}

// ============================================================================
// FORMULARIO DE CONTACTO
// ============================================================================

// Manejar envío del formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simular envío con loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular respuesta del servidor
        setTimeout(() => {
            showNotification('¡Mensaje enviado exitosamente!', 'success');
            this.reset();
            
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ============================================================================
// SISTEMA DE NOTIFICACIONES
// ============================================================================

// Mostrar notificaciones temporales
function showNotification(message, type = 'info') {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        background: type === 'success' ? 'var(--success-color)' : 'var(--primary-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease-out'
    });
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Obtener ícono según el tipo de notificación
function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// ============================================================================
// EVENT LISTENERS PRINCIPALES
// ============================================================================

// Manejar eventos de scroll con optimización
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
    updateNavbarBackground();
    animateOnScroll();
    updateScrollButtons();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ============================================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animación de escritura para el título
    const nameElement = document.querySelector('.name-highlight');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 80);
        }, 1000);
    }
    
    // Marcar secciones para animación
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-animate');
    });
    
    // Ejecutar animaciones iniciales
    setTimeout(() => {
        animateOnScroll();
        updateScrollButtons();
    }, 500);
    
    // Configurar observer para animaciones más precisas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Manejar animaciones especiales para skills
                if (entry.target.classList.contains('skills-category')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animateElements = document.querySelectorAll('.section-animate, .skills-category');
    animateElements.forEach(el => observer.observe(el));
    
    // Tracking de descarga de CV
    const cvLinks = document.querySelectorAll('a[download]');
    cvLinks.forEach(link => {
        link.addEventListener('click', () => {
            showNotification('¡CV descargado exitosamente!', 'success');
            console.log('CV downloaded'); // Para analytics
        });
    });
    
    // Efectos de hover para elementos interactivos
    const interactiveElements = document.querySelectorAll('.btn, .project-card, .contact-link, .tech-tag');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Vibración sutil en móviles
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
    
    // Soporte para navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});

// ============================================================================
// UTILIDADES Y FUNCIONES AUXILIARES
// ============================================================================

// Función de debounce para optimizar rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================================================
// PANTALLA DE CARGA
// ============================================================================

// Mostrar pantalla de carga al iniciar
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="logo-hex loading-spin"></div>
            <p>Cargando Portfolio...</p>
        </div>
    `;
    
    // Estilos de la pantalla de carga
    Object.assign(loadingScreen.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'var(--bg-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        transition: 'opacity 0.5s ease-out'
    });
    
    document.body.appendChild(loadingScreen);
    
    // Remover pantalla de carga después de 1.5 segundos
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// ============================================================================
// ESTILOS ADICIONALES INYECTADOS VÍA JAVASCRIPT
// ============================================================================

// Agregar estilos CSS adicionales dinámicamente
const additionalStyles = `
/* Animaciones de entrada suaves */
.animate-in {
    animation: slideInUp 0.8s ease-out forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Animación de rotación para loading */
.loading-spin {
    animation: spin 2s linear infinite;
}

/* Estilos para navegación por teclado */
.keyboard-navigation *:focus {
    outline: 2px solid var(--primary-color) !important;
    outline-offset: 2px !important;
}

/* Menú móvil responsive */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: var(--card-color);
        flex-direction: column;
        padding: var(--spacing-lg);
        box-shadow: var(--shadow-lg);
        transform: translateY(-100%);
        transition: transform var(--transition-normal);
        border-bottom: 1px solid var(--border-color);
    }
    
    .nav-menu.active {
        transform: translateY(0);
    }
    
    .nav-link {
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        text-align: center;
        border-bottom: 1px solid var(--border-color);
    }
    
    .nav-link:last-child {
        border-bottom: none;
    }
    
    /* Animación del menú hamburguesa */
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
`;

// Inyectar estilos adicionales en el documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
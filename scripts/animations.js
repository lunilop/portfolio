// ===============================
// SISTEMA DE ANIMACIONES Y EFECTOS
// ===============================

class AnimationManager {
    constructor() {
        this.observedElements = new Map(); // Elementos observados para animaciones
        this.animationObserver = null; // Observer para animaciones de scroll
        this.isReducedMotion = false; // Respeta preferencias de accesibilidad
        
        this.init(); // Inicializar sistema
    }
    
    // Inicializar sistema de animaciones
    init() {
        this.checkMotionPreference(); // Verificar preferencias de movimiento
        this.setupScrollAnimations(); // Configurar animaciones de scroll
        this.setupHoverEffects(); // Configurar efectos hover
        this.setupLoadAnimations(); // Configurar animaciones de carga
    }
    
    // Verificar preferencias de movimiento del usuario
    checkMotionPreference() {
        // Respetar preferencia "prefers-reduced-motion"
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Escuchar cambios en la preferencia
        window.matchMedia('(prefers-reduced-motion: reduce)').addListener((e) => {
            this.isReducedMotion = e.matches;
            this.updateAnimations();
        });
    }
    
    // Configurar animaciones basadas en scroll
    setupScrollAnimations() {
        if (this.isReducedMotion) return; // No animar si está deshabilitado
        
        // Opciones del observer
        const observerOptions = {
            root: null, // Usar viewport como root
            rootMargin: '0px 0px -10% 0px', // Trigger antes de que sea visible
            threshold: 0.1 // Activar cuando 10% sea visible
        };
        
        // Crear intersection observer
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar elementos que deben animarse
        this.observeAnimatableElements();
    }
    
    // Encontrar y observar elementos animables
    observeAnimatableElements() {
        // Selectores de elementos que se pueden animar
        const animatableSelectors = [
            '.project-card',
            '.skill-category',
            '.education-card',
            '.experience-card',
            '.specialty-card',
            '.course-card',
            '.soft-skill-item',
            '.contact-link',
            '.hero-text',
            '.hero-avatar',
            '.section-title'
        ];
        
        animatableSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                // Añadir delay escalonado
                element.style.transitionDelay = `${index * 0.1}s`;
                
                // Marcar como no animado inicialmente
                element.classList.add('animate-on-scroll');
                
                // Observar elemento
                this.animationObserver.observe(element);
            });
        });
    }
    
    // Animar elemento específico
    animateElement(element) {
        if (this.isReducedMotion) {
            element.classList.add('animate-in');
            return;
        }
        
        // Añadir clase de animación
        element.classList.add('animate-in');
        
        // Efecto de typing para títulos
        if (element.classList.contains('section-title')) {
            this.typewriterEffect(element);
        }
        
        // Efecto de counter para números
        if (element.dataset.counter) {
            this.counterEffect(element);
        }
    }
    
    // Efecto de escritura (typing) para elementos de texto
    typewriterEffect(element) {
        const text = element.textContent;
        const speed = 50; // Velocidad de escritura en ms
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--text-accent)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remover cursor después de un tiempo
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }, speed);
    }
    
    // Efecto de contador animado para números
    counterEffect(element) {
        const finalNumber = parseInt(element.dataset.counter);
        const duration = 2000; // 2 segundos
        const increment = finalNumber / (duration / 16); // 60fps
        let current = 0;
        
        const countInterval = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                element.textContent = finalNumber;
                clearInterval(countInterval);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Configurar efectos hover avanzados
    setupHoverEffects() {
        if (this.isReducedMotion) return;
        
        // Efecto de seguimiento de mouse en tarjetas
        this.setupCardHoverEffects();
        
        // Efecto de brillo en botones
        this.setupButtonHoverEffects();
        
        // Efecto de rotación en iconos
        this.setupIconHoverEffects();
    }
    
    // Efectos hover para tarjetas
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .education-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calcular rotación basada en posición del mouse
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                // Aplicar transformación 3D sutil
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                // Resetear transformación
                card.style.transform = 'none';
            });
        });
    }
    
    // Efectos hover para botones
    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                // Efecto de ondas
                this.createRippleEffect(button);
            });
        });
    }
    
    // Crear efecto de ondas (ripple)
    createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Posicionar ripple
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        // Añadir al botón
        element.appendChild(ripple);
        
        // Animar
        setTimeout(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(2)';
            ripple.style.opacity = '0';
        }, 10);
        
        // Limpiar después de la animación
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Efectos hover para iconos
    setupIconHoverEffects() {
        const icons = document.querySelectorAll('.category-icon, .specialty-icon, .education-icon');
        
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    icon.style.transform = 'rotate(360deg) scale(1.1)';
                }
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'rotate(0deg) scale(1)';
            });
        });
    }
    
    // Configurar animaciones de carga inicial
    setupLoadAnimations() {
        if (this.isReducedMotion) return;
        
        // Animar header al cargar
        const header = document.getElementById('header');
        if (header) {
            header.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                header.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animar hero section
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }
    
    // Actualizar animaciones según preferencias
    updateAnimations() {
        if (this.isReducedMotion) {
            // Desactivar todas las animaciones
            document.body.classList.add('reduced-motion');
        } else {
            // Reactivar animaciones
            document.body.classList.remove('reduced-motion');
        }
    }
    
    // Método público para animar elementos específicos
    animateElementById(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            this.animateElement(element);
        }
    }
    
    // Método público para crear animación personalizada
    createCustomAnimation(element, keyframes, options = {}) {
        if (this.isReducedMotion) return;
        
        const defaultOptions = {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        };
        
        const animationOptions = { ...defaultOptions, ...options };
        
        return element.animate(keyframes, animationOptions);
    }
}

// Estilos CSS para animaciones
const animationStyles = `
    /* Animaciones base */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Efecto ripple para botones */
    .ripple-effect {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transition: transform 0.6s ease-out, opacity 0.6s ease-out;
    }
    
    /* Animaciones reducidas para accesibilidad */
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    /* Transiciones suaves para elementos interactivos */
    .category-icon,
    .specialty-icon,
    .education-icon {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Mejoras de rendimiento */
    .project-card,
    .skill-category,
    .education-card {
        will-change: transform;
        backface-visibility: hidden;
    }
    
    /* Animación de carga del hero */
    .hero-title,
    .hero-subtitle,
    .hero-description {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .hero-subtitle {
        animation-delay: 0.2s;
    }
    
    .hero-description {
        animation-delay: 0.4s;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Indicador de scroll */
    .scroll-indicator {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: var(--gradient-primary);
        z-index: 1000;
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }
`;

// Añadir estilos de animación al documento
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

// Inicializar sistema de animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});
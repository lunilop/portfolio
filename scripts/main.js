// ========================
// SCRIPT PRINCIPAL (MAIN)
// ========================

class PortfolioApp {
    constructor() {
        this.isInitialized = false; // Estado de inicialización
        this.modules = {}; // Módulos cargados
        this.settings = { // Configuraciones globales
            debug: false, // Modo debug
            version: '1.0.0', // Versión del portfolio
            author: 'Luna' // Autor del portfolio
        };

        this.init(); // Inicializar aplicación
    }

    // Inicializar aplicación principal
    init() {
        if (this.isInitialized) return; // Evitar doble inicialización

        console.log('🚀 Inicializando Portfolio App v' + this.settings.version);

        this.waitForDOMAndModules(); // Esperar DOM y módulos
    }

    // Esperar a que el DOM y los módulos estén listos
    waitForDOMAndModules() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMReady();
            });
        } else {
            this.onDOMReady();
        }
    }

    // Ejecutar cuando el DOM esté listo
    onDOMReady() {
        console.log('📄 DOM listo, inicializando módulos...');

        // Inicializar Lucide Icons (iconos)
        this.initLucideIcons();

        // Esperar a que todos los módulos se carguen
        this.waitForModules();
    }

    // Inicializar iconos de Lucide
    initLucideIcons() {
        if (window.lucide) {
            lucide.createIcons(); // Crear todos los iconos
            console.log('✅ Iconos Lucide inicializados');
        } else {
            console.warn('⚠️ Lucide no encontrado, reintentando...');
            setTimeout(() => this.initLucideIcons(), 100);
        }
    }

    // Esperar a que todos los módulos necesarios se carguen
    waitForModules() {
        const requiredModules = [
            'translationManager',
            'themeManager',
            'particleSystem',
            'navigationManager',
            'animationManager',
            'formsManager'
        ];

        const checkModules = () => {
            const loadedModules = requiredModules.filter(moduleName =>
                window[moduleName] !== undefined
            );

            if (loadedModules.length === requiredModules.length) {
                this.onAllModulesReady();
            } else {
                const pendingModules = requiredModules.filter(moduleName =>
                    window[moduleName] === undefined
                );
                console.log('⏳ Esperando módulos:', pendingModules.join(', '));
                setTimeout(checkModules, 100); // Reintentar en 100ms
            }
        };

        checkModules();
    }

    // Ejecutar cuando todos los módulos estén listos
    onAllModulesReady() {
        console.log('🎉 Todos los módulos cargados correctamente');

        // Guardar referencias a los módulos
        this.modules = {
            translation: window.translationManager,
            theme: window.themeManager,
            particles: window.particleSystem,
            navigation: window.navigationManager,
            animation: window.animationManager,
            forms: window.formsManager
        };

        // Configurar integración entre módulos
        this.setupModuleIntegration();

        // Configurar eventos globales
        this.setupGlobalEvents();

        // Configurar botones de scroll
        this.setupScrollButtons();

        // Finalizar inicialización
        this.finishInitialization();
    }

    // Configurar integración entre módulos
    setupModuleIntegration() {
        // Actualizar partículas cuando cambie el tema
        const originalToggleTheme = this.modules.theme.toggleTheme.bind(this.modules.theme);
        this.modules.theme.toggleTheme = () => {
            originalToggleTheme(); // Ejecutar función original

            // Actualizar partículas después del cambio de tema
            setTimeout(() => {
                if (this.modules.particles.updateTheme) {
                    this.modules.particles.updateTheme();
                }
            }, 100);

            console.log('🎨 Tema cambiado y partículas actualizadas');
        };

        // Reinicializar iconos cuando cambie el idioma
        const originalSwitchLanguage = this.modules.translation.switchLanguage.bind(this.modules.translation);
        this.modules.translation.switchLanguage = () => {
            originalSwitchLanguage(); // Ejecutar función original

            // Reinicializar iconos después del cambio
            setTimeout(() => {
                if (window.lucide) {
                    lucide.createIcons();
                }
            }, 100);

            console.log('🌍 Idioma cambiado e iconos actualizados');
        };
    }

    // Configurar eventos globales de la aplicación
    setupGlobalEvents() {
        // Manejo de errores globales
        window.addEventListener('error', (error) => {
            console.error('💥 Error global:', error.error);
            this.handleGlobalError(error);
        });

        // Manejo de errores de promesas no capturadas
        window.addEventListener('unhandledrejection', (error) => {
            console.error('💥 Promise rechazada:', error.reason);
            this.handleGlobalError(error);
        });

        // Evento de cambio de tamaño de ventana
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleWindowResize();
            }, 250); // Debounce de 250ms
        });

        // Evento de cambio de visibilidad de la página
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Navegación con teclado (accesibilidad)
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Detección de modo offline/online
        window.addEventListener('online', () => {
            console.log('🌐 Conexión restaurada');
            this.handleConnectionChange(true);
        });

        window.addEventListener('offline', () => {
            console.log('📡 Sin conexión');
            this.handleConnectionChange(false);
        });
    }

    // Manejar errores globales
    handleGlobalError(error) {
        if (this.settings.debug) {
            console.error('Error details:', error);
        }

        // En producción, podrías enviar esto a un servicio de logging
        // como Sentry, LogRocket, etc.
    }

    // Manejar cambio de tamaño de ventana
    handleWindowResize() {
        console.log('📏 Ventana redimensionada');

        // Notificar a módulos que necesiten saber del cambio de tamaño
        if (this.modules.particles && this.modules.particles.resizeCanvas) {
            this.modules.particles.resizeCanvas();
        }

        // Reinicializar iconos por si se cambió el viewport
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // Manejar cambio de visibilidad de la página
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('👁️ Página oculta - pausando animaciones');
            // Pausar animaciones costosas
            if (this.modules.particles && this.modules.particles.stop) {
                this.modules.particles.stop();
            }
        } else {
            console.log('👁️ Página visible - reanudando animaciones');
            // Reanudar animaciones
            if (this.modules.particles && this.modules.particles.start) {
                this.modules.particles.start();
            }
        }
    }

    // Manejar navegación con teclado (accesibilidad)
    handleKeyboardNavigation(e) {
        // Navegación con Tab y Shift+Tab
        if (e.key === 'Tab') {
            // Añadir indicadores visuales para navegación por teclado
            document.body.classList.add('keyboard-navigation');
        }

        // Cerrar menú móvil con Escape
        if (e.key === 'Escape') {
            if (this.modules.navigation && this.modules.navigation.isMenuOpen) {
                this.modules.navigation.toggleMobileMenu();
            }
        }

        // Atajos de teclado
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'd': // Ctrl+D - cambiar tema
                    e.preventDefault();
                    if (this.modules.theme) {
                        this.modules.theme.toggleTheme();
                    }
                    break;
                case 'l': // Ctrl+L - cambiar idioma
                    e.preventDefault();
                    if (this.modules.translation) {
                        this.modules.translation.switchLanguage();
                    }
                    break;
            }
        }
    }

    // Manejar cambio de conexión
    handleConnectionChange(isOnline) {
        const statusIndicator = document.getElementById('connection-status');

        if (isOnline) {
            // Conexión restaurada
            if (statusIndicator) {
                statusIndicator.style.display = 'none';
            }
        } else {
            // Sin conexión - mostrar indicador
            if (!statusIndicator) {
                this.createConnectionIndicator();
            } else {
                statusIndicator.style.display = 'block';
            }
        }
    }

    // Crear indicador de conexión
    createConnectionIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'connection-status';
        indicator.className = 'connection-status';
        indicator.innerHTML = `
            <i data-lucide="wifi-off"></i>
            <span>Sin conexión a internet</span>
        `;

        document.body.appendChild(indicator);
        lucide.createIcons();
    }

    // Finalizar inicialización
    finishInitialization() {
        this.isInitialized = true;

        // Marcar la aplicación como completamente cargada
        document.body.classList.add('app-loaded');

        // Ocultar splash screen si existe
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) {
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                setTimeout(() => splashScreen.remove(), 300);
            }, 500);
        }

        // Log de éxito
        console.log('✅ Portfolio App inicializada correctamente');
        console.log('📊 Módulos disponibles:', Object.keys(this.modules));

        // Activar modo debug si está en desarrollo
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.enableDebugMode();
        }

        // Mostrar información en consola
        this.showConsoleInfo();
    }


    // Activar modo debug
    enableDebugMode() {
        this.settings.debug = true;
        console.log('🛠️ Modo debug activado');

        // Crear herramientas de debug
        window.portfolio = this; // Acceso global en consola
        window.debugPortfolio = {
            modules: this.modules,
            navigateToSection: (id) => this.modules.navigation.navigateToSection(id),
            toggleTheme: () => this.modules.theme.toggleTheme(),
            switchLanguage: () => this.modules.translation.switchLanguage(),
            animateElement: (id) => this.modules.animation.animateElementById(id),
            reloadParticles: () => {
                this.modules.particles.stop();
                setTimeout(() => this.modules.particles.start(), 100);
            }
        };

        console.log('🎮 Herramientas debug disponibles en window.debugPortfolio');
    }

    // Configurar botones de scroll arriba/abajo
    setupScrollButtons() {
        const scrollToTop = document.getElementById('scrollToTop');
        const scrollToBottom = document.getElementById('scrollToBottom');

        if (scrollToTop) {
            scrollToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        if (scrollToBottom) {
            scrollToBottom.addEventListener('click', () => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            });
        }
    }


    // Mostrar información en consola
    showConsoleInfo() {
        console.log(`
        🎨 Portfolio de ${this.settings.author}
        📝 Versión: ${this.settings.version}
        
        Atajos de teclado:
        • Ctrl/Cmd + D: Cambiar tema
        • Ctrl/Cmd + L: Cambiar idioma
        • Tab: Navegación por teclado
        • Escape: Cerrar menú móvil
        
        ¿Interesado en el código?
        Visita mi GitHub: github.com/tu-usuario
        `);
    }

    // Método público para obtener información del estado
    getStatus() {
        return {
            initialized: this.isInitialized,
            modules: Object.keys(this.modules),
            version: this.settings.version,
            theme: this.modules.theme?.getCurrentTheme?.(),
            language: this.modules.translation?.currentLanguage
        };
    }
}

// Estilos adicionales para elementos globales
const globalStyles = `
    /* Indicador de conexión */
    .connection-status {
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-error);
        color: white;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-md);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        z-index: 1000;
        font-size: 0.9rem;
        box-shadow: var(--shadow-lg);
        animation: slideDownBounce 0.5s ease-out;
    }
    
    /* Indicadores de navegación por teclado */
    .keyboard-navigation *:focus {
        outline: 2px solid var(--text-accent) !important;
        outline-offset: 2px;
    }
    
    /* Estado de aplicación cargada */
    .app-loaded {
        opacity: 1;
    }
    
    /* Splash screen básico */
    #splash-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    @keyframes slideDownBounce {
        0% {
            transform: translateX(-50%) translateY(-100%);
        }
        60% {
            transform: translateX(-50%) translateY(10px);
        }
        100% {
            transform: translateX(-50%) translateY(0);
        }
    }
`;

// Añadir estilos globales
const globalStyleSheet = document.createElement('style');
globalStyleSheet.textContent = globalStyles;
document.head.appendChild(globalStyleSheet);

// Inicializar aplicación principal
window.addEventListener('load', () => {
    window.portfolioApp = new PortfolioApp();
});

// Mostrar mensaje de bienvenida en consola
console.log('%c🎯 Portfolio de Luna Lopez | Desarrollador Backend', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado con mucho ❤️', 'color: #64748b; font-size: 14px;');
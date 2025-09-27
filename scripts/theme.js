// ============================
// SISTEMA DE TEMAS CLARO/OSCURO
// ============================

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark'; // Tema por defecto: oscuro
        this.init(); // Inicializar sistema de temas
    }
    
    // Inicializar sistema de temas
    init() {
        this.loadSavedTheme(); // Cargar tema guardado
        this.setupThemeToggle(); // Configurar botón de alternancia
        this.updateThemeIcon(); // Actualizar icono inicial
    }
    
    // Cargar tema guardado del localStorage
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('preferred-theme');
        if (savedTheme && savedTheme !== this.currentTheme) {
            this.currentTheme = savedTheme;
            this.applyTheme();
        }
    }
    
    // Aplicar tema al documento
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Guardar en localStorage
        localStorage.setItem('preferred-theme', this.currentTheme);
        
        // Actualizar icono del botón
        this.updateThemeIcon();
    }
    
    // Alternar entre temas
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        
        // Añadir animación suave al cambio
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Remover transición después del cambio
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    // Actualizar icono del botón según el tema actual
    updateThemeIcon() {
    const themeButton = document.getElementById('themeToggle');

    if (themeButton) {
        // Limpia contenido del botón y agrega el <i> con el nuevo icono
        themeButton.innerHTML = `<i data-lucide="${this.currentTheme === 'dark' ? 'sun' : 'moon'}"></i>`;

        // Reinicializar Lucide
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

    
    // Configurar evento del botón de alternancia
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            // Añadir título descriptivo
            themeToggle.title = 'Cambiar tema';
        }
    }
    
    // Obtener tema actual
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Detectar preferencia del sistema (opcional)
    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // Escuchar cambios en la preferencia del sistema
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener((e) => {
            // Solo cambiar si no hay preferencia guardada
            if (!localStorage.getItem('preferred-theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }
}

// Inicializar gestor de temas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});
// ========================================
// SISTEMA DE PARTÍCULAS ANIMADAS DE FONDO
// ========================================

class ParticleSystem {
    constructor() {
        this.canvas = null; // Referencia al canvas
        this.ctx = null; // Contexto de dibujo 2D
        this.particles = []; // Array de partículas
        this.particleCount = 50; // Número de partículas
        this.mouse = { x: 0, y: 0 }; // Posición del mouse
        this.isRunning = false; // Estado de la animación
        
        this.init(); // Inicializar sistema
    }
    
    // Inicializar sistema de partículas
    init() {
        this.setupCanvas(); // Configurar canvas
        this.createParticles(); // Crear partículas iniciales
        this.setupEventListeners(); // Configurar eventos
        this.start(); // Iniciar animación
    }
    
    // Configurar canvas de dibujo
    setupCanvas() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas(); // Ajustar tamaño inicial
        
        // Configurar propiedades del canvas
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Color por defecto
        this.ctx.globalCompositeOperation = 'lighter'; // Modo de mezcla
    }
    
    // Ajustar tamaño del canvas al viewport
    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    // Crear partículas iniciales
    createParticles() {
        this.particles = []; // Limpiar array
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    // Crear una partícula individual
    createParticle() {
        return {
            x: Math.random() * this.canvas.width, // Posición X aleatoria
            y: Math.random() * this.canvas.height, // Posición Y aleatoria
            vx: (Math.random() - 0.5) * 0.5, // Velocidad X (-0.25 a 0.25)
            vy: (Math.random() - 0.5) * 0.5, // Velocidad Y (-0.25 a 0.25)
            size: Math.random() * 3 + 1, // Tamaño (1 a 4)
            opacity: Math.random() * 0.5 + 0.2, // Opacidad (0.2 a 0.7)
            life: Math.random() * 100 + 50, // Tiempo de vida (50-150)
            maxLife: 100, // Vida máxima
            color: this.getParticleColor() // Color según tema
        };
    }
    
    // Obtener color de partícula según el tema actual
    getParticleColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'light') {
            // Colores para tema claro: rosa, naranja, violeta
            const colors = [
                'rgba(236, 72, 153, 0.6)', // Rosa
                'rgba(249, 115, 22, 0.6)', // Naranja
                'rgba(168, 85, 247, 0.6)', // Violeta
                'rgba(16, 185, 129, 0.6)'  // Verde
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        } else {
            // Colores para tema oscuro: azul, celeste, violeta
            const colors = [
                'rgba(102, 126, 234, 0.6)', // Violeta-azul
                'rgba(79, 172, 254, 0.6)', // Azul
                'rgba(0, 242, 254, 0.6)', // Celeste
                'rgba(67, 233, 123, 0.6)'  // Verde
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }
    
    // Actualizar partículas
    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Actualizar posición
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Actualizar vida
            particle.life--;
            
            // Calcular opacidad basada en vida restante
            particle.opacity = (particle.life / particle.maxLife) * 0.5 + 0.2;
            
            // Efecto de interacción con el mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Si está cerca del mouse, alejarse suavemente
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.01;
                particle.vy -= (dy / distance) * force * 0.01;
            }
            
            // Límites del canvas - rebote suave
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -0.8;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Regenerar partícula si murió
            if (particle.life <= 0) {
                this.particles[index] = this.createParticle();
            }
        });
    }
    
    // Dibujar partículas
    drawParticles() {
        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save(); // Guardar estado del contexto
            
            // Configurar estilo de la partícula
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            
            // Dibujar partícula como círculo
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Efecto de brillo sutil
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fill();
            
            this.ctx.restore(); // Restaurar estado del contexto
        });
        
        // Dibujar conexiones entre partículas cercanas
        this.drawConnections();
    }
    
    // Dibujar líneas de conexión entre partículas cercanas
    drawConnections() {
        const maxDistance = 120; // Distancia máxima para conexión
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Opacidad basada en distancia
                    const opacity = (maxDistance - distance) / maxDistance * 0.1;
                    
                    this.ctx.save();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }
    
    // Bucle de animación principal
    animate() {
        if (!this.isRunning) return;
        
        this.updateParticles(); // Actualizar posiciones y propiedades
        this.drawParticles(); // Dibujar en canvas
        
        // Solicitar siguiente frame
        requestAnimationFrame(() => this.animate());
    }
    
    // Iniciar animación
    start() {
        this.isRunning = true;
        this.animate();
    }
    
    // Detener animación
    stop() {
        this.isRunning = false;
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Redimensionar canvas al cambiar tamaño de ventana
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles(); // Recrear partículas para nueva área
        });
        
        // Seguir posición del mouse
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Actualizar colores al cambiar tema
        document.addEventListener('theme-changed', () => {
            this.particles.forEach(particle => {
                particle.color = this.getParticleColor();
            });
        });
    }
    
    // Actualizar tema (llamado desde theme.js)
    updateTheme() {
        this.particles.forEach(particle => {
            particle.color = this.getParticleColor();
        });
    }
}

// Inicializar sistema de partículas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.particleSystem = new ParticleSystem();
});
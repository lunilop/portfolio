// ===============================
// GESTIÓN DE FORMULARIOS
// ===============================

class FormsManager {
    constructor() {
        this.contactForm = null; // Formulario de contacto principal
        this.downloadButtons = []; // Botones de descarga de CV
        this.formValidator = new FormValidator(); // Validador de formularios

        this.init(); // Inicializar sistema
    }

    // Inicializar gestión de formularios
    init() {
        this.setupContactForm(); // Configurar formulario de contacto
        this.setupDownloadButtons(); // Configurar botones de descarga
        this.setupFormValidation(); // Configurar validación en tiempo real
    }

    // Configurar formulario de contacto
    setupContactForm() {
        this.contactForm = document.getElementById('contactForm');
        if (!this.contactForm) return;

        // Evento de envío del formulario
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir envío por defecto
            this.handleContactSubmission(e);
        });

        // Validación en tiempo real para cada campo
        const formFields = this.contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            // Validar al perder foco
            field.addEventListener('blur', () => {
                this.validateField(field);
            });

            // Limpiar errores al escribir
            field.addEventListener('input', () => {
                this.clearFieldError(field);
            });
        });
    }

    // Manejar envío del formulario de contacto
    async handleContactSubmission(event) {
        event.preventDefault();

        const formData = new FormData(this.contactForm);
        const formObject = Object.fromEntries(formData.entries());

        const now = new Date();
        const formattedTime = now.toLocaleString();

        // Validación básica
        if (!this.formValidator.validateForm(this.contactForm)) {
            this.showFormError('Por favor, corrige los errores antes de enviar.');
            return;
        }

        this.setFormLoading(true);

        try {
            await emailjs.send(
                'service_tijza5f',
                'template_zg4k0bh',
                {
                    name: formObject.name,
                    email: formObject.email,
                    subject: formObject.subject,
                    message: formObject.message,
                    time: formattedTime
                }
            );

            this.showFormSuccess('¡Mensaje enviado correctamente! Te responderé pronto.');
            this.contactForm.reset();

        } catch (error) {
            console.error('Error enviando formulario:', error);
            this.showFormError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        } finally {
            this.setFormLoading(false);
        }
    }

    // Validar campo individual
    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Validaciones por tipo de campo
        switch (fieldName) {
            case 'name':
                if (fieldValue.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres.';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    isValid = false;
                    errorMessage = 'Por favor, ingresa un email válido.';
                }
                break;

            case 'subject':
                if (!fieldValue) {
                    isValid = false;
                    errorMessage = 'Por favor selecciona un asunto.';
                }
                break;

            case 'message':
                if (fieldValue.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres.';
                }
                break;
        }

        // Mostrar/ocultar error
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    // Mostrar error en campo específico
    showFieldError(field, message) {
        // Remover error anterior si existe
        this.clearFieldError(field);

        // Crear elemento de error
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;

        // Añadir clases de error
        field.classList.add('field-invalid');

        // Insertar error después del campo
        field.parentNode.appendChild(errorElement);
    }

    // Limpiar error de campo
    clearFieldError(field) {
        // Remover clases de error
        field.classList.remove('field-invalid');

        // Remover mensaje de error
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Mostrar estado de carga del formulario
    setFormLoading(isLoading) {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('span');
        const buttonIcon = submitButton.querySelector('i, svg'); // busca <i> o <svg>

        if (isLoading) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            if (buttonText) buttonText.textContent = 'Enviando...';
            if (buttonIcon) {
                buttonIcon.setAttribute('data-lucide', 'loader');
                buttonIcon.style.animation = 'spin 1s linear infinite';
            }
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            if (buttonText) buttonText.textContent = 'Enviar Mensaje';
            if (buttonIcon) {
                buttonIcon.setAttribute('data-lucide', 'send');
                buttonIcon.style.animation = '';
            }
        }

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }


    // Mostrar mensaje de éxito
    showFormSuccess(message) {
        this.showFormMessage(message, 'success');
    }

    // Mostrar mensaje de error
    showFormError(message) {
        this.showFormMessage(message, 'error');
    }

    // Mostrar mensaje general del formulario
    showFormMessage(message, type) {
        // Remover mensajes anteriores
        const existingMessage = this.contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Crear elemento de mensaje
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;

        // Insertar al inicio del formulario
        this.contactForm.insertBefore(messageElement, this.contactForm.firstChild);

        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    // Configurar botones de descarga de CV
    setupDownloadButtons() {
        this.downloadButtons = document.querySelectorAll('#downloadCV, #downloadCVBtn');

        this.downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCVDownload();
            });
        });
    }

    // Manejar descarga de CV
    handleCVDownload() {
        const cvPath = './assets/Currículum_vitae_Luna_Lopez.pdf';
        const fileName = 'Currículum_vitae_Luna_Lopez.pdf';

        // Mostrar mensaje de descarga
        this.showDownloadMessage('Preparando descarga del CV...', 'warning');

        setTimeout(() => {
            // Crear un enlace oculto para forzar descarga
            const link = document.createElement('a');
            link.href = cvPath;
            link.download = fileName; // Forzar descarga con este nombre
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Mostrar mensaje de éxito
            this.showDownloadMessage('¡CV descargado correctamente!', 'success');
        }, 1200);
    }


    // Mostrar mensaje de descarga
    showDownloadMessage(message, type = 'info') {
        // Definir colores según el tipo
        let backgroundColor, borderColor;

        switch (type) {
            case 'success':
                backgroundColor = 'var(--color-success)';
                borderColor = 'var(--color-success)';
                break;
            case 'warning':
                backgroundColor = '#f59e0b';
                borderColor = '#f59e0b';
                break;
            default:
                backgroundColor = 'var(--text-accent)';
                borderColor = 'var(--text-accent)';
        }

        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `download-notification download-notification-${type}`;
        notification.style.background = backgroundColor;
        notification.style.borderLeft = `4px solid ${borderColor}`;
        notification.innerHTML = `
            <i data-lucide="${type === 'success' ? 'check-circle' : 'download'}"></i>
            <span>${message}</span>
        `;

        // Añadir al documento
        document.body.appendChild(notification);

        // Inicializar icono
        lucide.createIcons();

        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remover después de 2.5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2500);
    }

    // Configurar validación adicional
    setupFormValidation() {
        // Configurar CAPTCHA si es necesario
        // Configurar limitación de rate limiting
        // Añadir más validaciones personalizadas
    }
}

// Clase auxiliar para validación de formularios
class FormValidator {
    validateForm(form) {
        const fields = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;

        // Validaciones básicas
        if (field.required && !value) {
            return false;
        }

        // Validaciones específicas por tipo
        switch (type) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            default:
                return value.length > 0;
        }
    }
}

// Estilos para formularios y mensajes
const formStyles = `
    /* Estilos para mensajes de formulario */
    .form-message {
        padding: var(--spacing-sm);
        border-radius: var(--border-radius-sm);
        margin-bottom: var(--spacing-md);
        font-weight: var(--font-weight-semibold);
        animation: slideDown 0.3s ease-out;
    }
    
    .form-message-success {
        background: rgba(16, 185, 129, 0.1);
        color: var(--color-success);
        border: 1px solid rgba(16, 185, 129, 0.3);
    }
    
    .form-message-error {
        background: rgba(239, 68, 68, 0.1);
        color: var(--color-error);
        border: 1px solid rgba(239, 68, 68, 0.3);
    }
    
    /* Estilos para errores de campo */
    .field-error {
        color: var(--color-error);
        font-size: 0.875rem;
        margin-top: var(--spacing-xs);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
    }
    
    .field-invalid {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
    }
    
    /* Estados de carga del botón */
    .btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    /* Notificaciones de descarga */
    .download-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-md);
        padding: var(--spacing-md);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        min-width: 250px;
    }
    
    .download-notification.show {
        transform: translateX(0);
    }
    
    .download-notification-success {
        border-left: 4px solid var(--color-success);
    }
    
    .download-notification-info {
        border-left: 4px solid var(--text-accent);
    }
    
    /* Animaciones */
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Responsive para notificaciones */
    @media (max-width: 480px) {
        .download-notification {
            right: 10px;
            left: 10px;
            transform: translateY(-100%);
            min-width: auto;
        }
        
        .download-notification.show {
            transform: translateY(0);
        }
    }
`;

// Añadir estilos al documento
const formStyleSheet = document.createElement('style');
formStyleSheet.textContent = formStyles;
document.head.appendChild(formStyleSheet);

// Inicializar gestor de formularios cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.formsManager = new FormsManager();
});
// ======================================
// SISTEMA DE TRADUCCIONES MULTIIDIOMA
// ======================================

class TranslationManager {
    constructor() {
        this.currentLanguage = 'es'; // Idioma por defecto: español
        this.translations = this.loadTranslations(); // Cargar traducciones
        this.init(); // Inicializar el sistema
    }

    // Cargar todas las traducciones
    loadTranslations() {
        return {
            es: {
                // Header y navegación
                'backend-developer': 'Desarrollador Backend',
                'inicio': 'Inicio',
                'sobre-mi': 'Sobre mí',
                'habilidades': 'Habilidades',
                'experiencia': 'Experiencia',
                'proyectos': 'Proyectos',
                'educacion': 'Educación',
                'contacto': 'Contacto',

                // Hero section
                'desarrollador-backend': 'Desarrolladora Backend & SAP',
                'hero-desc': 'Enfocada en crear soluciones eficientes y escalables, alineadas a las necesidades del usuario.',
                'interes': 'Me adapté constantemente a entornos dinámicos, con aprendizaje continuo en proyectos reales.',
                'contactame': 'Contáctame',
                'descargar-cv': 'Descargar CV',

                // Sobre mí
                'about-desc1': 'Me especializo en integrar lógica backend con estructuras claras y mantenibles, aplicando metodologías ágiles. Disfruto aprender, resolver problemas, colaborar en equipo y adaptarme a diferentes entornos y tecnologías.',
                'about-desc2': 'Tengo experiencia en diseño web y actualmente estoy profundizando mis conocimientos en SAP e Inteligencia Artificial para optimizar procesos empresariales.',
                'backend-dev': 'Desarrollo Backend',
                'backend-desc': 'Diseño web con APIs REST y arquitecturas escalables.',
                'database-management': 'Gestión de Datos',
                'database-desc': 'Modelado y optimización de bases de datos relacionales',
                'sap-consulting': 'Consultoría SAP',
                'sap-desc': 'Implementación y optimización de procesos con SAP',

                // Habilidades
                'habilidades-tecnicas': 'Habilidades Técnicas',
                'backend': 'Backend',
                'bases-datos': 'Bases de Datos',
                'frontend': 'Frontend',
                'herramientas': 'Herramientas',
                'habilidades-personales': 'Habilidades Personales',
                'pensamiento-analitico': 'Pensamiento Analítico',
                'trabajo-equipo': 'Trabajo en Equipo',
                'comunicacion': 'Comunicación',
                'gestion-tiempo': 'Gestión del Tiempo',
                'resolucion-problemas': 'Resolución de Problemas',
                'innovacion': 'Innovación Tecnológica',

                // Experiencia
                'experiencia-profesional': 'Experiencia Profesional',
                'pasante-sap': 'Pasante de Desarrollo SAP',
                'pasantia': 'Carga total: 320 hs',
                'actual': 'Actual',
                'exp-sap-desc-1': 'Formación profesional con desarrollo intensivo en Python y SQL, complementado con metodologías ágiles, comunicación efectiva, trabajo en equipo e inteligencia emocional.',
                'exp-sap-desc-2': 'Realicé proyectos prácticos que integran lógica de programación con procesos de negocio.',
                'metologias-agiles': 'Metodologías Ágiles',
                'analisis-datos': 'Análisis de Datos',
                'habilidades-blandas': 'Habilidades Blandas',

                'desarrollador-webmaster': 'Webmaster',
                'webmaster': 'Carga total: 315 hs',
                'exp-webmaster-desc-1': 'Gestioné proyectos para los clientes corporativos Softys y Cheers, brindando soporte técnico y atención al cliente. Realicé tareas de QA/UAT para garantizar la calidad de las implementaciones.',
                'exp-webmaster-desc-2': 'Desarrollé Landing Pages en conjunto con Salesforce para las marcas Lancôme, Kiehl’s y Urban. Me adapté constantemente a entornos dinámicos, con aprendizaje continuo en proyectos reales.',
                'gestion-projects': 'Gestión de Proyectos',
                'soporte-tecnico': 'Soporte Técnico',
                'atencion-cliente': 'Atención al cliente',
                'ticket-webmaster': 'Creación de Tickets',


                // Proyectos
                'sistema-bancario': 'Sistema de Gestión Bancario',
                'proyecto-banco-desc': 'Gestión completa de usuarios y cuentas. Incluye operaciones de transferencias, informes financieros, pagos y autorizaciones de préstamos.',
                'logro-banco-1': 'Automatización de procesos clave de transferencias y préstamos',
                'logro-banco-2': 'Módulo de informes que facilita la toma de decisiones.',
                'logro-banco-3': 'Restricciones por roles que mejoran la seguridad del sistema.',

                'app-eCommerce': 'Asignación de Turnos eCommerce',
                'proyecto-eCommerce-desc': 'Sistema de turnos para eCommerce con inicio de sesión validado por rol (gerentes y empleados). Permite la asignación y visualización de turnos, gestión de clientes y empleados.',
                'logro-eCommerce-1': 'Optimización de la organización de turnos.',
                'logro-eCommerce-2': 'Diferenciación de permisos según rol (mayor seguridad y control).',
                'logro-eCommerce-3': 'Integración con base de datos para almacenamiento confiable.',

                'proyecto-web': 'Selección del Mundial 2022',
                'proyecto-web-desc': 'Sitio web responsive dedicado a la Selección Argentina. Incluye un mapa interactivo con la ubicación de Qatar y el lugar de nacimiento de jugadores, además de fichas con información detallada.',
                'logro-web-1': 'Diseño responsive accesible desde cualquier dispositivo.',
                'logro-web-2': 'Presentación interactiva de información geográfica y jugadores.',
                'logro-web-3': 'Experiencia de usuario atractiva con fichas dinámicas.',

                // Educación
                'carrera-universitaria': 'Licenciatura en Sistemas de Información',
                'universidad': 'Universidad Nacional de Luján',
                'en-curso': 'En curso',
                'tecnicatura': 'Tecnicatura en Programación Superior',
                'utn-universidad': 'Universidad Tecnológica Nacional',
                'completado': 'Completado',
                'educacion-complementaria': 'Educación Complementaria',
                'curso-sql': 'SQL Básico',
                'curso-ia': 'Inteligencia Artificial',
                'curso-python': 'Python Avanzado',
                'curso-ciberseguridad': 'Ciberseguridad',

                // Contacto
                'conectemos': '¡Conectemos!',
                'contact-desc': 'Estoy disponible para nuevas oportunidades y proyectos desafiantes. ¡No dudes en contactarme!',
                'descargar-cv-completo': 'Descargar CV',
                'nombre': 'Nombre',
                'email': 'Email',
                'asunto': 'Asunto',
                'mensaje': 'Mensaje',
                'select-asunto': 'Selecciona un asunto',
                'opotunidad-laboral': 'Oportunidad laboral',
                'colaboracion': 'Colaboración',
                'consulta-general': 'Consulta general',
                'otro': 'Otro',
                'enviar-mensaje': 'Enviar Mensaje',
                'footer-text': 'Desarrollado con mucho❤️ | Todos los derechos reservados.',
                'conoceme-mas': 'Conóceme más',
                'mas-proyectos': 'Más proyectos',
            },

            en: {
                // Header y navegación
                'backend-developer': 'Backend Developer',
                'inicio': 'Home',
                'sobre-mi': 'About me',
                'habilidades': 'Skills',
                'experiencia': 'Experience',
                'proyectos': 'Projects',
                'educacion': 'Education',
                'contacto': 'Contact',

                // Hero section
                'desarrollador-backend': 'Backend & SAP Developer ',
                'hero-desc': 'Focused on creating simple and scalable solutions that truly support both people and businesses.',
                'objetivo': 'I have strong problem-solving skills and enjoy working in a team.',
                'interes': 'I’m looking to keep growing  in collaborative and innovative environments.',
                'contactame': 'Contact me',
                'descargar-cv': 'Download CV',

                // Sobre mí
                'about-desc1': 'I specialize in backend development with clear and maintainable structures, applying agile methodologies. I enjoy learning, solving problems, collaborating in teams, and adapting to different environments and technologies.',
                'about-desc2': 'I have experience in web design and I am currently deepening my knowledge in SAP and Artificial Intelligence to optimize business processes.',
                'backend-dev': 'Backend Development',
                'backend-desc': 'Web Design with REST APIs and scalable architectures',
                'database-management': 'Data Management',
                'database-desc': 'Relational database modeling and optimization',
                'sap-consulting': 'SAP Consulting',
                'sap-desc': 'Process implementation and optimization with SAP',

                // Habilidades
                'habilidades-tecnicas': 'Technical Skills',
                'backend': 'Backend',
                'bases-datos': 'Databases',
                'frontend': 'Frontend',
                'herramientas': 'Tools',
                'habilidades-personales': 'Soft Skills',
                'pensamiento-analitico': 'Analytical Thinking',
                'trabajo-equipo': 'Teamwork',
                'comunicacion': 'Communication',
                'gestion-tiempo': 'Time Management',
                'resolucion-problemas': 'Problem Solving',
                'innovacion': 'Technological Innovation',

                // Experiencia
                'experiencia-profesional': 'Professional Experience',
                'pasante-sap': 'SAP Development Intern',
                'pasantia': 'Total workload: 320 hrs',
                'actual': 'Current',
                'exp-sap-desc-1': 'Professional training with intensive development in Python and SQL, complemented by agile methodologies, effective communication, teamwork, and emotional intelligence.',
                'exp-sap-desc-2': 'Completed practical projects integrating programming logic with business processes.',
                'metologias-agiles': 'Agile Methodologies',
                'habilidades-blandas': 'Soft Skills',

                'desarrollador-webmaster': 'Webmaster',
                'webmaster': 'Total workload: 315 hrs',
                'exp-webmaster-desc-1': 'Managed projects for corporate clients Softys and Cheers, providing technical support and customer service. Performed QA/UAT tasks to ensure implementation quality.',
                'exp-webmaster-desc-2': 'Developed landing pages in collaboration with Salesforce for brands such as Lancôme, Kiehl’s, and Urban. Consistently adapted to dynamic environments, with continuous learning on real projects',
                'gestion-projects': 'Project Management',
                'soporte-tecnico': 'Technical Support',
                'atencion-cliente': 'Customer Service',
                'ticket-webmaster': 'Ticket creations',


                // Proyectos
                'sistema-bancario': 'Banking Management System',
                'proyecto-banco-desc': 'Development of a banking system with full management of users and accounts. Includes transfers, financial reports, payments, and loan authorizations. Role-based validations were implemented to ensure security and control.',
                'logro-banco-1': 'Automated critical processes such as transfers and loan approvals.',
                'logro-banco-2': 'Reporting module to support decision-making.',
                'logro-banco-3': 'Role-based access control to enhance security.',

                'app-eCommerce': 'eCommerce Appointment Scheduling',
                'proyecto-eCommerce-desc': 'Appointment scheduling system for eCommerce with role-based login (managers and employees). Enables appointment assignment and visualization, as well as client and employee management.',
                'logro-eCommerce-1': 'Improved organization of appointments.',
                'logro-eCommerce-2': 'Role-based permissions for greater control and security.',
                'logro-eCommerce-3': 'Database integration for reliable information storage.',

                'proyecto-web': 'World Cup 2022',
                'proyecto-web-desc': 'Responsive website dedicated to the Argentina National Team. Features an interactive map showing Qatar’s location and players’ birthplaces, along with detailed player profiles.',
                'logro-web-1': 'Responsive design accessible from any device.',
                'logro-web-2': 'Interactive presentation of geographic and player data.',
                'logro-web-3': 'Engaging user experience through dynamic player profiles.',

                // Educación
                'carrera-universitaria': "Degree in Information Systems",
                'universidad': 'National University of Luján',
                'en-curso': 'In progress',
                'tecnicatura': 'Advanced Programming Technician',
                'utn-universidad': 'National Technological University',
                'completado': 'Completed',
                'educacion-complementaria': 'Complementary Education',
                'curso-sql': 'Basic SQL',
                'curso-ia': 'Artificial Intelligence',
                'curso-python': 'Advanced Python',
                'curso-ciberseguridad': 'Cybersecurity',

                // Contacto
                'conectemos': 'Let\'s Connect!',
                'contact-desc': "I'm available for new opportunities and challenging projects. Feel free to contact me!",
                'descargar-cv-completo': 'Download CV',
                'nombre': 'Name',
                'email': 'Email',
                'asunto': 'Subject',
                'mensaje': 'Message',
                'select-asunto': 'Select a subject',
                'opotunidad-laboral': 'Job opportuniy',
                'colaboracion': 'Collaboration',
                'consulta-general': 'General inquiry',
                'otro': 'Other',
                'enviar-mensaje': 'Send Message',
                'footer-text': 'Developed with much ❤️ | All rights reserved.',
                'conoceme-mas': 'Know more',
                'mas-proyectos': 'More proyects',
            }
        };
    }

    // Inicializar el sistema de traducciones
    init() {
        this.applyTranslations(); // Aplicar traducciones iniciales
        this.setupLanguageToggle(); // Configurar botón de cambio de idioma
    }

    // Aplicar traducciones a todos los elementos
    applyTranslations() {
        // Buscar todos los elementos con atributo data-text
        const elementsToTranslate = document.querySelectorAll('[data-text]');

        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-text'); // Obtener clave de traducción
            const translation = this.getTranslation(key); // Obtener traducción

            if (translation) {
                element.textContent = translation; // Aplicar traducción
            }
        });
    }

    // Obtener traducción para una clave específica
    getTranslation(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }

    // Cambiar idioma
    switchLanguage() {
        // Alternar entre español e inglés
        this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
        this.applyTranslations(); // Aplicar nuevas traducciones
        this.updateLanguageButton(); // Actualizar botón

        // Guardar preferencia en localStorage
        localStorage.setItem('preferred-language', this.currentLanguage);
    }

    // Actualizar texto del botón de idioma
    updateLanguageButton() {
        const languageBtn = document.querySelector('#languageToggle span');
        if (languageBtn) {
            languageBtn.textContent = this.currentLanguage.toUpperCase();
        }
    }

    // Configurar evento del botón de cambio de idioma
    setupLanguageToggle() {
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                this.switchLanguage();
            });
        }

        // Cargar idioma guardado
        const savedLanguage = localStorage.getItem('preferred-language');
        if (savedLanguage && savedLanguage !== this.currentLanguage) {
            this.switchLanguage();
        }

        this.updateLanguageButton(); // Actualizar botón inicial
    }
}

// Inicializar sistema de traducciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.translationManager = new TranslationManager();
});
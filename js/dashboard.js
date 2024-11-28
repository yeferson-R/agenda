document.addEventListener('DOMContentLoaded', function() {
    // Cargar Chart.js desde CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    document.head.appendChild(script);

    script.onload = initializeCharts;

    // Actualizar nombre de usuario
    const userName = localStorage.getItem('userName') || 'Usuario';
    document.getElementById('userName').textContent = `Bienvenido, ${userName}`;

    // Inicializar métricas
    const metricas = {
        impresiones: getStoredMetric('impresiones', 1500),
        visitas: getStoredMetric('visitas', 800),
        interacciones: getStoredMetric('interacciones', 300),
        registros: getStoredMetric('registros', 150)
    };

    // Actualizar valores de métricas
    updateMetricDisplay('impresiones-valor', metricas.impresiones);
    updateMetricDisplay('visitas-valor', metricas.visitas);
    updateMetricDisplay('interacciones-valor', metricas.interacciones);
    updateMetricDisplay('registros-valor', metricas.registros);

    // Incrementar métricas cuando corresponda
    incrementMetric('impresiones');
    incrementMetric('visitas');

    // Manejadores de eventos para incrementar interacciones
    document.querySelectorAll('.btn-detalles, .btn-inscribirse').forEach(btn => {
        btn.addEventListener('click', () => {
            incrementMetric('interacciones');
        });
    });

    // Manejador del botón de cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
    });

    // Manejador de la barra de búsqueda
    const searchBar = document.querySelector('.search-bar input');
    searchBar.addEventListener('input', function(e) {
        incrementMetric('interacciones');
    });

    // Manejadores para los botones de detalles
    document.querySelectorAll('.btn-detalles').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventoInfo = this.closest('.evento-card').querySelector('.evento-info');
            const titulo = eventoInfo.querySelector('h3').textContent;
            alert(`Detalles completos de: ${titulo}\nPróximamente más información...`);
        });
    });

    // Manejadores para los botones de inscripción
    document.querySelectorAll('.btn-inscribirse').forEach(btn => {
        btn.addEventListener('click', function() {
            const actividadTitulo = this.closest('.actividad-card').querySelector('h3').textContent;
            alert(`Te has inscrito exitosamente a: ${actividadTitulo}`);
            incrementMetric('registros');
        });
    });

    // Manejador del formulario de newsletter
    document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('¡Gracias por suscribirte a nuestro newsletter!');
            incrementMetric('registros');
            this.reset();
        }
    });

    // Manejadores para el modal de registro
    const modal = document.getElementById('registroModal');
    const openRegisterBtn = document.getElementById('openRegisterBtn');
    const closeModal = document.querySelector('.close-modal');
    const registroForm = document.getElementById('registroForm');

    // Función para abrir el modal
    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previene el scroll del body
    };

    // Función para cerrar el modal
    const closeModalFunction = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura el scroll del body
    };

    // Event listeners para el modal
    openRegisterBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunction);

    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Evitar que los clics dentro del modal lo cierren
    modal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Manejar el envío del formulario
    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const formData = {
            nombre: document.getElementById('nombreCompleto').value,
            email: document.getElementById('emailRegistro').value,
            telefono: document.getElementById('telefonoRegistro').value,
            ciudad: document.getElementById('ciudadRegistro').value,
            intereses: Array.from(document.getElementById('interesesRegistro').selectedOptions).map(option => option.value)
        };

        // Simular guardado de datos
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        usuarios.push(formData);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Incrementar métrica de registros
        incrementMetric('registros');

        // Mostrar mensaje de éxito y cerrar modal
        alert('¡Usuario registrado exitosamente!');
        closeModalFunction();
        this.reset();
    });

    // Funciones auxiliares para métricas
    function getStoredMetric(metric, defaultValue) {
        const stored = localStorage.getItem(`metric_${metric}`);
        return stored ? parseInt(stored) : defaultValue;
    }

    function updateMetricDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value.toLocaleString();
        }
    }

    function incrementMetric(metric) {
        metricas[metric]++;
        localStorage.setItem(`metric_${metric}`, metricas[metric]);
        updateMetricDisplay(`${metric}-valor`, metricas[metric]);
    }

    function initializeCharts() {
        const ctx = document.getElementById('metricas-chart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Impresiones',
                    data: [1200, 1350, 1500, 1650, 1800, metricas.impresiones],
                    borderColor: '#6c63ff',
                    tension: 0.4
                }, {
                    label: 'Visitas',
                    data: [600, 650, 700, 750, 800, metricas.visitas],
                    borderColor: '#4CAF50',
                    tension: 0.4
                }, {
                    label: 'Interacciones',
                    data: [200, 220, 250, 280, 300, metricas.interacciones],
                    borderColor: '#ff6b6b',
                    tension: 0.4
                }, {
                    label: 'Registros',
                    data: [80, 100, 120, 135, 150, metricas.registros],
                    borderColor: '#ffd700',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Evolución de Métricas'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Animación suave para los enlaces de navegación
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const registerModal = document.getElementById('registerModal');
    const registerBtn = document.getElementById('registerBtn');
    const closeBtn = document.querySelector('.close');
    const registerForm = document.getElementById('registerForm');
    const registerErrorMessage = document.getElementById('register-error-message');

    const CREDENTIALS = {
        username: 'unad',
        password: '123'
    };

    // Login Form Handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
            errorMessage.textContent = '';
            errorMessage.style.color = '#4CAF50';
            errorMessage.textContent = '¡Inicio de sesión exitoso!';
            
            // Guardar el nombre de usuario y redirigir al dashboard
            localStorage.setItem('userName', username);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            errorMessage.style.color = '#ff3860';
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            loginForm.classList.add('shake');
            
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
        }
    });

    // Register Modal Handlers
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Previene el scroll
    });

    closeBtn.addEventListener('click', function() {
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura el scroll
    });

    window.addEventListener('click', function(e) {
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Register Form Handler
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('regNombre').value;
        const email = document.getElementById('regEmail').value;
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        // Validaciones básicas
        if (password !== confirmPassword) {
            registerErrorMessage.textContent = 'Las contraseñas no coinciden';
            return;
        }

        if (password.length < 6) {
            registerErrorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
            return;
        }

        // Simulación de registro exitoso
        registerErrorMessage.style.color = '#4CAF50';
        registerErrorMessage.textContent = '¡Registro exitoso!';
        
        setTimeout(() => {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            registerForm.reset();
            registerErrorMessage.textContent = '';
            alert('¡Registro completado! Ahora puedes iniciar sesión.');
        }, 1500);
    });

    // Limpiar mensajes de error
    document.getElementById('username').addEventListener('input', clearLoginError);
    document.getElementById('password').addEventListener('input', clearLoginError);

    function clearLoginError() {
        errorMessage.textContent = '';
    }

    // Limpiar mensaje de error del registro cuando se comienza a escribir
    const registerInputs = registerForm.querySelectorAll('input');
    registerInputs.forEach(input => {
        input.addEventListener('input', function() {
            registerErrorMessage.textContent = '';
        });
    });
});

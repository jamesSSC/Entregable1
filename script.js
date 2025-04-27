document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('error-message');
    const loginSection = document.getElementById('login-section');
    const portfolioContent = document.getElementById('portfolio-content');
    const botonVideojuegos = document.querySelector('#Videojuegos .boton-desplegable');
    const contenidoVideojuegos = document.getElementById('contenido-Videojuegos');
    const itemsVideojuegos = document.querySelectorAll('#contenido-Videojuegos .Videojuegos-item');

    if (botonVideojuegos && contenidoVideojuegos) {
        botonVideojuegos.addEventListener('click', function() {
            contenidoVideojuegos.style.display = contenidoVideojuegos.style.display === 'none' ? 'block' : 'none';
            botonVideojuegos.classList.toggle('boton-desplegado');
            if (contenidoVideojuegos.style.display === 'block') {
                contenidoVideojuegos.classList.add('mostrar-detalles');
            } else {
                contenidoVideojuegos.classList.remove('mostrar-detalles');
            }
        });

        itemsVideojuegos.forEach(item => {
            const encabezadoItem = item.querySelector('h3');
            const detallesItem = item.querySelectorAll('.detalles-videojuego');

            if (encabezadoItem && detallesItem.length > 0) {
                encabezadoItem.style.cursor = 'pointer';
                encabezadoItem.addEventListener('click', function() {
                    detallesItem.forEach(detalle => {
                        detalle.style.display = detalle.style.display === 'none' ? 'block' : 'none';
                    });
                });
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;

            fetch('users.json')
                .then(response => response.json())
                .then(users => {
                    const user = users.find(u => u.username === username && u.password === password);

                    if (user) {
                        // Inicio de sesión exitoso
                        loginSection.style.display = 'none';
                        portfolioContent.style.display = 'block';
                    } else {
                        // Credenciales incorrectas
                        errorMessageDiv.textContent = 'Usuario o contraseña incorrectos.';
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el archivo JSON:', error);
                    errorMessageDiv.textContent = 'Ocurrió un error al intentar iniciar sesión.';
                });
        });
    } else {
        console.error('El formulario de login no se encontró en el HTML.');
    }
});
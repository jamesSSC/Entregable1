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

    function verificarCredenciales(username, password, users) {
        return users.find(u => u.username === username && u.password === password);
    }

    // Función para manejar el desplegable de videojuegos
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

    // Verificación de credenciales al enviar el formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;

            fetch('users.json')
                .then(response => response.json())
                .then(users => {
                    const usuarioAutenticado = verificarCredenciales(username, password, users);

                    if (usuarioAutenticado) {
                        loginSection.style.display = 'none';
                        portfolioContent.style.display = 'block';
                    } else {
                        errorMessageDiv.textContent = 'Usuario o contraseña incorrectos.';
                        console.log('Credenciales incorrectas: ' + username + ', ' + password);  // Agregado para log en consola
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

    // Función para ejecutar pruebas unitarias
    function ejecutarPruebasUnitarias() {
        console.log("--- Ejecutando Pruebas Unitarias ---");

        // Caso de éxito: credenciales correctas
        const usuariosPruebaExito = [{ "username": "james", "password": "73080944" }];
        const resultadoExito = verificarCredenciales("james", "73080944", usuariosPruebaExito);
        console.log('Resultado de prueba 1 (Éxito):', resultadoExito);
        console.assert(resultadoExito !== undefined, "Prueba 1 (Éxito): Credenciales correctas");

        // Caso de fallo: usuario incorrecto
        const usuariosPruebaFallidoUsuario = [{ "username": "james", "password": "73080944" }];
        const resultadoFallidoUsuario = verificarCredenciales("usuario_incorrecto", "73080944", usuariosPruebaFallidoUsuario);
        console.log('Resultado de prueba 2 (Fallo - Usuario incorrecto):', resultadoFallidoUsuario);
        console.assert(resultadoFallidoUsuario === undefined, "Prueba 2 (Fallo - Usuario incorrecto)");

        // Caso de fallo: contraseña incorrecta
        const usuariosPruebaFallidoContraseña = [{ "username": "james", "password": "73080944" }];
        const resultadoFallidoContraseña = verificarCredenciales("james", "clave_incorrecta", usuariosPruebaFallidoContraseña);
        console.log('Resultado de prueba 3 (Fallo - Contraseña incorrecta):', resultadoFallidoContraseña);
        console.assert(resultadoFallidoContraseña === undefined, "Prueba 3 (Fallo - Contraseña incorrecta)");

        // Caso con múltiples usuarios y credenciales correctas para uno de ellos
        const usuariosPruebaMultiple = [
            { "username": "james", "password": "73080944" },
            { "username": "otro", "password": "secreto" }
        ];
        const resultadoMultipleExito = verificarCredenciales("james", "73080944", usuariosPruebaMultiple);
        console.log('Resultado de prueba 4 (Múltiple - Éxito en tu usuario):', resultadoMultipleExito);
        console.assert(resultadoMultipleExito !== undefined, "Prueba 4 (Múltiple - Éxito en tu usuario)");

        console.log("--- Fin de Pruebas Unitarias ---");
    }

    ejecutarPruebasUnitarias();
});
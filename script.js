const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 6 + 5; 
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = this.randomColor(); 
        this.shape = Math.random() < 0.5 ? 'circle' : 'square';
    }

    randomColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0F033', '#F033A1', '#33FFF0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.shape === 'circle') {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
            ctx.rect(this.x, this.y, this.size * 2, this.size * 2);
        }
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();

// --- Añadir esta parte al final de tu script.js ---
document.addEventListener('DOMContentLoaded', function() {
    const botonVideojuegos = document.querySelector('#Videojuegos .boton-desplegable');
    const contenidoVideojuegos = document.getElementById('contenido-Videojuegos');
    const itemsVideojuegos = document.querySelectorAll('#contenido-Videojuegos .Videojuegos-item');

    if (botonVideojuegos && contenidoVideojuegos) {
        botonVideojuegos.addEventListener('click', function() {
            // Cambiar la visibilidad del contenido completo de videojuegos
            contenidoVideojuegos.style.display = contenidoVideojuegos.style.display === 'none' ? 'block' : 'none';
            botonVideojuegos.classList.toggle('boton-desplegado');

            // Mostrar todos los detalles dentro de los items al desplegar
            if (contenidoVideojuegos.style.display === 'block') {
                contenidoVideojuegos.classList.add('mostrar-detalles');
            } else {
                contenidoVideojuegos.classList.remove('mostrar-detalles');
            }
        });

        // Opcional: Hacer que cada item se despliegue individualmente al hacer clic en su encabezado (h3)
        itemsVideojuegos.forEach(item => {
            const encabezadoItem = item.querySelector('h3');
            const detallesItem = item.querySelectorAll('.detalles-videojuego');

            if (encabezadoItem && detallesItem.length > 0) {
                encabezadoItem.style.cursor = 'pointer'; // Indicar que es clickable
                encabezadoItem.addEventListener('click', function() {
                    detallesItem.forEach(detalle => {
                        detalle.style.display = detalle.style.display === 'none' ? 'block' : 'none';
                    });
                });
            }
        });
    }
});
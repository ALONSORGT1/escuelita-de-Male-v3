// Sonidos
const sonidoCorrecto = new Audio('audio/correcto.mp3');
const sonidoIncorrecto = new Audio('audio/incorrecto.mp3');

// Función para generar operaciones aleatorias
function generarOperacion() {
    const num1 = Math.floor(Math.random() * 30) + 1;  // Número aleatorio entre 1 y 100
    const num2 = Math.floor(Math.random() * 30) + 1;  // Número aleatorio entre 1 y 100
    const operacion = Math.random() > 0.5 ? '+' : '-'; // Aleatorio entre suma y resta
    let resultado;

    if (operacion === '+') {
        resultado = num1 + num2;
    } else {
        resultado = num1 - num2;
    }

    return {
        pregunta: `¿Cuánto es ${num1} ${operacion} ${num2}?`,
        respuestaCorrecta: resultado
    };
}

// Inicializamos el juego
let operacionActual = generarOperacion();

// Mostrar la pregunta
function mostrarPregunta() {
    const pregunta = operacionActual;
    document.getElementById('pregunta').textContent = pregunta.pregunta;
    document.getElementById('respuesta-input').value = ''; // Limpiar campo de respuesta
    document.getElementById('feedback').textContent = ''; // Limpiar feedback
}

// Verificar la respuesta
function verificarRespuesta() {
    const respuestaUsuario = parseInt(document.getElementById('respuesta-input').value);
    const feedback = document.getElementById('feedback');
    const pregunta = operacionActual;

    if (respuestaUsuario === pregunta.respuestaCorrecta) {
        feedback.textContent = "¡Correcto! ¡Bien hecho!";
        feedback.style.color = "green";
        sonidoCorrecto.play();
        document.body.style.backgroundColor = "#98FB98"; // Fondo verde de éxito
    } else {
        feedback.textContent = "¡Oops! Intenta de nuevo.";
        feedback.style.color = "red";
        sonidoIncorrecto.play();
        document.body.style.backgroundColor = "#FF6347"; // Fondo rojo de error
    }

    // Continuar con una nueva pregunta después de 2 segundos
    setTimeout(() => {
        operacionActual = generarOperacion();
        mostrarPregunta();
    }, 2000);
}

// Iniciar el juego
mostrarPregunta();

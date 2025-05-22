let puntaje = 0;
let tiempo = 60;
let respuestaCorrecta = 0;

function iniciarJuego() {
    actualizarProblema();
    let intervalo = setInterval(() => {
        tiempo--;
        document.getElementById('tiempo').textContent = tiempo;

        if (tiempo <= 0) {
            clearInterval(intervalo);
            document.getElementById('problema').textContent = '¡Tiempo agotado!';
            document.getElementById('resultado').textContent = `Puntuación final: ${puntaje}`;
        }
    }, 1000);
}

function actualizarProblema() {
    let num1 = Math.floor(Math.random() * 12) + 1;
    let num2 = Math.floor(Math.random() * 12) + 1;
    respuestaCorrecta = num1 * num2;

    document.getElementById('problema').textContent = `${num1} × ${num2} = ?`;
    document.getElementById('respuesta').value = '';
    document.getElementById('respuesta').focus();
}

function verificarRespuesta() {
    const respuestaUsuario = parseInt(document.getElementById('respuesta').value);
    const resultado = document.getElementById('resultado');

    if (respuestaUsuario === respuestaCorrecta) {
        puntaje += 10;
        resultado.textContent = '¡Correcto! +10 puntos 🎉';
        resultado.style.color = 'green';
    } else {
        resultado.textContent = `Incorrecto 😓`;
        resultado.style.color = 'red';
    }

    document.getElementById('puntos').textContent = puntaje;
    setTimeout(actualizarProblema, 1000);
}

document.addEventListener('DOMContentLoaded', iniciarJuego);

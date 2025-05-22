document.addEventListener("DOMContentLoaded", function () {
  let ajolote = document.getElementById("ajolote");
  let musicaFondo = new Audio("audio/audio1.mp3"); 

  musicaFondo.loop = true;

  document.addEventListener("click", function iniciarMusica() {
      musicaFondo.play().catch(error => console.error("Error al reproducir la música:", error));
      document.removeEventListener("click", iniciarMusica);
  });

  ajolote.classList.add("flotando");

  ajolote.addEventListener("click", function () {
      ajolote.classList.add("vibrate");

      setTimeout(() => {
          ajolote.classList.remove("vibrate");
      }, 200);
  });

  // Generar una pregunta aleatoria de división
  let num1, num2;
  generarPregunta();

  function generarPregunta() {
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      document.getElementById("pregunta").innerText = `¿Cuánto es ${num1} ÷ ${num2}?`;
  }

  // Verificar la respuesta
  window.verificarRespuesta = function() {
      let respuestaUsuario = parseInt(document.getElementById("respuesta").value);
      let resultado = Math.floor(num1 / num2);
      if (respuestaUsuario === resultado) {
          document.getElementById("resultado").innerText = "¡Correcto!";
      } else {
          document.getElementById("resultado").innerText = "¡Incorrecto, intenta de nuevo!";
      }
      generarPregunta();  // Nueva pregunta después de cada intento
      document.getElementById("respuesta").value = ""; // Limpiar la respuesta
  }
});

// juegos.js
function iniciarMisionNumeros() {
    const juegoContainer = document.createElement('div');
    juegoContainer.innerHTML = `
      <div class="juego-contenedor">
        <h3>Misión Números Perdidos</h3>
        <p>Ayuda a Toni a encontrar los números correctos</p>
        <div id="problema" class="problema-matematico"></div>
        <input type="number" id="respuesta" placeholder="Tu respuesta">
        <button id="verificar">Verificar</button>
        <div id="resultado" class="resultado-juego"></div>
        <div class="puntuacion">Puntos: <span id="puntos">0</span></div>
      </div>
    `;
    
    document.getElementById('contenido-juega').appendChild(juegoContainer);
    
    // Lógica del juego
    let puntos = 0;
    const operaciones = ['+', '-'];
    
    function generarProblema() {
      const num1 = Math.floor(Math.random() * 50) + 1;
      const num2 = Math.floor(Math.random() * num1) + 1;
      const operacion = operaciones[Math.floor(Math.random() * operaciones.length)];
      
      let problema, respuestaCorrecta;
      if(operacion === '+') {
        problema = `${num1} + ${num2} = ?`;
        respuestaCorrecta = num1 + num2;
      } else {
        problema = `${num1} - ${num2} = ?`;
        respuestaCorrecta = num1 - num2;
      }
      
      document.getElementById('problema').textContent = problema;
      return respuestaCorrecta;
    }
    
    let respuestaCorrecta = generarProblema();
    
    document.getElementById('verificar').addEventListener('click', function() {
      const respuestaUsuario = parseInt(document.getElementById('respuesta').value);
      const resultadoDiv = document.getElementById('resultado');
      
      if(respuestaUsuario === respuestaCorrecta) {
        resultadoDiv.textContent = "¡Correcto! 😊";
        resultadoDiv.style.color = "green";
        puntos += 10;
        document.getElementById('puntos').textContent = puntos;
        // Efecto de confeti
        setTimeout(() => {
          resultadoDiv.textContent = "";
          respuestaCorrecta = generarProblema();
          document.getElementById('respuesta').value = "";
        }, 1500);
      } else {
        resultadoDiv.textContent = "Intenta de nuevo 💪";
        resultadoDiv.style.color = "red";
      }
    });
  }

  function iniciarMultiplicaIngredientes() {
    const juegoContainer = document.createElement('div');
    juegoContainer.innerHTML = `
      <div class="juego-contenedor">
        <h3>Multiplica Ingredientes</h3>
        <p>Haz la cantidad exacta de caramelos</p>
        <div class="receta">
          <p>Receta: Para <span id="cantidad">X</span> caramelos necesitas:</p>
          <ul id="ingredientes"></ul>
        </div>
        <div class="contador-tiempo">Tiempo: <span id="tiempo">60</span>s</div>
        <div class="controles">
          <button id="multiplicar-x2">×2</button>
          <button id="multiplicar-x5">×5</button>
          <button id="multiplicar-x10">×10</button>
        </div>
        <div id="resultado-multiplicacion"></div>
      </div>
    `;
    
    document.getElementById('contenido-juega').appendChild(juegoContainer);
    
    // Lógica del juego
    const ingredientesBase = {
      "Azúcar": 2,
      "Agua": 1,
      "Colorante": 0.5,
      "Saborizante": 0.3
    };
    
    let factor = 1;
    let tiempo = 60;
    let intervalo;
    
    function actualizarReceta() {
      document.getElementById('cantidad').textContent = factor;
      const lista = document.getElementById('ingredientes');
      lista.innerHTML = '';
      
      for(const [ingrediente, cantidad] of Object.entries(ingredientesBase)) {
        const li = document.createElement('li');
        li.textContent = `${ingrediente}: ${cantidad * factor} unidades`;
        lista.appendChild(li);
      }
    }
    
    function iniciarTemporizador() {
      intervalo = setInterval(() => {
        tiempo--;
        document.getElementById('tiempo').textContent = tiempo;
        
        if(tiempo <= 0) {
          clearInterval(intervalo);
          document.getElementById('resultado-multiplicacion').innerHTML = `
            <p>¡Tiempo terminado!</p>
            <p>Lograste multiplicar por ${factor}</p>
            <button id="reiniciar">Jugar de nuevo</button>
          `;
          document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);
        }
      }, 1000);
    }
    
    function reiniciarJuego() {
      tiempo = 60;
      factor = 1;
      clearInterval(intervalo);
      actualizarReceta();
      document.getElementById('tiempo').textContent = tiempo;
      document.getElementById('resultado-multiplicacion').textContent = '';
      iniciarTemporizador();
    }
    
    // Event listeners
    document.getElementById('multiplicar-x2').addEventListener('click', () => {
      factor *= 2;
      actualizarReceta();
    });
    
    document.getElementById('multiplicar-x5').addEventListener('click', () => {
      factor *= 5;
      actualizarReceta();
    });
    
    document.getElementById('multiplicar-x10').addEventListener('click', () => {
      factor *= 10;
      actualizarReceta();
    });
    
    // Iniciar juego
    actualizarReceta();
    iniciarTemporizador();
  }


  function iniciarFigurasPerdidas() {
    const juegoContainer = document.createElement('div');
    juegoContainer.innerHTML = `
      <div class="juego-contenedor">
        <h3>Figuras Perdidas</h3>
        <p>Encuentra y clasifica las figuras geométricas</p>
        <div class="tablero" id="tablero"></div>
        <div class="controles-figuras">
          <button class="figura-btn" data-tipo="cuadrado">Cuadrado</button>
          <button class="figura-btn" data-tipo="triangulo">Triángulo</button>
          <button class="figura-btn" data-tipo="circulo">Círculo</button>
          <button class="figura-btn" data-tipo="rectangulo">Rectángulo</button>
        </div>
        <div class="puntuacion">Aciertos: <span id="aciertos">0</span>/10</div>
      </div>
    `;
    
    document.getElementById('contenido-juega-b2').appendChild(juegoContainer);
    
    // Lógica del juego
    const figuras = ['cuadrado', 'triangulo', 'circulo', 'rectangulo'];
    let aciertos = 0;
    let figuraActual = '';
    
    function generarTablero() {
      const tablero = document.getElementById('tablero');
      tablero.innerHTML = '';
      
      // Generar 16 celdas con figuras aleatorias
      for(let i = 0; i < 16; i++) {
        const celda = document.createElement('div');
        celda.className = 'celda';
        
        // Asignar figura aleatoria a algunas celdas
        if(Math.random() > 0.7) {
          const figuraAleatoria = figuras[Math.floor(Math.random() * figuras.length)];
          celda.dataset.figura = figuraAleatoria;
          celda.innerHTML = `<div class="figura ${figuraAleatoria}"></div>`;
        }
        
        celda.addEventListener('click', verificarSeleccion);
        tablero.appendChild(celda);
      }
      
      // Seleccionar figura objetivo
      figuraActual = figuras[Math.floor(Math.random() * figuras.length)];
      document.querySelector('h3').textContent = `Figuras Perdidas - Encuentra: ${figuraActual}`;
    }
    
    function verificarSeleccion(e) {
      const celda = e.target.closest('.celda');
      if(!celda) return;
      
      if(celda.dataset.figura === figuraActual) {
        celda.style.backgroundColor = '#a5d6a7';
        aciertos++;
        document.getElementById('aciertos').textContent = aciertos;
        
        // Eliminar la figura encontrada
        setTimeout(() => {
          celda.innerHTML = '';
          celda.dataset.figura = '';
          celda.style.backgroundColor = '';
          
          if(aciertos >= 10) {
            alert(`¡Felicidades! Completaste el juego encontrando 10 ${figuraActual}s`);
            reiniciarJuego();
          }
        }, 500);
      } else if(celda.dataset.figura) {
        celda.style.backgroundColor = '#ef9a9a';
        setTimeout(() => {
          celda.style.backgroundColor = '';
        }, 500);
      }
    }
    
    function reiniciarJuego() {
      aciertos = 0;
      document.getElementById('aciertos').textContent = aciertos;
      generarTablero();
    }
    
    // Iniciar juego
    generarTablero();
  }

  function iniciarLaberintoPerimetro() {
    const juegoContainer = document.createElement('div');
    juegoContainer.innerHTML = `
      <div class="juego-contenedor">
        <h3>Laberinto del Perímetro</h3>
        <p>Calcula el perímetro para encontrar la salida</p>
        <div class="laberinto-container">
          <div class="info-laberinto">
            <p>Figura: <span id="figura-actual">Cuadrado</span></p>
            <p>Lado: <span id="lado-actual">5</span> cm</p>
            <input type="number" id="respuesta-perimetro" placeholder="Perímetro en cm">
            <button id="verificar-perimetro">Verificar</button>
          </div>
          <div class="laberinto" id="laberinto"></div>
        </div>
        <div id="feedback-perimetro"></div>
      </div>
    `;
    
    document.getElementById('contenido-juega-b2').appendChild(juegoContainer);
    
    // Lógica del juego
    const figuras = [
      { nombre: "Cuadrado", lados: 4, calcularPerimetro: (lado) => lado * 4 },
      { nombre: "Triángulo equilátero", lados: 3, calcularPerimetro: (lado) => lado * 3 },
      { nombre: "Pentágono", lados: 5, calcularPerimetro: (lado) => lado * 5 },
      { nombre: "Hexágono", lados: 6, calcularPerimetro: (lado) => lado * 6 }
    ];
    
    let posicionJugador = 0;
    let figuraActual, ladoActual, perimetroCorrecto;
    
    function generarNuevoProblema() {
      figuraActual = figuras[Math.floor(Math.random() * figuras.length)];
      ladoActual = Math.floor(Math.random() * 10) + 1;
      perimetroCorrecto = figuraActual.calcularPerimetro(ladoActual);
      
      document.getElementById('figura-actual').textContent = figuraActual.nombre;
      document.getElementById('lado-actual').textContent = ladoActual;
      document.getElementById('respuesta-perimetro').value = '';
      document.getElementById('feedback-perimetro').textContent = '';
      
      dibujarLaberinto();
    }
    
    function dibujarLaberinto() {
      const laberinto = document.getElementById('laberinto');
      laberinto.innerHTML = '';
      
      // Crear 10 pasillos
      for(let i = 0; i < 10; i++) {
        const pasillo = document.createElement('div');
        pasillo.className = 'pasillo';
        
        if(i === posicionJugador) {
          const jugador = document.createElement('div');
          jugador.className = 'jugador';
          pasillo.appendChild(jugador);
        }
        
        if(i === 9) {
          const salida = document.createElement('div');
          salida.className = 'salida';
          pasillo.appendChild(salida);
        }
        
        laberinto.appendChild(pasillo);
      }
    }
    
    document.getElementById('verificar-perimetro').addEventListener('click', function() {
      const respuesta = parseInt(document.getElementById('respuesta-perimetro').value);
      const feedback = document.getElementById('feedback-perimetro');
      
      if(respuesta === perimetroCorrecto) {
        feedback.textContent = "¡Correcto! Avanzas al siguiente pasillo";
        feedback.style.color = "green";
        posicionJugador++;
        
        if(posicionJugador >= 10) {
          feedback.textContent = "¡Felicidades! Has salido del laberinto";
          setTimeout(() => {
            posicionJugador = 0;
            generarNuevoProblema();
          }, 2000);
        } else {
          generarNuevoProblema();
        }
      } else {
        feedback.textContent = "Incorrecto. Intenta de nuevo";
        feedback.style.color = "red";
      }
    });
    
    // Iniciar juego
    generarNuevoProblema();
  }
document.addEventListener("DOMContentLoaded", function () {
    // --- NAVEGACIÓN GENERAL ---
    // Mostrar "Acerca de"
    document.getElementById("acerca").onclick = function () {
        document.getElementById("contenido-principal").style.display = "none";
        document.getElementById("contenido-acerca").style.display = "block";
    };
    document.getElementById("volver-acerca").onclick = function () {
        document.getElementById("contenido-acerca").style.display = "none";
        document.getElementById("contenido-principal").style.display = "block";
    };

    // Bloque 1
    document.getElementById("bloque1").onclick = function () {
        document.getElementById("contenido-principal").style.display = "none";
        document.getElementById("contenido-bloque1").style.display = "block";
    };
    document.getElementById("volver-bloque1").onclick = function () {
        document.getElementById("contenido-bloque1").style.display = "none";
        document.getElementById("contenido-principal").style.display = "block";
    };

    document.getElementById("boton-conceptos").onclick = function () {
        document.getElementById("contenido-bloque1").style.display = "none";
        document.getElementById("contenido-conceptos").style.display = "block";
    };
    document.getElementById("volver-conceptos").onclick = function () {
        document.getElementById("contenido-conceptos").style.display = "none";
        document.getElementById("contenido-bloque1").style.display = "block";
    };

    document.getElementById("boton-juega").onclick = function () {
        document.getElementById("contenido-bloque1").style.display = "none";
        document.getElementById("contenido-juega").style.display = "block";
    };
    document.getElementById("volver-juega").onclick = function () {
        document.getElementById("contenido-juega").style.display = "none";
        document.getElementById("contenido-bloque1").style.display = "block";
    };

    document.getElementById("boton-mira").onclick = function () {
        document.getElementById("contenido-bloque1").style.display = "none";
        document.getElementById("contenido-mira").style.display = "block";
    };
    document.getElementById("volver-mira").onclick = function () {
        document.getElementById("contenido-mira").style.display = "none";
        document.getElementById("contenido-bloque1").style.display = "block";
    };

    document.getElementById("boton-desafio").onclick = function () {
        document.getElementById("contenido-bloque1").style.display = "none";
        document.getElementById("contenido-reto").style.display = "block";
    };
    document.getElementById("volver-reto").onclick = function () {
        document.getElementById("contenido-reto").style.display = "none";
        document.getElementById("contenido-bloque1").style.display = "block";
    };

    document.getElementById("boton-hagamoslo").onclick = function () {
        alert("¡Vamos a resolver el reto de Bloque 1!");
    };

    // Bloque 2
    document.getElementById("bloque2").onclick = function () {
        // Mostrar automáticamente el contenido de Bloque 2 al cargar la página
document.getElementById("contenido-principal").style.display = "none";
document.getElementById("contenido-bloque2").style.display = "block";

    };

    
    document.getElementById("volver-bloque2").onclick = function () {
        document.getElementById("contenido-bloque2").style.display = "none";
        document.getElementById("contenido-principal").style.display = "block";
    };

    document.getElementById("boton-conceptos-b2").onclick = function () {
        document.getElementById("contenido-bloque2").style.display = "none";
        document.getElementById("contenido-conceptos-b2").style.display = "block";
    };
    document.getElementById("volver-conceptos-b2").onclick = function () {
        document.getElementById("contenido-conceptos-b2").style.display = "none";
        document.getElementById("contenido-bloque2").style.display = "block";
    };

    document.getElementById("boton-juega-b2").onclick = function () {
        document.getElementById("contenido-bloque2").style.display = "none";
        document.getElementById("contenido-juega-b2").style.display = "block";
    };
    document.getElementById("volver-juega-b2").onclick = function () {
        document.getElementById("contenido-juega-b2").style.display = "none";
        document.getElementById("contenido-bloque2").style.display = "block";
    };

    document.getElementById("boton-mira-b2").onclick = function () {
        document.getElementById("contenido-bloque2").style.display = "none";
        document.getElementById("contenido-mira-b2").style.display = "block";
    };
    document.getElementById("volver-mira-b2").onclick = function () {
        document.getElementById("contenido-mira-b2").style.display = "none";
        document.getElementById("contenido-bloque2").style.display = "block";
    };

    document.getElementById("boton-desafio-b2").onclick = function () {
        document.getElementById("contenido-bloque2").style.display = "none";
        document.getElementById("contenido-reto-b2").style.display = "block";
    };
    document.getElementById("volver-reto-b2").onclick = function () {
        document.getElementById("contenido-reto-b2").style.display = "none";
        document.getElementById("contenido-bloque2").style.display = "block";
    };

    document.getElementById("boton-hagamoslo-b2").onclick = function () {
        alert("¡Vamos a resolver el reto de Bloque 2!");
    };

    // --- JUEGO DEL LABERINTO ---
    const player = document.getElementById("player");
    const goal = document.getElementById("goal");
    const maze = document.getElementById("maze");

    let x = 0, y = 0;

    function move(dx, dy) {
        const newX = x + dx;
        const newY = y + dy;

        const mazeWidth = maze.offsetWidth;
        const mazeHeight = maze.offsetHeight;

        const maxX = mazeWidth - player.offsetWidth;
        const maxY = mazeHeight - player.offsetHeight;

        if (newX >= 0 && newX <= maxX && newY >= 0 && newY <= maxY) {
            x = newX;
            y = newY;
            player.style.left = x + "px";
            player.style.top = y + "px";
            checkCollision();
        }
    }

    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();

        if (
            playerRect.left < goalRect.right &&
            playerRect.right > goalRect.left &&
            playerRect.top < goalRect.bottom &&
            playerRect.bottom > goalRect.top
        ) {
            setTimeout(() => {
                alert("¡Felicidades! ¡Has llegado al final del laberinto!");
            }, 100);
        }
    }

    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp": move(0, -10); break;
            case "ArrowDown": move(0, 10); break;
            case "ArrowLeft": move(-10, 0); break;
            case "ArrowRight": move(10, 0); break;
        }
    });


    // Obstáculos con operaciones
    const obstacles = document.querySelectorAll(".obstacle");

    function showMathChallenge(callback) {
        const operations = ["+", "-", "×", "÷"];
        const op = operations[Math.floor(Math.random() * operations.length)];
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let correctAnswer;

        if (op === "÷") {
            num1 = num1 * num2; // asegura división exacta
            correctAnswer = num1 / num2;
        } else if (op === "×") {
            correctAnswer = num1 * num2;
        } else if (op === "+") {
            correctAnswer = num1 + num2;
        } else {
            if (num2 > num1) [num1, num2] = [num2, num1]; // evita negativos
            correctAnswer = num1 - num2;
        }

        const userAnswer = prompt(`Resuelve: ${num1} ${op} ${num2}`);
        if (parseInt(userAnswer) === correctAnswer) {
            callback(true); // sigue el movimiento
        } else {
            callback(false); // no se mueve
        }
    }

    function checkObstacleCollision(callback) {
        const playerRect = player.getBoundingClientRect();
        for (let obs of obstacles) {
            const obsRect = obs.getBoundingClientRect();
            if (
                playerRect.left < obsRect.right &&
                playerRect.right > obsRect.left &&
                playerRect.top < obsRect.bottom &&
                playerRect.bottom > obsRect.top
            ) {
                showMathChallenge(callback);
                return;
            }
        }
        callback(true);
    }

    function move(dx, dy) {
        const newX = x + dx;
        const newY = y + dy;

        const mazeWidth = maze.offsetWidth;
        const mazeHeight = maze.offsetHeight;

        const maxX = mazeWidth - player.offsetWidth;
        const maxY = mazeHeight - player.offsetHeight;

        if (newX >= 0 && newX <= maxX && newY >= 0 && newY <= maxY) {
            const previousX = x;
            const previousY = y;

            x = newX;
            y = newY;
            player.style.left = x + "px";
            player.style.top = y + "px";

            checkObstacleCollision(function (canMove) {
                if (!canMove) {
                    x = previousX;
                    y = previousY;
                    player.style.left = x + "px";
                    player.style.top = y + "px";
                } else {
                    checkCollision();
                }
            });
        }
    }
});


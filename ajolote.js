document.addEventListener("DOMContentLoaded", function () {
    let ajolote = document.getElementById("ajolote");
    let musicaFondo = new Audio("audio/audio1.mp3"); 

    musicaFondo.loop = true;

    document.addEventListener("click", function iniciarMusica() {
        musicaFondo.play().catch(error => console.error("Error al reproducir la música:", error));
        document.removeEventListener("click", iniciarMusica); // Evitar que se inicie más de una vez
    });

    ajolote.classList.add("flotando");

    ajolote.addEventListener("click", function () {
        ajolote.classList.add("vibrate");

        setTimeout(() => {
            ajolote.classList.remove("vibrate");
        }, 200);
    });

    moverAjolote();  // Hacer que el ajolote se mueva constantemente

    let position = 0;
    let direction = 1;

    function moverAjolote() {
        if (position >= 30) direction = -1;
        if (position <= -30) direction = 1;

        position += direction;
        ajolote.style.transform = `translateX(-140px) translateY(${position}px)`;  // Movimiento vertical

        requestAnimationFrame(moverAjolote);
    }
});

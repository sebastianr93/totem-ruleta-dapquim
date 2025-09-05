
const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const girarBtn = document.getElementById("girarBtn");
canvas.width = 480;
canvas.height = 480;

const imagenes = {};


function precargarImagenes(callback) {
    let cargadas = 0;
    const total = premios.filter(p => p.tipo === "imagen").length;

    if (total === 0) {
        callback();
        return;
    }

    premios.forEach((premio, i) => {
        if (premio.tipo === "imagen") {
            const img = new Image();
            img.src = premio.valor;
            img.onload = () => {
                imagenes[i] = img;
                cargadas++;
                if (cargadas === total) callback();
            };
        }
    });
}

        // se utiliza \u2006\u2006 para hacer espacios entre las letras
        const premios = [
            { tipo: "texto", valor: "LA PRÓXIMA SERÁ...☹️" },
            { tipo: "imagen", valor: "img/DUTY.png" },
            { tipo: "imagen", valor: "img/8.png" },
            { tipo: "imagen", valor: "img/10.png" },
            { tipo: "imagen", valor: "img/ENVASADORA CASEROS.png" },
            { tipo: "texto", valor: "¡OTRA OPORTUNIDAD!🙂" },
            { tipo: "imagen", valor: "img/FLY HUNT.png" },
            { tipo: "imagen", valor: "img/11.png" },
            { tipo: "imagen", valor: "img/DAPQUIM BIROME GANADORA.png" },
            { tipo: "imagen", valor: "img/9.png" },
            { tipo: "imagen", valor: "img/HUAGRO.png" },
            { tipo: "imagen", valor: "img/DAPQUIM BOTELLA PARA VOS.png" }
        ];
        const colores = ["#FF0000", "#8A2BE2", "#0000FF", "#008000", "#FFFF00", "#FFA500"];

       
        let animacionEnCurso = false;

        const numSectores = premios.length;
        const anguloSector = (2 * Math.PI) / numSectores;
        let anguloActual = 0;




function dibujarRuleta() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSectores; i++) {
        const anguloInicio = i * anguloSector;
        const anguloFin = (i + 1) * anguloSector;

        // --- DIBUJAR SECTOR ---
        ctx.beginPath();
        ctx.moveTo(240, 240);
        ctx.arc(240, 240, 240, anguloInicio, anguloFin);
        ctx.fillStyle = colores[i % colores.length];
        ctx.fill();
        ctx.stroke();

        // --- POSICIONAR EN EL CENTRO DEL SECTOR ---
        ctx.save();
        ctx.translate(240, 240);
        ctx.rotate(anguloInicio + anguloSector / 2);

        const radioCentro = 150; // distancia desde el centro
        ctx.translate(radioCentro, 0);

        const premio = premios[i];

        if (premio.tipo === "texto") {
            ctx.fillStyle = (i % 2 === 0) ? "#ffffff" : "#ffffffff";
            ctx.font = "bold 14px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(premio.valor, 0, 0);
        }

        if (premio.tipo === "imagen" && imagenes[i]) {
            const img = imagenes[i];

            // Escalar la imagen para que ocupe casi todo el alto del segmento
            const maxSize = 120; // podés ajustar este número
            let w = img.width;
            let h = img.height;

            if (w > h) {
                h = (h / w) * maxSize;
                w = maxSize;
            } else {
                w = (w / h) * maxSize;
                h = maxSize;
            }

            ctx.drawImage(img, -w / 2, -h / 2, w, h);
        }

        ctx.restore();
    }
}   

        function girarRuleta() {
            if (animacionEnCurso) return;  // Previene que se ejecute varias veces
            animacionEnCurso = true;
            document.getElementById("audioGiro").play();
        
            girarBtn.disabled = true; // Deshabilitar el botón mientras gira
        
            // Probabilidades actualizadas
            const probabilidades = [
                { indice: 0, probabilidad: 0.09 },  // 80% de descuento
                { indice: 1, probabilidad: 0.09 },  // 2x1 en recargas
                { indice: 2, probabilidad: 0.09 },  // SMS gratis
                { indice: 3, probabilidad: 0.09 },  // ¡intenta de nuevo!
                { indice: 4, probabilidad: 0.08 },  // ¡Premio sorpresa!
                { indice: 5, probabilidad: 0.08 },  // ¡Ganaste una remera!
                { indice: 6, probabilidad: 0.08 },  // 10GB de regalo
                { indice: 7, probabilidad: 0.08 },
                { indice: 8, probabilidad: 0.08 },  // ¡Premio sorpresa!
                { indice: 9, probabilidad: 0.08 },  // ¡Ganaste una remera!
                { indice: 10, probabilidad: 0.08 },  // 10GB de regalo
                { indice: 11, probabilidad: 0.08 }    // Llamadas gratis
            ];
        
            // Calcular el índice del premio basado en las probabilidades
            let totalProbabilidad = 0;
            let probabilidadAleatoria = Math.random();
        
            let indicePremioSeleccionado = 0;
            for (let i = 0; i < probabilidades.length; i++) {
                totalProbabilidad += probabilidades[i].probabilidad;
                if (probabilidadAleatoria <= totalProbabilidad) {
                    indicePremioSeleccionado = i;
                    break;
                }
            }
        
            // Usamos el índice seleccionado para determinar el premio y el ángulo
            const premioSeleccionado = premios[indicePremioSeleccionado];
            const anguloSector = 360 / numSectores;
            const anguloCentroSeleccionado = anguloSector * indicePremioSeleccionado + anguloSector / 2;
            const girosCompletos = 5; // Número de giros completos antes de detenerse
            const rotacionBase = 360 * girosCompletos; // Rotación base (múltiples giros completos)
        
            // Cálculo del ángulo final
            const anguloFinal = rotacionBase + (360 - anguloCentroSeleccionado);
        
            // Aplicamos la rotación
            anguloActual = anguloFinal;
            canvas.style.transition = "transform 3s ease-out";
            canvas.style.transform = `rotate(${anguloActual}deg)`;
        
            // Mostrar animación de los premios
            mostrarPremiosAnimados();
        
            setTimeout(() => {
                // Cálculo del premio final
                const anguloPremio = (360 - (anguloActual % 360)) % 360;
                const indicePremioFinal = Math.floor(anguloPremio / (360 / numSectores));
                const premioGanador = premios[indicePremioFinal];
        
                // Mostrar el premio final después de la animación
                mostrarResultado(premioGanador);
        
                // Reseteamos la transformación para permitir nuevos giros
                setTimeout(() => {
                    canvas.style.transition = "none";
                    canvas.style.transform = `rotate(${anguloActual % 360}deg)`;
                    girarBtn.disabled = false;
                    animacionEnCurso = false; // Vuelve a habilitar la animación
        
                    // Detener el audio
                    document.getElementById("audioGiro").pause();
                    document.getElementById("audioGiro").currentTime = 0;
                }, 100);
            }, 3000);
        }
        
                
        function mostrarPremiosAnimados() {
            const resultadoDiv = document.getElementById("resultado");
            let contador = 0;
            const intervalo = setInterval(() => {
                const premio = premios[contador % premios.length];
                if (premio.tipo === "texto") {
                    resultadoDiv.innerHTML = (premios[contador % premios.length].tipo === "texto")
                    ? premios[contador % premios.length].valor
                    : `<img src="${premios[contador % premios.length].valor}" width="80" />`;;
                } else {
                    resultadoDiv.innerHTML = `<img src="${premio.valor}" width="80" />`;
                }
                contador++;
            }, 100);

            setTimeout(() => clearInterval(intervalo), 2500);
        }

        function animacionPorPremio(premio) {
            switch (premio) {
                case "¡Premio Sorpresa!" :
                    lanzarConfeti("sorpresa");
                    new Audio("files/fiesta.mp3").play();
                    break;
                case "En\u2006\u2006La\u2006\u2006Pera Consumición 2x1":
                    lanzarConfeti("fiesta");
                    break;
                case "Una\u2006\u2006Vuelta Mas":
                    lanzarConfeti("pera");
                    break;
                case "A\u2006\u2006Bailar":
                    lanzarConfeti("pera");
                    break;
                case "Te\u2006\u2006Pasaste":
                    lanzarConfeti("poquito");
                    break;
                case "Segui Participando":
                    lanzarConfeti("poquito");
                    break;
                case "Casi\u2006\u2006Casi":
                    lanzarConfeti("poquito");
                    break;
                default:
                    lanzarConfeti("default");
                    break;
            }
        }
        


        function mostrarResultado(premio) {
            const resultadoEl = document.getElementById("resultado");
            if (premio.tipo === "texto") {
                resultadoEl.innerHTML = `🎉 ¡ ${premio.valor} ! 🎉`;
            } else {
                resultadoEl.innerHTML = `🎉 <img src="${premio.valor}" width="100"/> 🎉`;
            }
            resultadoEl.classList.remove("animacion-ganador");
            void resultadoEl.offsetWidth;
            resultadoEl.classList.add("animacion-ganador");

            animacionPorPremio(premio.valor);
        }
                
        
        function lanzarConfeti(tipo = "default") {
            const duration = 3000;
            const animationEnd = Date.now() + duration;

            const configs = {
                sorpresa: { startVelocity: 45, spread: 360, ticks: 80, colors: ['#FFD700', '#FF69B4', '#00FFFF'] },
                pera: { startVelocity: 20, spread: 180, ticks: 50, colors: ['#9B59B6'] },
                fiesta: { startVelocity: 60, spread: 360, ticks: 90, colors: ['#FF0000', '#00FF00', '#0000FF'] },
                poquito: { startVelocity: 0, spread: 0, ticks: 0, colors: ['#AAAAAA'] },
                default: { startVelocity: 30, spread: 360, ticks: 60 }
            };

            const confettiConfig = Object.assign({ zIndex: 999 }, configs[tipo]);

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 40 * (timeLeft / duration);
                confetti(Object.assign({}, confettiConfig, {
                    particleCount,
                    origin: { x: Math.random() * 0.5, y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, confettiConfig, {
                    particleCount,
                    origin: { x: 1 - Math.random() * 0.5, y: Math.random() - 0.2 }
                }));
            }, 250);
        }

        
        
        precargarImagenes(dibujarRuleta);
        dibujarRuleta();

     

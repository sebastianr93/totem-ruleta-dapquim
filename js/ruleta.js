const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const girarBtn = document.getElementById("girarBtn");
canvas.width = 480;
canvas.height = 480;

// ===============================
// IMAGENES
// ===============================
const imagenes = {};

function precargarImagenes(callback) {
  const segmentos = configuracionDias[diaActual];
  let total = segmentos.filter(s => s.segmento.tipo === "imagen").length;
  let cargadas = 0;

  if (total === 0) {
    callback();
    return;
  }

  segmentos.forEach((seg, i) => {
    if (seg.segmento.tipo === "imagen") {
      const img = new Image();
      img.src = seg.segmento.valor;
      img.onload = () => {
        imagenes[seg.segmento.valor] = img;
        cargadas++;
        if (cargadas === total) callback();
      };
    }
  });
}


// ===============================
// CONFIGURACIÓN PREMIOS POR DÍA
// ===============================
const configuracionDias = {
  dia1: [
    {
    // HUAGRO
      segmento: { tipo: "imagen", valor: "img/HUAGRO.png" },
      premios: [
        { nombre: "HUAGRO FIPRO", stock: 9 },
        { nombre: "MIREX TROYA", stock: 24 }
      ]
    },
    // GLACOXAN
    {
      segmento: { tipo: "imagen", valor: "img/10.png" },
      premios: [{ nombre: "FIPROFENO", stock: 12 }]
    },
    // FLY HUNT
    {
      segmento: { tipo: "imagen", valor: "img/FLY HUNT.png" },
      premios: [
        { nombre: "CEBO + BALDE CHICO", stock: 3 },
        { nombre: "CEBO + BALDE GRANDE", stock: 3 }
      ]
    },
    // ENVASADORA CASEROS
    {
      segmento: { tipo: "imagen", valor: "img/ENVASADORA CASEROS.png" },
      premios: [
        { nombre: "LATA PEGATRAP ROEDORES", stock: 1 },
        { nombre: "LATA TUTE PALOMAS", stock: 1 },
        { nombre: "QUICK KILLER RATICIDA", stock: 1 }
      ]
    },
    // MAVERICK MAX
    {
      segmento: { tipo: "imagen", valor: "img/8.png" },
      premios: [{ nombre: "CUCARACHICIDA MAVERICK", stock: 12 }]
    },
    // MARISCAL IGR
    {
      segmento: { tipo: "imagen", valor: "img/9.png" },
      premios: [{ nombre: "HORMIGUICIDA MARISCAL", stock: 12 }]
    },
    // OTRA OPORTUNIDAD
    {
      segmento: { tipo: "texto", valor: "¡OTRA OPORTUNIDAD!" },
      premios: [{ nombre: "TIRA DE NUEVO", stock: 25 }]
    },
    // DUTY
    {
      segmento: { tipo: "imagen", valor: "img/DUTY.png" },
      premios: [
        { nombre: "MASCARA FULL FACE", stock: 1 },
        { nombre: "SEMIMASCARA TPR", stock: 1 },
        { nombre: "CARTUCHO GASES ACIDOS", stock: 1 },
        { nombre: "PAR DE GUANTES", stock: 1 },
        { nombre: "MAMELUCO DUTY BLANCO", stock: 1 },
        { nombre: "SEMIMASCARA SILICONA", stock: 0 },
        { nombre: "CARTUCHO VAPORES ORG.", stock: 0 },
        { nombre: "PAR DE GUANTES ACRILO NITRILO", stock: 0 },
        { nombre: "MAMELUCO DUTY AMARILLO", stock: 0 },
      ]
    },
    // CHINCHE STOP
    {
      segmento: { tipo: "imagen", valor: "img/11.png" },
      premios: [
        { nombre: "CHINCHE STOP", stock: 2 },
        { nombre: "ALFOMBRA PEGAMENTOSA", stock: 5 }
      ]
    },
    // DAPQUIM BOTELLA
    {
      segmento: { tipo: "imagen", valor: "img/DAPQUIM BOTELLA PARA VOS.png" },
      premios: [{ nombre: "BOTELLA DAPQUIM", stock: 15 }]
    },
    // DAPQUIM BIROME
    {
      segmento: { tipo: "imagen", valor: "img/DAPQUIM BIROME GANADORA.png" },
      premios: [{ nombre: "BIROME DAPQUIM", stock: 50 }]
    },
    // LA PROXIMA SERÁ
    {
      segmento: { tipo: "texto", valor: "LA PRÓXIMA SERÁ" },
      premios: [{ nombre: "BUENA SUERTE LA PROXIMA", stock: Infinity }]
    }
  ],
  dia2: [
    {
    // HUAGRO
      segmento: { tipo: "imagen", valor: "img/HUAGRO.png" },
      premios: [
        { nombre: "HUAGRO FIPRO", stock: 9 },
        { nombre: "MIREX TROYA", stock: 24 }
      ]
    },
    // GLACOXAN
    {
      segmento: { tipo: "imagen", valor: "img/10.png" },
      premios: [{ nombre: "FIPROFENO", stock: 12 }]
    },
    // FLY HUNT
    {
      segmento: { tipo: "imagen", valor: "img/FLY HUNT.png" },
      premios: [
        { nombre: "CEBO + BALDE CHICO", stock: 3 },
        { nombre: "CEBO + BALDE GRANDE", stock: 3 }
      ]
    },
    // ENVASADORA CASEROS
    {
      segmento: { tipo: "imagen", valor: "img/ENVASADORA CASEROS.png" },
      premios: [
        { nombre: "LATA PEGATRAP ROEDORES", stock: 1 },
        { nombre: "LATA TUTE PALOMAS", stock: 1 },
        { nombre: "QUICK KILLER RATICIDA", stock: 1 }
      ]
    },
    // MAVERICK MAX
    {
      segmento: { tipo: "imagen", valor: "img/8.png" },
      premios: [{ nombre: "CUCARACHICIDA MAVERICK", stock: 12 }]
    },
    // MARISCAL IGR
    {
      segmento: { tipo: "imagen", valor: "img/9.png" },
      premios: [{ nombre: "HORMIGUICIDA MARISCAL", stock: 12 }]
    },
    // OTRA OPORTUNIDAD
    {
      segmento: { tipo: "texto", valor: "¡OTRA OPORTUNIDAD!" },
      premios: [{ nombre: "TIRA DE NUEVO", stock: 25 }]
    },
    // DUTY
    {
      segmento: { tipo: "imagen", valor: "img/DUTY.png" },
      premios: [
        { nombre: "SEMIMASCARA SILICONA", stock: 1 },
        { nombre: "SEMIMASCARA TPR", stock: 0 },
        { nombre: "CARTUCHO VAPORES ORG.", stock: 1 },
        { nombre: "CARTUCHO GASES ACIDOS", stock: 0 },
        { nombre: "PAR DE GUANTES ACRILO NITRILO", stock: 1 },
        { nombre: "PAR DE GUANTES PVC", stock: 0 },
        { nombre: "MAMELUCO DUTY AMARILLO", stock: 1 },
        { nombre: "MAMELUCO DUTY BLANCO", stock: 0 },
        { nombre: "MASCARA FULL FACE", stock: 0 },
      ]
    },
    // CHINCHE STOP
    {
      segmento: { tipo: "imagen", valor: "img/11.png" },
      premios: [
        { nombre: "CHINCHE STOP", stock: 2 },
        { nombre: "ALFOMBRA PEGAMENTOSA", stock: 5 }
      ]
    },
    // DAPQUIM BOTELLA
    {
      segmento: { tipo: "imagen", valor: "img/DAPQUIM BOTELLA PARA VOS.png" },
      premios: [{ nombre: "BOTELLA DAPQUIM", stock: 15 }]
    },
    // DAPQUIM BIROME
    {
      segmento: { tipo: "imagen", valor: "img/DAPQUIM BIROME GANADORA.png" },
      premios: [{ nombre: "BIROME DAPQUIM", stock: 50 }]
    },

    // LA PROXIMA SERÁ
    {
      segmento: { tipo: "texto", valor: "LA PRÓXIMA SERÁ" },
      premios: [{ nombre: "BUENA SUERTE LA PROXIMA", stock: Infinity }]
    }
  ]
};

// ===============================
// VARIABLES DE ESTADO
// ===============================
let diaActual = "dia1"; // o "dia2"
let modoPrueba = false; // si true no descuenta stock

let animacionEnCurso = false;
let anguloActual = 0;

// ===============================
// FUNCIONES DE PREMIOS
// ===============================
function getSegmentosDisponibles() {
  return configuracionDias[diaActual].filter(seg =>
    seg.premios.some(p => p.stock > 0 || p.stock === Infinity)
  );
}

function elegirPremio() {
  const segmentos = getSegmentosDisponibles();
  const indiceSegmento = Math.floor(Math.random() * segmentos.length);
  const segmento = segmentos[indiceSegmento];

  const premiosDisponibles = segmento.premios.filter(
    p => p.stock > 0 || p.stock === Infinity
  );

  const indicePremio = Math.floor(Math.random() * premiosDisponibles.length);
  const premio = premiosDisponibles[indicePremio];

  if (!modoPrueba && premio.stock !== Infinity) {
    premio.stock--;
  }

  // devolvemos el segmento completo, no solo segmento.segmento
  return { segmento, premio, indiceSegmento, totalSegmentos: segmentos.length };
}

// ===============================
// DIBUJAR RULETA
// ===============================
function dibujarRuleta() {
  const segmentos = getSegmentosDisponibles();
  const numSectores = segmentos.length;
  const anguloSector = (2 * Math.PI) / numSectores;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numSectores; i++) {
    const anguloInicio = i * anguloSector;
    const anguloFin = (i + 1) * anguloSector;

    ctx.beginPath();
    ctx.moveTo(240, 240);
    ctx.arc(240, 240, 240, anguloInicio, anguloFin);
    ctx.fillStyle = ["#FF0000", "#8A2BE2", "#0000FF", "#008000", "#FFFF00", "#FFA500"][i % 6];
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(240, 240);
    ctx.rotate(anguloInicio + anguloSector / 2);

    const radioCentro = 150;
    ctx.translate(radioCentro, 0);

    const seg = segmentos[i].segmento;

    if (seg.tipo === "texto") {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(seg.valor, 0, 0);
    } else if (seg.tipo === "imagen") {
      const img = imagenes[seg.valor];
      if (img) {
        const maxSize = 120;
        let w = img.width, h = img.height;
        if (w > h) {
          h = (h / w) * maxSize;
          w = maxSize;
        } else {
          w = (w / h) * maxSize;
          h = maxSize;
        }
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
      }
    }

    ctx.restore();
  }
}

// ===============================
// GIRO DE RULETA
// ===============================
function girarRuleta() {
  if (animacionEnCurso) return;
  animacionEnCurso = true;
  girarBtn.disabled = true;

  const audioGiro = document.getElementById("audioGiro");
  audioGiro.currentTime = 0;
  audioGiro.play();

  const resultado = elegirPremio();

  const anguloSector = 360 / resultado.totalSegmentos;
  const anguloCentro = resultado.indiceSegmento * anguloSector + anguloSector / 2;
  const girosCompletos = 5;
  const anguloFinal = girosCompletos * 360 + (360 - anguloCentro);

  anguloActual = anguloFinal;

  // Forzar reflow antes de aplicar la transición
  canvas.style.transition = "transform 3s ease-out";
  canvas.offsetWidth; // fuerza reflow
  canvas.style.transform = `rotate(${anguloActual}deg)`;

  // Mostrar resultado al terminar la animación
  canvas.addEventListener("transitionend", function handler() {
    // Eliminar el listener para que no se llame varias veces
    canvas.removeEventListener("transitionend", handler);

    mostrarResultado(resultado.premio, resultado.segmento);

    // Resetear la ruleta para evitar ángulos grandes
    canvas.style.transition = "none";
    canvas.style.transform = `rotate(${anguloActual % 360}deg)`;

    girarBtn.disabled = false;
    animacionEnCurso = false;

    audioGiro.pause();
    audioGiro.currentTime = 0;
  });
}


// ===============================
// MOSTRAR RESULTADO
// ===============================
function mostrarResultado(premio, segmento) {
  const resultadoEl = document.getElementById("resultado");

  // Cambiamos solo el contenido según el premio
  let html = ` ${premio.nombre} `;
  if (segmento.segmento.tipo === "imagen" && imagenes[segmento.segmento.valor]) {
    html = `
      ¡FELICIDADES! GANASTE <br>
      🎉 ${premio.nombre} 🎉
    `;
  }

  resultadoEl.innerHTML = html;

  // Asegurarse de que siempre se vea
  resultadoEl.style.opacity = "1";
  resultadoEl.style.transform = "scale(1.2)";

  // Opcional: desvanecer después de 3 segundos
  setTimeout(() => {
    resultadoEl.style.opacity = "0";
    resultadoEl.style.transform = "scale(1)";
  }, 3000);

  aplicarEfectos(premio.nombre);
}

// ===============================
// EFECTOS SEGÚN PREMIO
// ===============================
function aplicarEfectos(nombrePremio) {
  const audioFiesta = new Audio("files/fiesta.mp3");

  switch (nombrePremio.toUpperCase()) {
    case "CEBO + BALDE GRANDE":
    case "QUICK KILLER RATICIDA":
    case "MASCARA FULL FACE":
    case "SEMIMASCARA TPR":
    case "CARTUCHO GASES ACIDOS":
    case "PAR DE GUANTES PVC":
    case "MAMELUCO DUTY BLANCO":
    case "SEMIMASCARA SILICONA":
    case "CARTUCHO VAPORES ORG.":
    case "PAR DE GUANTES ACRILO NITRILO":
    case "MAMELUCO DUTY AMARILLO":
      lanzarConfeti("sorpresa");
      audioFiesta.play();
      break;

    default:
      break;
  }
}

// ===============================
// CONFETI
// ===============================
function lanzarConfeti(tipo = "default") {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const configs = {
    sorpresa: { startVelocity: 45, spread: 360, ticks: 80, colors: ["#FFD700", "#FF69B4", "#00FFFF"] },
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

// ===============================
// MENÚ DE CONTROL HAMBURGUESA
// ===============================
function crearMenuControl() {
  // Botón hamburguesa
  const btnMenu = document.createElement("button");
  btnMenu.id = "btnMenu";
  btnMenu.innerHTML = "&#9776;";
  btnMenu.style.position = "fixed";
  btnMenu.style.top = "20px";
  btnMenu.style.right = "20px";
  btnMenu.style.zIndex = "1001";
  btnMenu.style.fontSize = "32px";
  btnMenu.style.background = "#fff";
  btnMenu.style.border = "2px solid #333";
  btnMenu.style.borderRadius = "8px";
  btnMenu.style.padding = "8px";
  btnMenu.style.cursor = "pointer";
  document.body.appendChild(btnMenu);

  // Menú flotante
  const menu = document.createElement("div");
  menu.id = "menuControl";
  menu.style.position = "fixed";
  menu.style.top = "70px";
  menu.style.right = "20px";
  menu.style.background = "#fff";
  menu.style.border = "2px solid #333";
  menu.style.borderRadius = "12px";
  menu.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
  menu.style.padding = "18px 20px";
  menu.style.zIndex = "1000";
  menu.style.display = "none";
  menu.style.minWidth = "220px";

  // Switch modo prueba
  const modoDiv = document.createElement("div");
  modoDiv.style.marginBottom = "16px";
  modoDiv.innerHTML = `
    <label style="font-weight:bold;">
      <input type="checkbox" id="switchModoPrueba" ${modoPrueba ? "checked" : ""}>
      Modo Prueba
    </label>
    <span id="cartelModoPrueba" style="color:#FFD700; font-weight:bold; margin-left:8px; display:${modoPrueba ? "inline" : "none"};">
      [Modo Prueba]
    </span>
  `;

  // Selector de día
  const diaDiv = document.createElement("div");
  diaDiv.style.marginBottom = "16px";
  diaDiv.innerHTML = `
    <label style="font-weight:bold;">Día:
      <select id="selectDia">
        <option value="dia1" ${diaActual === "dia1" ? "selected" : ""}>Día 1</option>
        <option value="dia2" ${diaActual === "dia2" ? "selected" : ""}>Día 2</option>
      </select>
    </label>
  `;

  // Botón reiniciar
  const reiniciarDiv = document.createElement("div");
  reiniciarDiv.innerHTML = `
    <button id="btnReiniciar" style="background:#FF6347;color:#fff;font-weight:bold;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">
      Reiniciar Ruleta
    </button>
    <span id="cartelReiniciar" style="color:#008000; font-weight:bold; margin-left:8px; display:none;">
      ¡Ruleta reiniciada!
    </span>
  `;

  menu.appendChild(modoDiv);
  menu.appendChild(diaDiv);
  menu.appendChild(reiniciarDiv);
  document.body.appendChild(menu);

  // Abrir/cerrar menú
  btnMenu.addEventListener("click", () => {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });

  // Switch modo prueba
  document.getElementById("switchModoPrueba").addEventListener("change", e => {
    modoPrueba = e.target.checked;
    document.getElementById("cartelModoPrueba").style.display = modoPrueba ? "inline" : "none";
  });

  // Selector de día con validación
  document.getElementById("selectDia").addEventListener("change", e => {
    const nuevoDia = e.target.value;
    mostrarValidacion("¿Cambiar al " + (nuevoDia === "dia1" ? "Día 1" : "Día 2") + "?", () => {
      diaActual = nuevoDia;
      precargarImagenes(() => dibujarRuleta());
    }, () => {
      e.target.value = diaActual; // cancelar
    });
  });

  // Reiniciar ruleta con validación
  document.getElementById("btnReiniciar").addEventListener("click", () => {
    mostrarValidacion("¿Reiniciar todos los premios?", () => {
      Object.keys(configuracionDias).forEach(dia => {
        configuracionDias[dia].forEach(seg => {
          seg.premios.forEach(p => {
            if (typeof p._stockOriginal === "undefined") p._stockOriginal = p.stock;
            p.stock = p._stockOriginal;
          });
        });
      });
      precargarImagenes(() => dibujarRuleta());
      mostrarCartelReiniciado();
    });
  });
}

// Validación personalizada (no nativa)
function mostrarValidacion(mensaje, onOk, onCancel) {
  let valDiv = document.getElementById("validacionMenu");
  if (!valDiv) {
    valDiv = document.createElement("div");
    valDiv.id = "validacionMenu";
    valDiv.style.position = "fixed";
    valDiv.style.top = "50%";
    valDiv.style.left = "50%";
    valDiv.style.transform = "translate(-50%,-50%)";
    valDiv.style.background = "#fff";
    valDiv.style.border = "2px solid #333";
    valDiv.style.borderRadius = "10px";
    valDiv.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
    valDiv.style.padding = "24px 32px";
    valDiv.style.zIndex = "2000";
    valDiv.style.textAlign = "center";
    document.body.appendChild(valDiv);
  }
  valDiv.innerHTML = `
    <div style="font-size:18px; margin-bottom:18px;">${mensaje}</div>
    <button id="btnOk" style="background:#008000;color:#fff;font-weight:bold;border:none;padding:8px 18px;border-radius:6px;cursor:pointer;margin-right:12px;">Sí</button>
    <button id="btnCancel" style="background:#aaa;color:#fff;font-weight:bold;border:none;padding:8px 18px;border-radius:6px;cursor:pointer;">No</button>
  `;
  valDiv.style.display = "block";
  document.getElementById("btnOk").onclick = () => {
    valDiv.style.display = "none";
    onOk();
  };
  document.getElementById("btnCancel").onclick = () => {
    valDiv.style.display = "none";
    if (onCancel) onCancel();
  };
}

// Cartel reiniciado
function mostrarCartelReiniciado() {
  const cartel = document.getElementById("cartelReiniciar");
  cartel.style.display = "inline";
  setTimeout(() => {
    cartel.style.display = "none";
  }, 2000);
}

// Inicializar menú al cargar
crearMenuControl();

// ===============================
// INICIALIZACIÓN
// ===============================
  precargarImagenes(() => {
    dibujarRuleta();
  });


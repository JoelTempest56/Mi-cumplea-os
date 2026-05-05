// Usamos const (sesión 17) para que la fecha no se cambie mientras vaya funcionando
// new date() crea un objeto de fecha
// const EL_DIA_DE_MI_CUMPLE = new Date("2026-08-31");

// Configuración de prueba (10 segundos) para verificar sonido y confeti rápido
let EL_DIA_DE_MI_CUMPLE = new Date();
EL_DIA_DE_MI_CUMPLE.setSeconds(EL_DIA_DE_MI_CUMPLE.getSeconds() + 10);

// Capturamos el botón y el audio para la lógica de inicio (Sesión 18)
const boton = document.getElementById("boton-empezar");
const audioGlobal = document.getElementById("sonido-cumple");

// Evento para arrancar: el programa espera al clic para asegurar el permiso de audio
boton.addEventListener("click", function() {
    
    // "Truco" para que el navegador dé permiso de sonido al momento del cumple
    if (audioGlobal) {
        audioGlobal.play().then(() => {
            audioGlobal.pause();
            audioGlobal.currentTime = 0;
        }).catch(e => console.log("Esperando interacción..."));
    }

    // Intercambiamos las pantallas
    document.getElementById("pantalla-inicio").style.display = "none";
    
    // IMPORTANTE: Usamos 'flex' para que herede el centrado que definimos en el CSS
    document.getElementById("contenido-contador").style.display = "flex";

    // Ahora sí, llamamos a tu función para que empiece a trabajar
    handleTimeout(); 
});

function handleTimeout() {
  const s = calculaLosSegundos(); // Cuantos segundos faltan
  const valor = conversor(s); // Convierte los segundos en dias, horas y minutos

  // Confeti en 4 esquinas + Sonido + Cambio Visual
  if (valor.isMyBirthday) { // Cuando llega mi cumple
    
    // Esquina Superior Izquierda
    confetti({
      origin: { x: 0, y: 0 },
      particleCount: 200, 
      scalar: 2, 
      velocity: 70, 
      spread: 90,
      angle: 315
    });

    // Esquina Superior Derecha
    confetti({
      origin: { x: 1, y: 0 },
      particleCount: 100,
      scalar: 1,
      velocity: 70,
      spread: 90,
      angle: 225
    });

    // Los window de position sirve para saber el tamaño de la pantalla del usuario y disparar desde las esquinas

    // Esquina Inferior Izquierda
    confetti({
      origin: { x: 0, y: 1 },
      particleCount: 100,
      scalar: 1,
      velocity: 70,
      spread: 90,
      angle: 45
    });

    // Esquina Inferior Derecha
    confetti({
      origin: { x: 1, y: 1 },
      particleCount: 100,
      scalar: 1,
      velocity: 70,
      spread: 90,
      angle: 135
    });

    // Reproducir sonido (Sesión 18)
    // El docuement es todo el html
    // getElementById es un metodo de busqueda que va al HTML y busca la etiqueta que tenga ese id
    if (audioGlobal) {
      audioGlobal.play();
    }

    // Cambios en el DOM (Sesión 18 y 19)
    // classList es una propiedad del DOM que guarda todas las clases CSS que tiene esa etiqueta
    // .add("cumpleaños") hace que se añada una nueva clase.
    document.body.classList.add("cumpleaños"); 
    document.getElementById("titulo-principal").innerText = "¡FELIZ CUMPLEAÑOS!";
    
    // Para que el confeti no se detenga y siga saliendo de las esquinas
    setTimeout(handleTimeout, 3000);
    return; // Detiene el cronómetro para que no siga restando
  }

  printar(valor);
  
  // 3. Recursividad: se llama a sí mismo cada segundo (Estilo profe)
  setTimeout(handleTimeout, 1000);
}

/**
 * Calcula los segundos restantes
 * @returns {number}
 */
function calculaLosSegundos() {
  const elDiaDeMiCumple = EL_DIA_DE_MI_CUMPLE;
  const timestampDelDiaDeMiCumple = elDiaDeMiCumple.getTime(); // el getTime convierte una fecha en un número
  const timestampDeHoy = new Date().getTime();
  const milisegundos = timestampDelDiaDeMiCumple - timestampDeHoy; // Cumple - Hoy

  // función de conversión como el profe
  return conversorMilisegundosASegundos(milisegundos);
}

// Convierte milisegundos a segundos
function conversorMilisegundosASegundos(m) {
  return m / 1000;
}

/**
 * Descompone los segundos en el objeto de tiempo
 * @param {number} segundos 
 */
function conversor(segundos) {
  let m = Math.floor(segundos / 60); // Math.floor es una funcion que redondea hacia abajo
  const s = segundos % 60;
  let h = Math.floor(m / 60);
  m = m % 60;
  const d = Math.floor(h / 24);
  h = h % 24;

  // Comparación estricta (Sesión 17)
  const esMiCumple = segundos <= 0;

  // Permite que una función devuelva 5 datos distintos empaquetados en una sola variable.
  return {
    dias: d,
    horas: h,
    minutos: m,
    segundos: Math.floor(s),
    isMyBirthday: esMiCumple
  };
}

// coge los números que has calculado y escribirlos en el lugar correcto de tu página web
function printar(valor) { 
  // document.getElementById("dias"): Viaja al DOM (tu HTML) y busca la etiqueta que tiene el id="dias"
  // innerText es la propiedad que controla el texto visible. 
  // valor.dias: Sacamos el dato del "paquete" usando el punto (.)
  document.getElementById("dias").innerText = valor.dias;
  document.getElementById("horas").innerText = valor.horas;
  document.getElementById("minutos").innerText = valor.minutos;
  document.getElementById("segundos").innerText = valor.segundos;
}
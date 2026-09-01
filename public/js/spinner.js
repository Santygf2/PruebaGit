// ===== Overlay de carga a pantalla completa (CuidArte) =====
// Muestra una animación de carga en pantalla completa cuando se envía un
// formulario o se hace clic en un enlace marcado con data-spinner.
//
// Diseño: una PAREJA DE ADULTOS MAYORES caminando (símbolo del cuidado de
// CuidArte) sobre unas barritas animadas de carga, con el nombre "CuidArte".
//
// Comportamiento:
//  - En formularios: al enviar, bloquea la pantalla con el overlay.
//  - En enlaces con data-spinner (ej. Cerrar Sesión): muestra el overlay y
//    redirige tras un breve instante para que el usuario lo vea.
//  - Para desactivarlo en un botón/enlace concreto usa:  data-no-spinner

var SPINNER_MIN_VISIBLE = 800; // ms mínimo que se ve el overlay

// SVG de una persona mayor (viejito) sencilla, con bastón
function svgViejito() {
  return (
    '<svg viewBox="0 0 100 100">' +
      // Cabeza
      '<circle cx="50" cy="22" r="12" fill="#F4C6A3"/>' +
      // Cabello gris
      '<path d="M38 20 a12 12 0 0 1 24 0 l-3 -2 a9 9 0 0 0 -18 0 z" fill="#9CA3AF"/>' +
      // Ojos
      '<circle cx="46" cy="22" r="1.6" fill="#374151"/>' +
      '<circle cx="54" cy="22" r="1.6" fill="#374151"/>' +
      // Torso (chaqueta celeste)
      '<rect x="36" y="36" width="28" height="30" rx="8" fill="#27BEF5"/>' +
      // Botones
      '<circle cx="50" cy="44" r="1.4" fill="#fff"/>' +
      '<circle cx="50" cy="54" r="1.4" fill="#fff"/>' +
      // Brazos
      '<rect x="30" y="40" width="8" height="14" rx="4" fill="#27BEF5"/>' +
      '<rect x="62" y="40" width="8" height="14" rx="4" fill="#27BEF5"/>' +
      // Bastón en la mano derecha
      '<g class="baston">' +
        '<rect x="70" y="34" width="3" height="40" rx="1.5" fill="#92400E"/>' +
        '<rect x="67" y="34" width="9" height="4" rx="2" fill="#92400E"/>' +
      '</g>' +
      // Piernas
      '<g class="pierna-izq"><rect x="41" y="64" width="7" height="26" rx="3" fill="#374151"/><rect x="38" y="86" width="13" height="6" rx="3" fill="#374151"/></g>' +
      '<g class="pierna-der"><rect x="52" y="64" width="7" height="26" rx="3" fill="#374151"/><rect x="49" y="86" width="13" height="6" rx="3" fill="#374151"/></g>' +
    '</svg>'
  );
}

// SVG de una persona mayor con vestido largo (la otra de la pareja)
function svgViejita() {
  return (
    '<svg viewBox="0 0 100 100">' +
      // Cabeza
      '<circle cx="50" cy="22" r="12" fill="#F4C6A3"/>' +
      // Cabello gris recogido
      '<path d="M38 20 a12 12 0 0 1 24 0 l-3 -1 a9 9 0 0 0 -18 0 z" fill="#B0B7C0"/>' +
      '<circle cx="50" cy="9" r="4" fill="#B0B7C0"/>' +
      // Ojos
      '<circle cx="46" cy="22" r="1.6" fill="#374151"/>' +
      '<circle cx="54" cy="22" r="1.6" fill="#374151"/>' +
      // Torso / vestido (celeste claro)
      '<path d="M36 36 h28 v14 a14 20 0 0 1 -28 0 z" fill="#6DD5FA"/>' +
      // Cuello
      '<rect x="46" y="32" width="8" height="6" rx="2" fill="#F4C6A3"/>' +
      // Brazos
      '<rect x="30" y="40" width="8" height="14" rx="4" fill="#6DD5FA"/>' +
      '<rect x="62" y="40" width="8" height="14" rx="4" fill="#6DD5FA"/>' +
      // Piernas (asoman bajo el vestido)
      '<g class="pierna-izq"><rect x="41" y="66" width="7" height="22" rx="3" fill="#374151"/><rect x="38" y="84" width="13" height="6" rx="3" fill="#374151"/></g>' +
      '<g class="pierna-der"><rect x="52" y="66" width="7" height="22" rx="3" fill="#374151"/><rect x="49" y="84" width="13" height="6" rx="3" fill="#374151"/></g>' +
    '</svg>'
  );
}

// Barritas de carga (rayitas que suben y bajan)
function crearBarritas() {
  var cont = document.createElement('div');
  cont.className = 'overlay-barritas';
  for (var i = 0; i < 5; i++) {
    var b = document.createElement('div');
    b.className = 'overlay-barrita' + (i > 0 ? ' b' + (i + 1) : '');
    cont.appendChild(b);
  }
  return cont;
}

function crearOverlay(texto) {
  var ov = document.getElementById('carga-overlay');
  if (ov) return ov;

  ov = document.createElement('div');
  ov.id = 'carga-overlay';

  // Escena con la pareja de viejitos caminando sobre el suelo
  var escena = document.createElement('div');
  escena.className = 'overlay-escena';

  var p1 = document.createElement('div');
  p1.className = 'overlay-par p1';
  p1.innerHTML = svgViejito();
  escena.appendChild(p1);

  var p2 = document.createElement('div');
  p2.className = 'overlay-par p2';
  p2.innerHTML = svgViejita();
  escena.appendChild(p2);

  var suelo = document.createElement('div');
  suelo.className = 'overlay-suelo';
  escena.appendChild(suelo);

  ov.appendChild(escena);
  ov.appendChild(crearBarritas());

  // Marca "CuidArte"
  var marca = document.createElement('div');
  marca.className = 'overlay-marca';
  marca.innerHTML = 'Cuid<span>Arte</span>';
  ov.appendChild(marca);

  // Texto de estado
  var textoEl = document.createElement('div');
  textoEl.className = 'overlay-texto';
  textoEl.textContent = texto || 'Procesando...';
  ov.appendChild(textoEl);

  document.body.appendChild(ov);
  return ov;
}

function mostrarOverlay(texto) {
  crearOverlay(texto).classList.add('mostrar');
}

// Al cargar la página, eliminar cualquier overlay residual para evitar estados pegados
document.addEventListener('DOMContentLoaded', function () {
  var ov = document.getElementById('carga-overlay');
  if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
});

// ---------- Formularios (botones submit) ----------
document.addEventListener('submit', function (e) {
  var form = e.target;
  if (!form || typeof form.querySelector !== 'function') return;
  var btn = form.querySelector('button[type="submit"]');
  // Si la validación del formulario falla, asegurarnos de no dejar overlay
  if (form.checkValidity && !form.checkValidity()) {
    var ov = document.getElementById('carga-overlay');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    if (btn) btn.disabled = false;
    return; // campos requeridos sin llenar
  }
  if (!btn || btn.dataset.noSpinner) return; // data-no-spinner lo desactiva
  mostrarOverlay(btn.dataset.spinnerTexto || 'Procesando...');
  if (btn) btn.disabled = true;
});

// ---------- Enlaces con data-spinner (ej. Cerrar Sesión) ----------
document.addEventListener('click', function (e) {
  var link = e.target.closest && e.target.closest('a[data-spinner]');
  if (!link) return;
  if (link.dataset.noSpinner) return;
  if (link.target === '_blank') return; // enlaces externos/nueva pestaña

  e.preventDefault(); // tomamos control del enlace

  mostrarOverlay(link.dataset.spinnerTexto || 'Cargando...');

  // Deja que el overlay se dibuje y redirige tras un mínimo visible
  setTimeout(function () {
    window.location.href = link.href;
  }, SPINNER_MIN_VISIBLE);
});
// -------------------------
// Pantalla de bienvenida
// -------------------------
const btnEntrar = document.getElementById('entrar');
const bienvenida = document.getElementById('bienvenida');
const contenidoWeb = document.getElementById('contenido-web');

btnEntrar.addEventListener('click', () => {
    bienvenida.style.display = 'none';
    contenidoWeb.style.display = 'block';
});

// -------------------------
// Contador de días juntos
// -------------------------
const fechaInicio = new Date("2025-05-25");

function actualizarContador() {
    const hoy = new Date();
    const diffTiempo = hoy - fechaInicio;
    const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24));
    document.getElementById("contador").textContent = diffDias + " días";
}

actualizarContador();
setInterval(actualizarContador, 1000 * 60 * 60);

// -------------------------
// Carrusel de fotos
// -------------------------
const fotos = document.querySelectorAll('#carrusel-izquierda .carrusel img');
let indice = 0;

function mostrarFoto() {
    fotos.forEach((img, i) => {
        img.classList.remove('activa');
        if(i === indice) img.classList.add('activa');
    });
    indice = (indice + 1) % fotos.length;
}

mostrarFoto();
setInterval(mostrarFoto, 5000);

// -------------------------
// Blog: publicar, editar y borrar entradas
// -------------------------
const listaEntradas = document.getElementById('lista-entradas');
let entradas = JSON.parse(localStorage.getItem('entradas')) || [];

function mostrarEntradas() {
    listaEntradas.innerHTML = '';
    entradas.forEach((e, i) => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${e.titulo}</h3>
            <p>${e.contenido}</p>
            <div class="acciones">
                <button class="editar" data-indice="${i}">Editar</button>
                <button class="borrar" data-indice="${i}">Borrar</button>
            </div>
        `;
        listaEntradas.appendChild(article);
    });

    document.querySelectorAll('.borrar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.indice;
            entradas.splice(index, 1);
            localStorage.setItem('entradas', JSON.stringify(entradas));
            mostrarEntradas();
        });
    });

    document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.indice;
            document.getElementById('titulo').value = entradas[index].titulo;
            document.getElementById('contenido').value = entradas[index].contenido;

            formEntrada.onsubmit = function(ev) {
                ev.preventDefault();
                entradas[index].titulo = document.getElementById('titulo').value.trim();
                entradas[index].contenido = document.getElementById('contenido').value.trim();
                localStorage.setItem('entradas', JSON.stringify(entradas));
                mostrarEntradas();
                formEntrada.reset();
                formEntrada.onsubmit = agregarEntradaOriginal;
            }
        });
    });
}

function agregarEntradaOriginal(e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value.trim();
    const contenido = document.getElementById('contenido').value.trim();

    if(titulo && contenido) {
        entradas.push({ titulo, contenido });
        localStorage.setItem('entradas', JSON.stringify(entradas));
        mostrarEntradas();
        formEntrada.reset();
    }
}

mostrarEntradas();
formEntrada.addEventListener('submit', agregarEntradaOriginal);

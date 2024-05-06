// document.querySelector('.app__card-button--corto').onclick = function(){
//     document.querySelector('html').attributes[1].value="descanso-corto";
// };

const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIP = document.querySelector('#start-pause');
const textoIP = document.querySelector('#start-pause span');
const tiempoDisplay = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const musicaInicio = new Audio('./sonidos/play.wav');
const musicaPause = new Audio('./sonidos/pause.mp3')
const musicaTerminar = new Audio('./sonidos/beep.mp3');

const imagenB = document.querySelector('.app__card-primary-butto-icon');
const imagenC= './imagenes/play_arrow.png';
const imagenP = './imagenes/pause.png';


let tiempoTranscurrido = 1500;
let idIntervalo = null;

//para repetir la musica cuando termine
musica.loop= true;

// utilizando el arrow function, trata de una función que no es necesario 
// utilizar la palabra reservada "function" 
botonCorto.addEventListener('click', () => {
    tiempoTranscurrido = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () =>{
    tiempoTranscurrido = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () =>{
    tiempoTranscurrido = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

inputEnfoqueMusica.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

function cambiarContexto(contexto){
    mostrarTiempo();
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png` );


    switch(contexto){
        case 'enfoque':
                    titulo.innerHTML=`Optimiza tu productividad,<br>
                    <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case 'descanso-corto':
                titulo.innerHTML=`¿Qué tal tomar un respiro?,<br>
                <strong class="app__title-strong">¡Haz una pausa corta!.</strong>`;
            break;
        case 'descanso-largo':
                titulo.innerHTML=`Hora de volver a la superficie,<br>
                <strong class="app__title-strong">¡Haz una pausa larga!.</strong>`;
            break;
        default:
            break;
    }
}




const cuentaRegresiva = () => {
    if(tiempoTranscurrido <= 0 ){
        reiniciar();
        musicaTerminar.play();
        alert('Tiempo final')
        return 
    }

    tiempoTranscurrido -= 1;
    mostrarTiempo();
    // console.log("tiempo " + tiempoTranscurrido);
}


function iniciarPausar(){
    
    if(idIntervalo){
        
        musicaPause.play();
        reiniciar();
        return
    }
    textoIP.textContent = "Pausar";
    imagenB.setAttribute('src', imagenP);
    musicaInicio.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

botonIP.addEventListener('click', () =>{
    iniciarPausar();
    
})


function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoIP.textContent = "Comenzar";
    imagenB.setAttribute('src', imagenC);
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurrido * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit', second:'2-digit'});
    tiempoDisplay.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()


//manipulaciones de elemtos: 
// getAttribute, setAttribute, hasAttribute y removeAttribute.
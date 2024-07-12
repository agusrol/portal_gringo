/*Las líneas del 1-20 son las funciones que  dan vida al carrusel. Se define una variable current index que guarda el valor actual de índice
de foto de carrusel que se está mostrando. El índice va de 0 a n-1 con n siendo el número de fotos que hay (o elementos) en el carrusel. Estos
elementos son los carousel-item. moveSlide(direction) hace el movimiento del carousel a partir de hacer click en las flechas, la dirección puede
ser 1 o -1, para derecha e izquierda respectivamente. A partir de esa dirección se calcula la posición nueva del currentIndex y luego lo que hacemos
es poner sacar el active de los otros índices no seleccionados y activamos el active en el índice seleccionado, esto de active es un atributo que 
se pone en la tag del html. , usando El autoSlide es una función que al invocarse pasa a la siguiente foto (es lo mismo que 
llamar moveSlide con 1 de argumento). Por último */
let currentIndex = 0;
function moveSlide(direction) {
    /*Obtenemos todos los elementos .carousel-item*/
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    /*Sumo dirección +1 o -1 a índice actual y hago operación modular (sumo total de ítems porque si no queda negativo el mod)*/
    currentIndex = (currentIndex + direction + totalItems ) % totalItems;
    /*Usamos la función translateX de CSS (esta línea la agrega a la regla de los .carousel-inner y corre de a 100%. La función transform opera
    visualmente desde la posición en la que esté. Si estamos en el item 1 (o sea, el que sigue al item 0) estamos en un -100%, cuando pasamos al item
    2 se hace un translateX(-200%), pero como ya estamos en -100% se mueve un -100%. Hay que imaginar esto como una cinta de 300% de ancho, que
    se va rotando y cuando llegamos al último item vuelve al 0%*/
    document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
     /*Reetiquetado para desaparecer lo que no quiero que rompa la bija*/
    items.forEach(item => item.classList.remove('active'));
    items[currentIndex].classList.add('active');
    /*Actualizo puntitos */

}
/* Las líneas siguientes, de la 26-31, se encargan de desplazar las imágene del carrusel automáticamente cada 3 segundos.*/
/* Función que llama a moveSlide con 1 como parámetro, o sea, corre para el siguiente item.*/
function autoSlide() {
    moveSlide(1);
}
/* la función setInterval se usa para invocar una función cada una cantidad determinada de milisegundos. El primer argumento es la función, el segundo los ms.*/
const slideInterval = setInterval(autoSlide, 3000);

/*El siguiente es un listener que se ejecuta una vez que se carga todo el DOM, es decir los tags de html (no necesariamente las imágenes, pero el tag de la imagen sí,
entre otros). A grandes rasgos, abre y cierra los submenúes. Veamos:

mostrarMenu(idMenu) se encarga de mostrar/ocultar ÚNICAMENTE EN LA VISTA DE CELULAR el menú cuando hacemos click en el símbolo de hamburguesa. Ahora,
este sería el callback (un callback es una función llamada por otra función que escucha todo el tiempo los eventos, un listener) llamado por el
listener que definimos después para la clase button.hamburguesa. O sea, agarramos y nos traemos todos los tags button con la claes de css hamburguesa 
y a esos (que en realiad es uno sólo) le agregamos un "listener" (o sea una función que va a accionar un callback cuando alguien haga click en ese
elemento) que va a llamar a mostrarMenu (con 'menu', que es el id del menú que queremos abrir. Esto se puede hacer de muchas maneras, no tengas dudas
de eso...esta es una).

Después definimos 2 funciones más, las cuáles se encargan de abrir el  submenú que clickeemos y también de cerrar los otros submenús.

*/

document.addEventListener('DOMContentLoaded', function() {
    /*Esta es la parte para abrir/cerrar el menú en celulares con el ícono de hamburguesa.*/
    function mostrarMenu(idMenu) {
        var menu = document.getElementById(idMenu);
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }
    // Asignar la función anterior (mostrarMenu('menu')) al botón de hamburguesa:
    document.querySelector('button.hamburguesa').addEventListener('click', function() {
        mostrarMenu('menu');
    });
    /*Ahora sigue la parte para abrir/cerrar submenús.*/
    function mostrarSubmenu(element) {

        /* Prmero hay que obtener el submenú antes de cambiar cualquier estilo*/
        var submenu = element.querySelector('ul');
        var display = submenu ? window.getComputedStyle(submenu).display : 'none'; /*Es importante usar el getComputedStyle y no el .style.display
        ya que el .style.display se fija solamente en el style inline, en cambio getComputedStyle es el que se aplica finalmente, sea este inline
        o sea en referencia externa. Al principio se aplicará referencia externa, el estado inicial, luego el inline que cambiamos con el js.
        Por eso necesitamos el getComputedStyle.*/

                
        /* Cerrar todos los submenús, que si nos fijamos en el html correspenden a la sucesión de tags 'nav > ul > li > ul'. El primer ul
        es el primer menú y el segundo ul es el menú más chico. A cada submenú sacado del DOM, le aplicamos una función function(submenú) {...},
        esto es una función anónima que con el forEach es llamada para cada uno de los elementos obtenidos del DOM. En este caso submenu es en 
        realidad cada elemento recuperado por el document.querySelectorAll(), que sí, justamente son los submenúes.
        Entonces primero cerramos todos los benditos submenús.*/

        /*Acá pongo la flecha verde de neuvo en todos los li (sirve para el caso en que abro un menú por ejemplo "Archivos" y luego "Itineraris".
        Si no está esta parte, se queda en rojo la flecha de archivos.) */
        document.querySelectorAll('nav > ul > li').forEach(function(element) {
            /*Ey, y tengo que agregar este if para que no me cambie el ícono de instagram ni el de la lupita por flechas, jaja*/
            if(!element.classList.contains('instagram-escritorio') && !element.classList.contains('lupita-escritorio')){
                var img = element.querySelector('img');
                if (img) {
                    img.src = 'img/flecha_abajo.png';
                }
            }
        });
        document.querySelectorAll('nav > ul > li > ul').forEach(function(submenu) {
            submenu.style.display = 'none';

            
        });
        /*Ahora que están todos cerrados abrimos el que queremos. Ya sabemos que el que queremos es el "element" y entonces nos metemos en la <ul>
        del element y lo mostramos poniendo display: block en el css (eso hace submenu.style.display). El ul es la lista desordenada que tiene todos los list item <li> del submenú, o sea cada entradita. Con activar
        la etiqueta de afuera ya se muestran todos los de adentro.*/
        
        /*Primero hacía:
        if (submenu.style.display === 'block' || submenu.style.display === '') {
            submenu.style.display = 'none';
            console.log("escuendo")
        } else {
            submenu.style.display = 'block';
        }  
            
        La primera condición es si el menú que clickamos ya está abierto o
        más precisamente si está display: block en el css, la segunda es si directamente ni está definido el display en la regla de estilo, pero 
        esto estaba mal ya que submenu.style.display se fija en lo que modificó JS, no en lo que efectivamente hay. O sea que, como antes pusimos
        en none todo, siempre va a dar none, pero nosotros queremos saber cómo estaba antes de entrar a esta función y poner todo en none!!!
        Para eso utilizamos el getComputedStyle:*/
        if (submenu) {
            if (display === 'block') {
                submenu.style.display = 'none';
                // console.log("ocultando");
                /*También tengo que volver al verde la flecha para abajo al reclickear: */
                var img = element.querySelector('img');
                if (img) {
                    img.src = 'img/flecha_abajo.png';
                }
                

            } else {
                submenu.style.display = 'block';
                // console.log("mostrando");
                // Cambiar la imagen a flecha_abajo_roja.png para el elemento clickeado
                var img = element.querySelector('img');
                if (img) {
                    img.src = 'img/flecha_abajo_roja.png';
                }
                
            }
        }
        /*Bien, ahora, también quería poner que cuando clickeo el texto del menú se quede bordó y además que se quede subido. 
        Para eso armé una claes .active en css y primero la saco del inline en todos los textos, luego la agrego en el inline para el que se clickió*/
        document.querySelectorAll('nav > ul > li').forEach(function(item) {
            item.classList.remove('menu-active');
        });

        /*La clase 'active' se agrega para el elemento clickeado*/
        
        /*Igual que antes excluyo al instagram*/
        if(!element.classList.contains('instagram-escritorio') && !element.classList.contains('lupita-escritorio'))
            if (display !== 'block') {
                element.classList.add('menu-active');
            }


    }
    /*Agarramos y nos traemos todos los elementos del menú principal, o sea "Archivos", "Itinerarios", "Escritores", etc., todos los cuáles
    son nav > ul > li. Ahora, para cada uno (forEach) aplicamos una función anónima donde cáda uno está representado por el argumento item
    y justamente a cada item (o sea a cada submenú) le asignamos un listener (ya expliqué arriba qué es, pero de nuevo, es una función que
    todo el tiempo "escucha" si pasa algo, y si pasa eso (en este caso un 'click' entonces llama a otra función conocida como callback) llama
    a mostrarSubmenu(this), que es justamente la función que va a ocultar tooodos los ul, y luego con el "this" o sea, en este contexto es la 
    pestaña que habremos clickeado, agarra y se trae el 'ul' que es la lista desordenada con todos sus subelementos pertenecientes a ese submenú
    y muestra es lista ordenada poniendo en 'block'*/
    document.querySelectorAll('nav > ul > li').forEach(function(item) {
        // console.log(item)
        item.addEventListener('click', function() {
            mostrarSubmenu(this);
        });
    });
});

/*Esta función tiene la misma lógica que la del carousel del celular. Sólo cambian los tags porque cambian las relaciones de aspecto
en la versión de escritorio y para eso se definieron distintas tags, en este caso no es .carousel sino que es .carousel-escritorio. 
Aquí se definió un EventListener que se activa cuando el DOM se carga, pero la lógica es la misma, se trata sólo de otra forma de asociar
una función a un evento, en la función de celular se usó el atributo onclick el el HTML, que es una forma análoga de llamar una función de JS.*/
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    function moveSlideEscritorio(direction) {
        const items = document.querySelectorAll('.carousel-escritorio-item');
        const totalItems = items.length;
        currentIndex = (currentIndex + direction + totalItems) % totalItems;
        document.querySelector('.carousel-escritorio-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
        items.forEach(item => item.classList.remove('menu-active'));
        items[currentIndex].classList.add('menu-active');

    }
    document.querySelector('.prev-escritorio').addEventListener('click', () => moveSlideEscritorio(-1));
    document.querySelector('.next-escritorio').addEventListener('click', () => moveSlideEscritorio(1));
    function autoSlideEscritorio() {
        moveSlideEscritorio(1);
    }

    setInterval(autoSlideEscritorio, 3000);
});


lupitaEscritorio = document.getElementsByClassName('lupita-escritorio')[0];
var mostrarBuscar = 0;

lupitaEscritorio.addEventListener('click', function (event) {
    event.preventDefault();
    var input = document.getElementById('lupita-input-cuadro-busqueda');
    var instagramEscritorio = document.getElementsByClassName('instagram-escritorio')[0];

    if (mostrarBuscar == 0) {
        lupitaEscritorio.style.transform = 'translateX(-1420%)';
        instagramEscritorio.style.transform = 'translateX(-1180%)';
        
        input.classList.add('mostrar');
        input.removeAttribute('readonly'); // Permite la edición
        input.style.cursor = 'text'; // Cambia el cursor a uno de texto
        mostrarBuscar = 1;
    } else {
        lupitaEscritorio.style.transform = 'translateX(0%)';
        instagramEscritorio.style.transform = 'translateX(0%)';
        
        input.classList.remove('mostrar');
        input.setAttribute('readonly', true); // Deshabilita la edición
        input.style.cursor = 'default'; // Mantiene el cursor sin cambiar
        mostrarBuscar = 0;
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los párrafos con la clase 'leer-mas'
    var leerMasElements = document.querySelectorAll('.leer-mas');

    leerMasElements.forEach(function (element) {
        element.addEventListener('click', function () {
            // Encuentra el enlace dentro del párrafo
            var link = element.querySelector('a');
            if (link) {
                // Redirige a la URL del enlace
                window.location.href = link.href;
            }
        });

        // Cambia el cursor al pasar sobre el párrafo para indicar que es clickeable
        element.style.cursor = 'pointer';
    });
});

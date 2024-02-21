/**
 * Escena.js
 * 
 * Practica AGM #1. Escena basica en three.js
 * Seis objetos organizados en un grafo de escena con
 * transformaciones, animacion basica y modelos importados
 * 
 * @author 
 * 
 */

// Modulos necesarios
/*******************
 * TO DO: Cargar los modulos necesarios
 *******************/

// Variables de consenso
let renderer, scene, camera;

// Otras globales
/*******************
 * TO DO: Variables globales de la aplicacion
 *******************/

// Acciones
init();
loadScene();
render();

function init()
{
    // Motor de render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    /*******************
    * TO DO: Completar el motor de render y el canvas
    *******************/
    //document.getElementById('container').appendChild( renderer.domElement );
   
    // Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(95,242,242) //Blue/turqoise 
    
    // Camara
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1,1000);
    camera.position.set( 0.5, 2, 7 );
    camera.lookAt( new THREE.Vector3(0,1,0) );
}

function loadScene()
{
    const material = new THREE.MeshBasicMaterial({color: 'green', wireframe: true} );

    /*******************
    * TO DO: Construir un suelo en el plano XZ
    *******************/

    const floor = new THREE.MeshNormalMaterial(new THREE.CircleGeometry(10,40), material);
    floor.rotation.x = -Math.PI/3
    scene.add(floor); 

    /*******************
    * TO DO: Construir una escena con 5 figuras diferentes posicionadas
    * en los cinco vertices de un pentagono regular alredor del origen
    *******************/

    /*******************
    * TO DO: Añadir a la escena un modelo importado en el centro del pentagono
    *******************/

    /*******************
    * TO DO: Añadir a la escena unos ejes
    *******************/
}

function update()
{
    /*******************
    * TO DO: Modificar el angulo de giro de cada objeto sobre si mismo
    * y del conjunto pentagonal sobre el objeto importado
    *******************/
}

function render()
{
    requestAnimationFrame( render );
    update();
    renderer.render( scene, camera );
}
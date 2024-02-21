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

let fiveforms;

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

    document.getElementById('container').appendChild( renderer.domElement );
   
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
    var materialfloor = new THREE.MeshBasicMaterial({color: 'green', wireframe: true} );

    /*******************
    * TO DO: Construir un suelo en el plano XZ
    *******************/

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10,10,10,10), materialfloor);
    //floor.rotation.x = -Math.PI/3
    scene.add(floor); 

    /*******************
    * TO DO: Construir una escena con 5 figuras diferentes posicionadas
    * en los cinco vertices de un pentagono regular alredor del origen
    *******************/
    
    const materialforms = new THREE.MeshBasicMaterial({color:'pink',wireframe:true});

    const geometry1 = new THREE.CylinderGeometry(0, 1, 2, 4, 1)
    const pyramid = new THREE.Mesh(geometry1, materialforms);
    scene.add(pyramid);

    const geometry2 = new THREE.SphereGeometry(1,20,20);
    const sphere = new THREE.Mesh(geometry2, materialforms); 
    scene.add(sphere); 

    const geometry3 = new THREE.CylinderGeometry(2,3,1); 
    const cylinder = new THREE.Mesh(geometry3, materialforms); 
    scene.add(cylinder); 

    const geometry4 = new THREE.BoxGeometry(2,2,2); 
    const box = new THREE.Mesh(geometry4, materialforms); 
    scene.add(box); 

    const geometry5 = new THREE.DodecahedronGeometry(2,4,3,1); 
    const dodeca = new THREE.Mesh(geometry5, materialforms); 
    scene.add(dodeca); 

    /*******************
    * TO DO: Añadir a la escena un modelo importado en el centro del pentagono
    *******************/

    //Tree, cocunut pero no esta funcionando hacer una cuenta en clara.io

    /*******************
    * TO DO: Añadir a la escena unos ejes
    *******************/

    fiveforms = new THREE.Object3D(); 
    fiveforms.position.y = 1.0;
    //pyramid.position.y = 1.5;
    pyramid.position.y(1);
    sphere.position.y(2);
    cylinder.position.y(3);
    box.position.y(1);
    dodeca.position.y(5);

    box.add(new THREE.AxesHelper(1)); 

    scene.add(fiveforms); 
    fiveforms.add(pyramid,spehere,cylinder,box,dodeca); 

    scene.add(new THREE.AxesHelper(5));

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
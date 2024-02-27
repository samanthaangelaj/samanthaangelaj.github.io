/**
 * Escena.js
 * 
 * Seminario AGM #1. Escena basica en three.js: 
 * Transformaciones, animacion basica y modelos importados
 * 
 * @author <rvivo@upv.es>, 2023
 * 
 */

// Modulos necesarios
//import * as THREE from "../lib/three.module.js";
//import {GLTFLoader} from "../lib/GLTFLoader.module.js";

// Variables de consenso
let renderer, scene, camera;

// Otras globales
let angulo = 0;

// Acciones
init();
loadScene();
render();

function init() {
    // Motor de render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor( new THREE.Color(0x0000AA) );
    document.getElementById('container').appendChild(renderer.domElement);

    // Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0.5, 0.5, 0.5);

    // Camara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function loadScene() {
    const material = new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true });

    const geoEsfera = new THREE.SphereGeometry(1, 20, 20);
    const esfera = new THREE.Mesh(geoEsfera, material);
    esfera.position.y = 2; // Move the sphere above the floor

    // Suelo
    const suelo = new THREE.Mesh(roundedFloorGeometry(10, 10, 10, 10), material);
    suelo.rotation.x = -Math.PI / 2;
    scene.add(suelo);

    scene.add(esfera);

    scene.add(new THREE.AxesHelper(3));
}

function update() {
    angulo += 0.01;
    // No need to rotate anything
}

function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}

// Function to create a rounded floor geometry
function roundedFloorGeometry(width, height, widthSegments, heightSegments) {
    const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    // Check if geometry has vertices
    if (geometry.vertices) {
        // Round the vertices
        geometry.vertices.forEach(vertex => {
            vertex.z = Math.sin(vertex.x * 0.5) * Math.cos(vertex.y * 0.5) * 0.2; // Adjust the rounding factor here
        });
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
    }
    return geometry;
}

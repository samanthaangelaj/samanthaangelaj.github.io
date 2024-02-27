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
    const material = new THREE.MeshBasicMaterial({ wireframe: false });

    // Suelo
    const suelo = new THREE.Mesh(roundedFloorGeometry(10, 10, 40, 40), material); // Increase segments for smoother appearance
    suelo.rotation.x = -Math.PI / 2;
    scene.add(suelo);

    // Add random spheres above the floor
    const numSpheres = 5;
    const minSize = 0.5;
    const maxSize = 1.5;
    const floorHeight = 0.5;
    for (let i = 0; i < numSpheres; i++) {
        const sphereSize = Math.random() * (maxSize - minSize) + minSize; // Random size between minSize and maxSize
        const sphereColor = new THREE.Color(Math.random(), Math.random(), Math.random()); // Random color
        const geoEsfera = new THREE.SphereGeometry(sphereSize, 20, 20);
        const esfera = new THREE.Mesh(geoEsfera, new THREE.MeshBasicMaterial({ color: sphereColor }));
        const randomX = Math.random() * 10 - 5; // Random x position between -5 and 5
        const randomZ = Math.random() * 10 - 5; // Random z position between -5 and 5
        esfera.position.set(randomX, floorHeight + sphereSize / 2, randomZ); // Set position above the floor
        scene.add(esfera);
    }

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
    if (geometry && geometry.vertices) { // Check if geometry and its vertices are valid
        // Round the vertices
        geometry.vertices.forEach(vertex => {
            const dist = Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y); // Calculate distance from center
            const maxDist = Math.sqrt(2 * width * width + 2 * height * height); // Calculate max distance
            const ratio = dist / maxDist; // Calculate ratio
            vertex.z = Math.sin(ratio * Math.PI) * 0.5; // Apply sinusoidal function for rounding
        });
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
    }
    return geometry;
}



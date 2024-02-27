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
    const material = new THREE.MeshBasicMaterial({ color:0xffff00,  side: THREE.DoubleSide });

    // Suelo
    const suelo = new THREE.CircleGeometry(10, 20); // Increase segments for smoother appearance
    suelo.rotation = -Math.PI / 2;
    const circle = new THREE.Mesh(suelo, material);
    scene.add(circle);

    // Add fixed position spheres in corners
    const cornerPositions = [
        new THREE.Vector3(-5, 0.75, -5),
        new THREE.Vector3(-5, 0.75, 5),
        new THREE.Vector3(5, 0.75, -5),
        new THREE.Vector3(5, 0.75, 5)
    ];
    const mediumSize = 1.0;
    const sphereColor = new THREE.Color(0.8, 0.2, 0.2); // Red color for fixed position spheres
    cornerPositions.forEach(position => {
        const geoEsfera = new THREE.SphereGeometry(mediumSize, 20, 20);
        const esfera = new THREE.Mesh(geoEsfera, new THREE.MeshBasicMaterial({ color: sphereColor }));
        esfera.position.copy(position);
        scene.add(esfera);
    });

    // Add random transparent spheres above the floor
    const numSpheres = 5; // Number of random spheres
    const minSize = 0.5;
    const maxSize = 1.5;
    const floorHeight = 0.5;
    for (let i = 0; i < numSpheres; i++) {
        const sphereSize = Math.random() * (maxSize - minSize) + minSize; // Random size between minSize and maxSize
        const sphereColor = new THREE.Color(Math.random(), Math.random(), Math.random()); // Random color
        const geoEsfera = new THREE.SphereGeometry(sphereSize, 20, 20);
        const esfera = new THREE.Mesh(geoEsfera, new THREE.MeshBasicMaterial({ color: sphereColor, transparent: true, opacity: 0.5 }));
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




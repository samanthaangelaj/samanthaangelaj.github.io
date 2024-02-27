
// Variables de consenso
let renderer, scene, camera;

// Otras globales
let angulo = 0;
let cameraControls

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
    scene.background = new THREE.Color(135, 206, 250);

    // Camara

    // Instanciar la camara
    camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100);
    camera.position.set(0.5,2,7);
    cameraControls = new OrbitControls( camera, renderer.domElement );
    cameraControls.target.set(0,1,0);
    camera.lookAt(0,1,0);      

    //camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //camera.position.set(0, 5, 10);
    //camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function loadScene() {
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

    // Suelo
    const suelo = new THREE.CircleGeometry(10, 100); // Increase segments for smoother appearance
    suelo.rotateY(-Math.PI / 2); // Rotate the geometry to make it horizontal
    const circle = new THREE.Mesh(suelo, material);
    scene.add(circle);

    // Add fixed position spheres in corners
    const cornerPositions = [
        new THREE.Vector3(-4, 0.75, -4),
        new THREE.Vector3(-4, 0.75, 4),
        new THREE.Vector3(4, 0.75, -4),
        new THREE.Vector3(4, 0.75, 4)
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
    const floorHeight = 1.5;
    for (let i = 0; i < numSpheres; i++) {
        const sphereSize = Math.random() * (maxSize - minSize) + minSize; // Random size between minSize and maxSize
        const sphereColor = new THREE.Color(Math.random(), Math.random(), Math.random()); // Random color
        const geoEsfera = new THREE.SphereGeometry(sphereSize, 20, 20);
        const esfera = new THREE.Mesh(geoEsfera, new THREE.MeshBasicMaterial({ color: sphereColor, transparent: true, opacity: 0.5 }));
        const randomX = Math.random() * 8 - 4; // Random x position between -4 and 4 to stay inside the square
        const randomZ = Math.random() * 8 - 4; // Random z position between -4 and 4 to stay inside the square
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

function animate() {
    requestAnimationFrame(animate);
    cameraControls.update();
    renderer.render(scene, camera);
}

animate(); 

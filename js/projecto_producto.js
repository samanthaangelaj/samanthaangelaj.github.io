
// Variables de consenso
let renderer, scene, camera;

// Otras globales
let angulo = 0;
let cameraControls;
let floor;

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

    // Instanciar la camara
    camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100);
    camera.position.set(0,4,17);
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set(0,1,0);
    camera.lookAt(0,1,0);      
}

function loadScene() {
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

    // Suelo
    const suelo = new THREE.CircleGeometry(10, 100); // Increase segments for smoother appearance
    suelo.rotateX(-Math.PI / 2); // Rotate the geometry to make it horizontal
    floor = new THREE.Mesh(suelo, material);
    scene.add(floor);

    // Add fixed position spheres in corners
    const cornerPositions = [
        new THREE.Vector3(-10, 5, 7),
        new THREE.Vector3(-10, -3, 7),
        new THREE.Vector3(10, 5, 7),
        new THREE.Vector3(10, -3, 7),
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

    const glloader = new THREE.GLTFLoader(); 

    glloader.load('models/palm_tree/scene.gltf', function(gltf) {
        gltf.scene.position.y = 0;
        gltf.scene.rotation.y = -Math.PI/2;
        floor.add( gltf.scene );
        console.log("PALM");
        console.log(gltf);
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );

    glloader.load('models/garden_flower_-_vegetation/scene.gltf', function(gltf) {
        gltf.scene.position.y = 0;
        gltf.scene.rotation.y = -Math.PI/2;
        floor.add( gltf.scene );
        console.log("FLOWERS 1");
        console.log(gltf);
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );

}

function update() {
    angulo += 1;
    if (floor){
    floor.rotation.y = angulo; // Rotate the floor
    }
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

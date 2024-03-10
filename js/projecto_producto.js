
// Variables de consenso
let renderer, scene, camera;

// Otras globales
let angulo = 0;
let cameraControls;
let floor;
let rotationSpeed = 0.01;

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
    
    const direccional = new THREE.DirectionalLight(0xFFFFFF,0.3);
    direccional.position.set(-1,1,-1);
    direccional.castShadow = true;
    scene.add(direccional);

    renderer.domElement.addEventListener('dbclick', animate2);

}

function loadScene() {

    const path = "./images/";
    const material = new THREE.MeshBasicMaterial({ color: 0x9CE648, side: THREE.DoubleSide });

    // Suelo
    const suelo = new THREE.CircleGeometry(10, 100); // Increase segments for smoother appearance
    suelo.rotateX(-Math.PI / 2); // Rotate the geometry to make it horizontal
    floor = new THREE.Mesh(suelo, material);
    scene.add(floor);
    floor.name = 'floor';

    // Load an environment map texture for reflection
    const reflectionCube = new THREE.CubeTextureLoader()
        .setPath('images/')
        .load([
            'posxp.bmp', 'negxp.bmp',
            'posyp.bmp', 'negyp.bmp',
            'poszp.bmp', 'negzp.bmp'
        ]);

    // Create a material for the fixed position spheres with environment mapping
    const bubbleMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF, // White color
        metalness: 1, // Fully metallic
        roughness: 0, // Smooth surface
        envMap: reflectionCube // Apply environment mapping for reflections
    });

    // Add fixed position spheres in corners with bubble-like effect
    const cornerPositions = [
        new THREE.Vector3(-10, 5, 7),
        new THREE.Vector3(-10, -3, 7),
        new THREE.Vector3(10, 5, 7),
        new THREE.Vector3(10, -3, 7),
    ];
    const mediumSize = 1.0;
    cornerPositions.forEach(position => {
        const geoEsfera = new THREE.SphereGeometry(mediumSize, 32, 32);
        const esfera = new THREE.Mesh(geoEsfera, bubbleMaterial); // Use bubble-like material
        esfera.position.copy(position);
        scene.add(esfera);
    });

     // Material for the random spheres
     const bubbleMaterial2 = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF, // White color
        transparent: true,
        opacity: 0.7, // Adjust opacity for translucency
        shininess: 100, // Adjust shininess for specular highlights
        specular: 0xFFFFFF, // White specular highlight
        reflectivity: 1 // Full reflectivity
    });

    // Define boundaries
    const minX = -15;
    const maxX = 15;
    const minZ = -15;
    const maxZ = 15;

    const numSpheres = 13; // Increase the number of spheres
    const minSize = 0.2; // Decrease the minimum size of spheres
    const maxSize = 2; // Decrease the maximum size of spheres
    const minFloorHeight = 2; // Minimum height above the floor
    const maxFloorHeight = 20; // Maximum height above the floor
    for (let i = 0; i < numSpheres; i++) {
        const sphereSize = Math.random() * (maxSize - minSize) + minSize; // Random size between minSize and maxSize
        const sphereColor = new THREE.Color(Math.random(), Math.random(), Math.random()); // Random color
        
        // Calculate random position within boundaries
        const randomX = Math.random() * (maxX - minX) + minX;
        const randomZ = Math.random() * (maxZ - minZ) + minZ;
        const floorHeight = Math.random() * (maxFloorHeight - minFloorHeight) + minFloorHeight; // Random height above the floor

        // Create and position sphere
        const geoEsfera = new THREE.SphereGeometry(sphereSize, 20, 20);
        const esfera = new THREE.Mesh(geoEsfera, bubbleMaterial2);
        esfera.position.set(randomX, floorHeight + sphereSize / 2, randomZ); // Set position above the floor
        scene.add(esfera);
    }

    scene.add(new THREE.AxesHelper(3));

    // Loading 3D models
    const glloader = new THREE.GLTFLoader();

    // Load palm tree
    glloader.load('models/palm_tree/scene.gltf', function(gltf) {
        gltf.scene.position.y = 0;
        gltf.scene.rotation.y = -Math.PI/2;
        floor.add(gltf.scene);
        console.log("PALM");
        console.log(gltf);
    }, undefined, function ( error ) {
        console.error(error);
    });

    // Load flowers
    glloader.load('models/garden_flower_-_vegetation/scene.gltf', function(gltf) {
        gltf.scene.position.y = 0;
        gltf.scene.rotation.y = -Math.PI/2;
        floor.add(gltf.scene);
        console.log("FLOWERS 1");
        console.log(gltf);
    }, undefined, function ( error ) {
        console.error(error);
    });

    // Habitacion
    const paredes = [];
    paredes.push(new THREE.MeshBasicMaterial({side: THREE.BackSide, map: new THREE.TextureLoader().load(path+"posxp.bmp")}));
    paredes.push(new THREE.MeshBasicMaterial({side: THREE.BackSide, map: new THREE.TextureLoader().load(path+"negxp.bmp")}));
    paredes.push(new THREE.MeshBasicMaterial({side: THREE.BackSide, map: new THREE.TextureLoader().load(path+"posyp.bmp")}));
    paredes.push(new THREE.MeshBasicMaterial({side: THREE.BackSide, map: new THREE.TextureLoader().load(path+"negyp.bmp")}));
    paredes.push(new THREE.MeshBasicMaterial({side: THREE.BackSide, map: new THREE.TextureLoader().load(path+"poszp.bmp")}));
    paredes.push(new THREE.MeshBasicMaterial({side: THREE.BackSide, map: new THREE.TextureLoader().load(path+"negzp.bmp")}));
    const habitacion = new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), paredes);
    scene.add(habitacion);

}

function update() {
    angulo += 0.01;
    angulo += rotationSpeed; // Update angle with rotation speed
    if (floor){
        floor.rotation.y = angulo; // Rotate the floor
}}

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

function animate2(event){
    // Capturar y normalizar
    console.log("maldito");
    let x= event.clientX;
    let y = event.clientY;
    x = ( x / window.innerWidth ) * 2 - 1;
    y = -( y / window.innerHeight ) * 2 + 1;

    // Construir el rayo y detectar la interseccion
    const rayo = new THREE.Raycaster();
    rayo.setFromCamera(new THREE.Vector2(x,y), camera);
    const soldado = scene.getObjectByName('floor');
    let intersecciones = rayo.intersectObjects(floor.children,true);

    if( intersecciones.length > 0 ){
        console.log("muy maldito");
        new TWEEN.Tween( floor.rotation ).
        to( {x:[0,0],y:[Math.PI,-Math.PI/2],z:[0,0]}, 5000 ).
        interpolation( TWEEN.Interpolation.Linear ).
        easing( TWEEN.Easing.Exponential.InOut ).
        start();
    }
}

animate(); 

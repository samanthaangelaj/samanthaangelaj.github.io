
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
    
    const path = "./images/";
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

    const numSpheres = 13; // Increase the number of spheres
    const minSize = 0.2; // Decrease the minimum size of spheres
    const maxSize = 2; // Decrease the maximum size of spheres
    const minFloorHeight = 2; // Minimum height above the floor
    const maxFloorHeight = 20; // Maximum height above the floor
    for (let i = 0; i < numSpheres; i++) {
        const sphereSize = Math.random() * (maxSize - minSize) + minSize; // Random size between minSize and maxSize
        const sphereColor = new THREE.Color(Math.random(), Math.random(), Math.random()); // Random color
        const geoEsfera = new THREE.SphereGeometry(sphereSize, 20, 20);
        const esfera = new THREE.Mesh(geoEsfera, new THREE.MeshBasicMaterial({ color: sphereColor, transparent: true, opacity: 0.5 }));
        const angle = Math.random() * Math.PI * 2; // Random angle around the floor
        const radius = Math.random() * 5 + 30; // Random radius around the floor
        const floorHeight = Math.random() * (maxFloorHeight - minFloorHeight) + minFloorHeight; // Random height above the floor
        const randomX = Math.cos(angle) * radius; // Calculate x position around the floor
        const randomZ = Math.sin(angle) * radius; // Calculate z position around the floor
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

    // Habitacion
    const paredes = [];
    paredes.push( new THREE.MeshBasicMaterial({side:THREE.BackSide,
                map: new THREE.TextureLoader().load(path+"posxp.jpg")}) );
    paredes.push( new THREE.MeshBasicMaterial({side:THREE.BackSide,
                map: new THREE.TextureLoader().load(path+"negxp.jpg")}) );
    paredes.push( new THREE.MeshBasicMaterial({side:THREE.BackSide,
                map: new THREE.TextureLoader().load(path+"posyp.jpg")}) );
    paredes.push( new THREE.MeshBasicMaterial({side:THREE.BackSide,
                map: new THREE.TextureLoader().load(path+"negyp.jpg")}) );
    paredes.push( new THREE.MeshBasicMaterial({side:THREE.BackSide,
                map: new THREE.TextureLoader().load(path+"poszp.jpg")}) );
    paredes.push( new THREE.MeshBasicMaterial({side:THREE.BackSide,
                map: new THREE.TextureLoader().load(path+"negzp.jpg")}) );
    const habitacion = new THREE.Mesh( new THREE.BoxGeometry(40,40,40),paredes);
    scene.add(habitacion);

}

function update() {
    angulo += 0.05;
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

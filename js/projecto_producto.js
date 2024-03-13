

// Variables de consenso
let renderer, scene, camera;

// Otras globales
let angulo = 0;
let cameraControls;
let floor;
let rotationSpeed = 0.01;

let textMesh1, textMesh2, textMesh3, textMesh4;
let scaleFactor = 0.01;
let scaleDirection = 1;


// Acciones
init();
loadScene();
setupGUI();
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
    camera.position.set(0,2.5,18);
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set(0,1,0);
    camera.lookAt(0,1,0); 
    
    const direccional = new THREE.DirectionalLight(0xFFFFFF,0.3);
    direccional.position.set(-1,1,-1);
    direccional.castShadow = true;
    scene.add(direccional);

    renderer.domElement.addEventListener('dblclick', animate2);

}

function loadScene() {

    const path = "./images/";
    const material = new THREE.MeshBasicMaterial({ color: 0x9CE648, side: THREE.DoubleSide });

    // Suelo
    const suelo = new THREE.CircleGeometry(10, 100); // Increase segments for smoother appearance
    suelo.rotateX(-Math.PI / 2); // Rotate the geometry to make it horizontal
    floor = new THREE.Mesh(suelo, material);
    floor.position.set(0,-4,-4)
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
    const maxSize = 1; // Decrease the maximum size of spheres
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
        const esfera = new THREE.Mesh(geoEsfera, bubbleMaterial);
        esfera.position.set(randomX, floorHeight + sphereSize / 2, randomZ); // Set position above the floor
        scene.add(esfera);
    }

    //text
    const fontLoader = new THREE.FontLoader();
    fontLoader.load(
    "/fonts/helvetiker_bold.typeface.json",
    (font) => {
        const textGeometry1 = new THREE.TextGeometry("CHECK LINEUP", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.04,
        bevelOffset: 0,
        bevelSegments: 8
        });

        const textGeometry2 = new THREE.TextGeometry("QUESTIONS & ANSWERS", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.04,
        bevelOffset: 0,
        bevelSegments: 8
        });

        const textGeometry3 = new THREE.TextGeometry("BUY TICKETS", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.04,
        bevelOffset: 0,
        bevelSegments: 8
        });

        const textGeometry4 = new THREE.TextGeometry("MAP & DIRECTIONS", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.04,
        bevelOffset: 0,
        bevelSegments: 8
        });

        const textGeometry5 = new THREE.TextGeometry("Baja Beach Fest 2024", {
        font,
        size: 1,
        height: 0.3,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.04,
        bevelOffset: 0,
        bevelSegments: 8
        });

        //textGeometry.center(); // does the same things as above code

        const textureLoader = new THREE.TextureLoader();
        const matcapTexture = textureLoader.load("/images/4.png");

        const textureLoader2 = new THREE.TextureLoader(); 
        const matcapTexture2 = textureLoader2.load("/images/7.png");
        const materialnr7 = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture2
        });

        const material = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture
        });

        //const emissiveColor = new THREE.Color(0xff0000);
        //const emissiveMaterial = new THREE.MeshBasicMaterial({ color: 0xFF007E, emissive: emissiveColor, emissiveIntensity: 1 });
        
        // Create text meshes
        textMesh1 = new THREE.Mesh(textGeometry1, material);
        textMesh1.position.set(-12, 5, 7);
        scene.add(textMesh1);

        textMesh2 = new THREE.Mesh(textGeometry2, material);
        textMesh2.position.set(-15, -3, 7);
        scene.add(textMesh2);

        textMesh3 = new THREE.Mesh(textGeometry3, material);
        textMesh3.position.set(8, 5, 7);
        scene.add(textMesh3);

        textMesh4 = new THREE.Mesh(textGeometry4, material);
        textMesh4.position.set(7, -3, 7);
        scene.add(textMesh4);

        const text5 = new THREE.Mesh(textGeometry5, materialnr7);
        text5.position.set(-10, -7, 7); 
        scene.add(text5); 

    });

    scene.add(new THREE.AxesHelper(3));

    // Loading 3D models
    const glloader = new THREE.GLTFLoader();

    // Load palm tree
    glloader.load('models/palm_tree/scene.gltf', function(gltf) {
        gltf.scene.position.y = 0;
        gltf.scene.rotation.y = -Math.PI/2;

        // Set desired scale
        const desiredScale = 3; // Adjust as needed

        // Traverse through all meshes in the loaded GLTF object and set scale
        gltf.scene.traverse(child => {
            if (child.isMesh) {
                child.scale.set(desiredScale, desiredScale, desiredScale);
            }
        });

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

    glloader.load('models/alien_flower/scene.gltf', function(gltf) {
        gltf.scene.position.y = 2;
        gltf.scene.position.x = 2;
        gltf.scene.rotation.y = -Math.PI/2;
        floor.add(gltf.scene);
        console.log("FLOWERS 2");
        console.log(gltf);
    }, undefined, function ( error ) {
        console.error(error);
    });

    glloader.load('models/simple_flower_loop/scene.gltf', function(gltf) {
        gltf.scene.position.y = 0;
        gltf.scene.position.x = -3;
        gltf.scene.rotation.y = -Math.PI/2;
        floor.add(gltf.scene);
        console.log("FLOWERS 3");
        console.log(gltf);
    }, undefined, function ( error ) {
        console.error(error);
    });

    glloader.load('models/monarch_butterfly/scene.gltf', function(gltf) {
        gltf.scene.position.y = 5;
        gltf.scene.position.x = -5;
        gltf.scene.rotation.y = -Math.PI/2;
        floor.add(gltf.scene);
        console.log("BUTTERFLY 1");
        console.log(gltf);
    }, undefined, function ( error ) {
        console.error(error);
    });

    glloader.load('models/lowpoly_hibiscus_flower/scene.gltf', function(gltf) {
        gltf.scene.position.y = 2;
        gltf.scene.position.x = 7;
        gltf.scene.rotation.y = -Math.PI/2;
        floor.add(gltf.scene);
        console.log("FLOWERS 4");
        console.log(gltf);
    }, undefined, function ( error ) {
        console.error(error);
    });

    // //Load fern grass
    // glloader.load('models/fern_grass_02/scene.gltf', function(gltf) {
    //     gltf.scene.position.y = 3;
    //     gltf.scene.rotation.y = -Math.PI/2;
    //     floor.add(gltf.scene);
    //     console.log("GRASS 1");
    //     console.log(gltf);
    // }, undefined, function ( error ) {
    //     console.error(error);
    // });

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

    // Cine
    video = document.createElement('video');
    video.src = "./videos/bajabeach.mp4";
    video.load();
    video.muted = true;
    video.play();
    const texvideo = new THREE.VideoTexture(video);
    const pantalla = new THREE.Mesh(new THREE.PlaneGeometry(30,16,7,7), 
                                    new THREE.MeshBasicMaterial({map:texvideo}));
    pantalla.position.set(0,4.5,-7);
    scene.add(pantalla);

}

function setupGUI(){

    // Definicion de los controles
	effectController = {
		mensaje: 'Aftermovie 2023',
		play: function(){video.play();},
		pause: function(){video.pause();},
        mute: true,
	};

	// Creacion interfaz
	const gui2 = lil.GUI;
    const gui = new gui2(); 

    // Construccion del menu
    const videofolder = gui.addFolder("Control Aftermovie 2023");
    videofolder.add(effectController,"mute").onChange(v=>{video.muted = v});
	videofolder.add(effectController,"play");
	videofolder.add(effectController,"pause");

}

function update() {
    //angulo += 0.01;
    angulo += rotationSpeed; // Update angle with rotation speed
    if (floor){
        floor.rotation.y = angulo; // Rotate the floor

    if (textMesh1 && textMesh2 && textMesh3 && textMesh4) {
        textMesh1.scale.set(1 + scaleFactor, 1 + scaleFactor, 1 + scaleFactor);
        textMesh2.scale.set(1 + scaleFactor, 1 + scaleFactor, 1 + scaleFactor);
        textMesh3.scale.set(1 + scaleFactor, 1 + scaleFactor, 1 + scaleFactor);
        textMesh4.scale.set(1 + scaleFactor, 1 + scaleFactor, 1 + scaleFactor);
    
        // Update scale factor and direction
        scaleFactor += 0.01 * scaleDirection;
        if (scaleFactor >= 0.05 || scaleFactor <= -0.05) {
            scaleDirection *= -1;
        }
    }

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
        rotationSpeed = 0.1;
    }
}

animate(); 

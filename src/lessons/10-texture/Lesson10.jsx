import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui'

const Lesson10 = () => {

    // Get canvas element
    const canvasRef = useRef(null);

    useEffect(() => {
        if(!canvasRef) return;

        const scene = new THREE.Scene();
        const gui = new GUI();


        /*
        * Texture
        * */
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/src/assets/color.jpg');
        texture.colorSpace = THREE.SRGBColorSpace;
        // texture.repeat.x = 2;
        // texture.repeat.y = 2;
        //


        texture.offset.y = 0.1;

        gui.add(texture.offset, 'y').min(0).max(1).step(0.001).name('Texture Offset');
        gui.add(texture.repeat, 'x').min(0).max(5).step(0.1).name('Texture Repeat X');
        gui.add(texture.repeat, 'y').min(0).max(5).step(0.1).name('Texture Repeat Y');

        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.MirroredRepeatWrapping;

        // texture.minFilter = THREE.NearestFilter;

        // Mesh ? 
        // GEOMETRY
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        // MATERIAL
        const material = new THREE.MeshBasicMaterial({map: texture});

        // MESH
        const mesh = new THREE.Mesh(geometry, material);
        // Add mesh to scene
        scene.add(mesh);

        // console.log(mesh.position.length());

        // CAMERA
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

        const cursor = {
            x: 0,
            y: 0
        }

        // Add mouse even
        canvasRef.current.addEventListener('mousemove', (e) => {
            cursor.x = e.clientX / sizes.width - 0.5;
            cursor.y = -(e.clientY / sizes.height - 0.5);

        })

        // Add camera to scene
        scene.add(camera);

        // GUI
        gui.add(mesh.position, 'y', -3, 3, 0.01).name('Position Y');

        gui.addColor(material, 'color').onChange((value) => {
            console.log(value.getHexString());
        });

        // Using ObitControls
        const controls = new OrbitControls(camera, canvasRef.current);
        controls.enableDamping = true;

        // Render scene
        camera.position.z = 3;

        // console.log(mesh.position.distanceTo(camera.position));

        // RENDERER
        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(sizes.width, sizes.height);

        // put this one in the resize event to update the pixel ratio when the window is resized (Or changing the screen device)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const tick = () => {

            // Add damping
            controls.update();

            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        }


        tick();


    }, [])


    return (
        <div>
            <canvas ref={canvasRef} className="webgl"></canvas>
        </div>
    );
};

export default Lesson10;
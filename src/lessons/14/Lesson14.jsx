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

        // Mesh ?
        // GEOMETRY
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32);

        // TEXTURE
        const textureLoader = new THREE.TextureLoader();
        const matcapsTexture = textureLoader.load('/src/assets/matcaps/3.png');

        // To tell THREE.js to remove the gray color
        matcapsTexture.colorSpace = THREE.SRGBColorSpace;

        // MATERIAL
        const material = new THREE.MeshMatcapMaterial({matcap: matcapsTexture});

        // MESH
        const meshSphere = new THREE.Mesh(sphereGeometry, material);
        const meshPlane = new THREE.Mesh(planeGeometry, material);
        const meshTorus = new THREE.Mesh(TorusGeometry, material);

        // Add mesh to scene
        scene.add(meshPlane).add(meshSphere).add(meshTorus);

        meshSphere.position.x = -2;
        meshTorus.position.x = 2;

        // console.log(mesh.position.length());

        // CAMERA
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

        // Look at
        camera.position.y = 2;
        camera.position.x = 2;
        camera.lookAt(meshPlane.position);


        // Add camera to scene
        scene.add(camera);

        // GUI
        // gui.add(mesh.position, 'y', -3, 3, 0.01).name('Position Y');

        // gui.addColor(material, 'color').onChange((value) => {
        //     console.log(value.getHexString());
        // });

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

        // Clock
        const clock = new THREE.Clock();

        const tick = () => {

            const elapsedTime = clock.getElapsedTime();

            // Add damping
            controls.update();

            meshSphere.rotation.y = 0.1 * elapsedTime;
            meshPlane.rotation.y = 0.1 * elapsedTime;
            meshTorus.rotation.y = 0.1 * elapsedTime;

            meshPlane.rotation.x = -0.15 * elapsedTime;
            meshTorus.rotation.x = -0.15 * elapsedTime;

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
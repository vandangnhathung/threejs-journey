import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const Lesson7 = () => {

    // Get canvas element
    const canvasRef = useRef(null);

    useEffect(() => {
        if(!canvasRef) return;

        const scene = new THREE.Scene();

        // Mesh ?
        // GEOMETRY
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        // MATERIAL
        const material = new THREE.MeshBasicMaterial({color: 0xff0000});

        // MESH
        const mesh = new THREE.Mesh(geometry, material);
        // Add mesh to scene
        scene.add(mesh);

        // console.log(mesh.position.length());

        // CAMERA
        const sizes = {
            width: 800,
            height: 600
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


    })


    return (
        <div>
            <canvas ref={canvasRef} className="webgl"></canvas>
        </div>
    );
};

export default Lesson7;
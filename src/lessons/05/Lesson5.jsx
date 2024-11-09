import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import './lesson5.css';

const Lesson5 = () => {

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
        mesh.position.y = 1;
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

        // Render scene
        camera.position.x = 2;
        camera.position.y = 2;
        camera.position.z = 2;

        camera.lookAt(mesh.position);

        // console.log(mesh.position.distanceTo(camera.position));

        // RENDERER
        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(sizes.width, sizes.height);

        // Clock
        const clock = new THREE.Clock();

        const tick = () => {

            const elapsedTime = clock.getElapsedTime();

            console.log(elapsedTime);
            camera.position.x = Math.sin(elapsedTime);
            camera.position.y = Math.cos(elapsedTime);

            // console.log('tick', clock, clock.getElapsedTime());
            window.requestAnimationFrame(tick);
        }

        renderer.render(scene, camera);
        // tick();


    })


    return (
        <div>
            <canvas ref={canvasRef} className="webgl"></canvas>
        </div>
    );
};

export default Lesson5;
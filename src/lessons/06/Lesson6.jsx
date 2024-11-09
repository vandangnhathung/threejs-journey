import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'

const Lesson6 = () => {

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

            console.clear();

            console.log("x: ", cursor.x, Math.sin(cursor.x  * Math.PI * 2));
            console.log("z: ", Math.cos(cursor.x  * Math.PI * 2));

        })

        // Add camera to scene
        scene.add(camera);

        // Render scene
        // camera.position.z = 3;

        // console.log(mesh.position.distanceTo(camera.position));

        // RENDERER
        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(sizes.width, sizes.height);

        const tick = () => {

            // camera.position.x =  0.5;
            camera.position.x =  Math.sin(cursor.x  * Math.PI * 2) * 2;
            camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
            // camera.position.y = Math.sin(cursor.y * Math.PI * 2) * 2;
            camera.position.y = cursor.y * 2;
            camera.position.z = 2;
            camera.lookAt(mesh.position);

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

export default Lesson6;
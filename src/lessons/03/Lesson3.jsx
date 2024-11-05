import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import './lesson3.css';

const Lesson3 = () => {

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

        // Add camera to scene
        scene.add(camera);

        // Render scene
        camera.position.z = 4;

        console.log(mesh.position.distanceTo(camera.position));

        // RENDERER
        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(sizes.width, sizes.height);

        renderer.render(scene, camera);
    })


    return (
        <div>
            <canvas ref={canvasRef} className="webgl"></canvas>
        </div>
    );
};

export default Lesson3;
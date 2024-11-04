import React from 'react';
import * as THREE from 'three'
import './lesson1.css';

const Lesson1 = () => {

    // Get canvas element
    const canvas = document.querySelector('canvas.webgl');

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

    // CAMERA
    const sizes = {
        width: 800,
        height: 600
    };
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

    // Add camera to scene
    scene.add(camera);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(sizes.width, sizes.height);

    // Render scene
    camera.position.z = 3;
    renderer.render(scene, camera);

    return (
        <div>
            <canvas className="webgl"></canvas>
        </div>
    );
};

export default Lesson1;
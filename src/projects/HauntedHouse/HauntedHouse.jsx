import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui'
import {Timer} from "three/addons";

// import ""


const HauntedHouse = () => {

    // Get canvas element
    const canvasRef = useRef(null);

    useEffect(() => {
        if(!canvasRef) return;

        /**
         * Base
         */
            // Debug
        const gui = new GUI()

        // Canvas
        const canvas = document.querySelector('canvas.webgl')

        // Scene
        const scene = new THREE.Scene()

        // Texture
        const textureLoader = new THREE.TextureLoader();
        const floorAlphaTexture = textureLoader.load('/src/assets/floor/alpha.jpg');
        const floorColorTexture = textureLoader.load('/src/assets/floor/rocky_terrain_diff_1k.jpg');
        const floorNormalTexture = textureLoader.load('/src/assets/floor/rocky_terrain_nor_gl_1k.jpg');
        const floorARMTexture = textureLoader.load('/src/assets/floor/rocky_terrain_arm_1k.jpg');
        const floorDisplacementTexture = textureLoader.load('/src/assets/floor/rocky_terrain_disp_1k.jpg');

        floorColorTexture.colorSpace = THREE.SRGBColorSpace;

        floorColorTexture.repeat.set(8, 8);
        floorARMTexture.repeat.set(8, 8);
        floorNormalTexture.repeat.set(8, 8);
        floorDisplacementTexture.repeat.set(8, 8);

        floorColorTexture.wrapS = THREE.RepeatWrapping;
        floorARMTexture.wrapS = THREE.RepeatWrapping;
        floorNormalTexture.wrapS = THREE.RepeatWrapping;
        floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

        floorColorTexture.wrapT = THREE.RepeatWrapping;
        floorARMTexture.wrapT = THREE.RepeatWrapping;
        floorNormalTexture.wrapT = THREE.RepeatWrapping;
        floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

        /**
         * House
         */

            // Floor
        const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(20, 20, 100, 100),
                new THREE.MeshStandardMaterial({
                    alphaMap: floorAlphaTexture,
                    transparent: true,
                    map: floorColorTexture,
                    normalMap: floorNormalTexture,
                    aoMap: floorARMTexture,
                    roughnessMap: floorARMTexture,
                    metalnessMap: floorARMTexture,
                    displacementMap: floorDisplacementTexture,
                    displacementScale: 0.3,
                    displacementBias: -0.2
                })
            )

        gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Displacement scale')
        gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Displacement bias')

        floor.rotation.x = -Math.PI * 0.5
        scene.add(floor);

        // House
        const house = new THREE.Group();
        scene.add(house);

        // Walls
        const walls = new THREE.Mesh(
            new THREE.BoxGeometry(4, 2.5, 4),
            new THREE.MeshStandardMaterial()
        );
        walls.position.y = 1.25;
        house.add(walls);

        // Roof
        const roof = new THREE.Mesh(
            new THREE.ConeGeometry(3.5, 1, 4),
            new THREE.MeshStandardMaterial()
        );
        roof.position.y = 2.5 + 0.5;
        roof.rotation.y = Math.PI * 0.25;
        house.add(roof);

        // Door
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2, 0.1),
            new THREE.MeshStandardMaterial()
        );
        door.position.z = 2;
        door.position.y = 1;
        house.add(door);

        // Bushes
        const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
        const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'});
        const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
        bush1.scale.set(0.5, 0.5, 0.5);
        bush1.position.set(0.8, 0.2, 2.2);
        house.add(bush1);

        const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
        bush2.scale.set(0.25, 0.25, 0.25);
        bush2.position.set(1.4, 0.1, 2.1);
        house.add(bush2);

        const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
        bush3.scale.set(0.4, 0.4, 0.4);
        bush3.position.set(-1, 0.1, 2.2);
        house.add(bush3);

        const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
        bush4.scale.set(0.15, 0.15, 0.15);
        bush4.position.set(-1.5, 0.05, 2.6);
        house.add(bush4);

        // Graves
        const graves = new THREE.Group();
        scene.add(graves);

        const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
        const graveMaterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'});
        for(let i = 0; i < 50; i++){
            const angle = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 6;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const grave = new THREE.Mesh(graveGeometry, graveMaterial);
            grave.position.set(x, 0.4, z);
            grave.rotation.y = (Math.random() - 0.5) * 0.4;
            grave.rotation.z = (Math.random() - 0.5) * 0.4;
            grave.castShadow = true;
            graves.add(grave);
        }


        /**
         * Lights
         */
            // Ambient light
        const ambientLight = new THREE.AmbientLight('#fff', 0.5)
        scene.add(ambientLight)

        // Directional light
        const directionalLight = new THREE.DirectionalLight('#fff', 1.5)
        directionalLight.position.set(3, 2, -8)
        scene.add(directionalLight)

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        /**
         * Camera
         */
            // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 10
        camera.position.y = 4
        camera.position.z = 12
        scene.add(camera)

        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Animate
         */
        const timer = new Timer()

        const tick = () => {
            // Timer
            timer.update()
            const elapsedTime = timer.getElapsed()

            // Update controls
            controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()

    }, [])


    return (
        <div>
            <canvas ref={canvasRef} className="webgl"></canvas>
        </div>
    );
};

export default HauntedHouse;
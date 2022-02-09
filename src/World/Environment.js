import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import { CubeTextureLoader } from "three";
import React, { useState, Suspense, useEffect } from 'react'


function Enviroment() {
    const { scene } = useThree();

    useEffect(() => {
        const loader = new CubeTextureLoader();
        // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
        loader.setPath("World/Environment/");
        const texture = loader.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
        console.log(texture)
        // Set the scene background property to the resulting texture.
        scene.background = texture;
      },[])

    return null;
}


export default Enviroment;


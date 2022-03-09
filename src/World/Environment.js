import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import { CubeTextureLoader } from "three";
import React, { useState, Suspense, useEffect } from 'react'


function Enviroment(props) {
    const { scene } = useThree();

    useEffect(() => {
        const texture = props.envMap.environmentMapTexture;
        scene.background = texture;
      },[])

    return null;
}


export default Enviroment;


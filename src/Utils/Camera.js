import {
  useFrame,
  extend,
  useThree
} from "@react-three/fiber";
import React, { useRef, useState } from 'react'
import { FirstPersonControls } from '@react-three/drei'


// extend({ FlyControls });


const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
  } = useThree();

  camera.position.set(0,0.65,0)

  // Ref to the controls, so that we can update them on every frame using useFrame
  // const controls = useRef();

  // useFrame((state) => controls.current.update());
  return (
    <FirstPersonControls autoForward={false} dragToLook={false} movementSpeed={1.0} lookSpeed={0.018} />
  );
};

export default CameraControls;
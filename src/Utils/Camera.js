import {
  useFrame,
  extend,
  useThree
} from "@react-three/fiber";
import React, { useRef, useState, useEffect } from 'react'
import { FirstPersonControls, OrbitControls } from '@react-three/drei'
import { useXR, useXRFrame } from '@react-three/xr'


// extend({ FlyControls });


const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const scene = useThree()
  // useEffect(() => void gl.setPixelRatio(window.devicePixelRatio || 2), [])
  const XRConfig = useXR();
  useXRFrame((time, xrFrame) => {
    // do something on each frame of an active XR session
    // scene.setDpr(10);
    // scene.viewport.aspect = 1
    // console.log("scene", scene.gl.getPixelRatio())
    // scene.viewport.initialDpr = 10;


  })

  console.log(XRConfig)
  XRConfig.player.position.set(0,10,0);

  // camera.position.set(0,600,0)

  // Ref to the controls, so that we can update them on every frame using useFrame
  // const controls = useRef();

  // useFrame((state) => controls.current.update());
  return (
    // <OrbitControls  />
    null
  );
};

export default CameraControls;
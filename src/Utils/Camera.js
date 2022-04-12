import {
  useFrame,
  extend,
  useThree
} from "@react-three/fiber";
import React, { useRef, useState, useEffect } from 'react'
import { FirstPersonControls, OrbitControls, PointerLockControls, PerspectiveCamera } from '@react-three/drei'
import { useXR, useXRFrame } from '@react-three/xr'
import { useSpring, animated } from '@react-spring/three'


// extend({ FlyControls });


const CameraControls = (props) => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  // const { camera } = useThree()

  // const { railCamera } = useSpring({
  //   from: { railCamera: [0, 12, -10] },
  //   to: { railCamera: [-0.3, 12, -0.5] },
  //   delay: 1000,
  //   config: { duration: 15000 },
  // });

  // camera.position.set(0, 100, 0);

  // <PerspectiveCamera makeDefault position={railCamera} />

  // let ascene = scene.gl.xr.setFramebufferScaleFactor(0.5)
  // console.log(scene.gl)

  // useEffect(() => void gl.setPixelRatio(window.devicePixelRatio || 2), [])
  // const XRConfig = useXR();

  // console.log(XRConfig)
  // XRConfig.player.position.set(0,-1,0);



  // Ref to the controls, so that we can update them on every frame using useFrame
  // const controls = useRef();

  // useFrame((state) => controls.current.update());
  return (
    // <PointerLockControls />
    null
  );
};

export default CameraControls;
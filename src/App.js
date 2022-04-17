import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
import CameraControls from "./Utils/Camera";
import LoadingBar from "./Utils/LoadingBar";
import Sources from "./Utils/Sources";
import Enviroment from "./World/Environment";
import WorldGenerator from "./World/WorldGenerator";
import Avatar from "./Utils/Avatar";
import { VRCanvas, DefaultXRControllers } from '@react-three/xr'
import { Sky } from '@react-three/drei'
import { useGLT, Loader, Box, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import './App.css';
import { DstColorFactor } from 'three';
import { useSpring, animated } from '@react-spring/three'

function App() {

  const [hexArr, setHexArr] = useState([]);
  const [assets, setAssets] = useState({});

  useEffect(() => {
    const tileArr = JSON.parse(new URLSearchParams(window.location.search).get("data"));
    // console.log("dpr", window.devicePixelRatio);
    setHexArr(tileArr)
  }, []);


    const {railCamera} = useSpring({
      from: { railCamera: [0,12,-30]},
      to: {railCamera: [0,12,-2.1]},
      delay: 10000,
      config: {duration: 35000},
  });

  const assetHandler = (assets) => {
    console.log("Assets Loaded", assets);
    setAssets(assets);;
  }

  return (
    <div className="App">
      <Canvas dpr={window.devicePixelRatio} >
        {/* <DefaultXRControllers /> */}
        <ambientLight />
        <animated.group position={railCamera} rotation={[0,Math.PI,0]}>
          <PerspectiveCamera makeDefault  />
        </animated.group>
        {/* {assets.envMap && <Enviroment envMap={assets.envMap} />} */}
        <Sky distance={45000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <CameraControls />
        {assets.world && <WorldGenerator hexArr={hexArr} worldAssets={assets.world} buildings={assets.buildings} items={assets.items} />}
        <axesHelper />
        {assets.avatar && <Avatar avatar={assets.avatar}></Avatar>}
      </Canvas>
      <LoadingBar sources={Sources} assetHandler={assetHandler} />
    </div >
  );
}

export default App;

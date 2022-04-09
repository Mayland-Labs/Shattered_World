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
import { useGLT, Loader, Box } from '@react-three/drei'
import { Suspense } from 'react'
import './App.css';
import { DstColorFactor } from 'three';

function App() {

  const [hexArr, setHexArr] = useState([]);
  const [assets, setAssets] = useState({});

  useEffect(() => {
    const tileArr = JSON.parse(new URLSearchParams(window.location.search).get("data"));
    console.log("dpr", window.devicePixelRatio);
    setHexArr(tileArr)
  }, []);

  const assetHandler = (assets) => {
    console.log("Assets Loaded", assets);
    setAssets(assets);;
  }

  return (
    <div className="App">
      <VRCanvas dpr={[1, 2]}

        gl={{ powerPreference: 'high-performance', depth: true, stencil: false, antialias: true }}

        onCreated={({ gl, scene }) => {
          gl.xr.setFramebufferScaleFactor(1);
          //scene.background = new THREE.Color('#373740')
        }}
      >
        {/* <Box position={[0, 5, -6]} scale={[10, 10, 10]}>
        <meshStandardMaterial color="black" />
      </Box> */}
        <DefaultXRControllers />
        <ambientLight />
        {/* {assets.envMap && <Enviroment envMap={assets.envMap} />} */}
        <Sky distance={45000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <CameraControls />
        {assets.world && <WorldGenerator hexArr={hexArr} worldAssets={assets.world} buildings={assets.buildings} />}
        <axesHelper />
        {assets.avatar && <Avatar avatar={assets.avatar}></Avatar>}
      </VRCanvas>
      <LoadingBar sources={Sources} assetHandler={assetHandler} />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
import CameraControls from "./Utils/Camera";
import LoadingBar from "./Utils/LoadingBar";
import Sources from "./Utils/Sources";
import Enviroment from "./World/Environment";
import WorldGenerator from "./World/WorldGenerator";
import Avatar from "./Utils/Avatar";
import { VRCanvas, DefaultXRControllers } from '@react-three/xr'
import { useGLT, Loader } from '@react-three/drei'
import { Suspense } from 'react'
import './App.css';

function App() {

  const [hexArr, setHexArr] = useState([]);
  const [assets, setAssets] = useState({});

  useEffect(() => {
    const tileArr = JSON.parse(new URLSearchParams(window.location.search).get("data"));
    setHexArr(tileArr)
  }, []);

  const assetHandler = (assets) => {
    console.log("Assets Loaded", assets);
    setAssets(assets);;
  }


  return (
    <div className="App">
      <VRCanvas gl={{ antialias: true }} dpr={window.devicePixelRatio}>
        <DefaultXRControllers />
        <ambientLight intensity={0.9} />
        <color attach="background" args={['#000000']} />
        {assets.envMap && <Enviroment envMap={assets.envMap} />}
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

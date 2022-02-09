import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
import CameraControls from "./Utils/Camera";
import LoadingBar from "./Utils/LoadingBar";
import Sources from "./Utils/Sources";
import Enviroment from "./World/Environment";
import WorldGenerator from "./World/WorldGenerator"
import './App.css';

function App() {

  const [hexArr, setHexArr] = useState([]);

  useEffect(() => {
    const tileArr = JSON.parse(new URLSearchParams(window.location.search).get("data"));
    console.log("startedasdasdasds", tileArr);
    setHexArr(tileArr)
  }, []);

  return (
    <div className="App">
      <Canvas>
       <color attach="background" args={['#000000']} />
        <Enviroment />
        <CameraControls />
        <WorldGenerator hexArr = {hexArr}/>
        <axesHelper />
      </Canvas>
      <LoadingBar sources = {Sources}/>
    </div>
  );
}

export default App;

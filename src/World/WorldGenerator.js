import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import React, { useState, Suspense, useEffect } from 'react'
import Hex from "./Hex"


function WorldGenerator(arr) {
  const [hexArr, setHexArr] = useState(arr["hexArr"]);

    useEffect(() => {
        // console.log("HEX", hexArr);
      },[])

    return(
      hexArr && hexArr.length > 0 && hexArr.map((hex)=> {
        return <Hex pos={hex["data"]}/>
      })
    )
}


export default WorldGenerator;


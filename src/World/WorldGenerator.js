import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import React, { useState, Suspense, useEffect } from 'react'
import Hex from "./Hex"


function WorldGenerator(props) {
  const [positions, setPositions] = useState([])
  const [chunks, setChunks] = useState({
    forest: props.worldAssets.forestChunk,
    plain: props.worldAssets.plainChunk,
    iron: props.worldAssets.ironChunk,
    shardium: props.worldAssets.crystalChunk,
    mountain: props.worldAssets.mountainChunk,
    plateau: props.worldAssets.plateauChunk,
  })
  const [world, setWorld] = useState()

  useEffect(() => {
    // WebGPU()
    let positions = generateHexen(3);
    let biomes = placeBiomes(positions);
    // console.log("PORTAL", props)
    setWorld(biomes);
  }, [])

  // const WebGPU = async () => {
  //   const adapter = await navigator.gpu.requestAdapter();
  //   console.log("adapter", adapter);
  //   if (!adapter) { return; }
  //   const device = await adapter.requestDevice();
  //   console.log("DEVICE", device);

  //   // Get a GPU buffer in a mapped state and an arrayBuffer for writing.
  //   const gpuBuffer = device.createBuffer({
  //     mappedAtCreation: true,
  //     size: 4,
  //     usage: GPUBufferUsage.MAP_WRITE
  //   });
  //   const arrayBuffer = gpuBuffer.getMappedRange();

  //   // Write bytes to buffer.
  //   new Uint8Array(arrayBuffer).set([0, 1, 2, 3]);
  // }


  let diameter = 20;
  let radio = diameter / 2

  const generateHexen = (maxCircles) => {
    const zMatrix = [-radio, -diameter, -radio, radio, diameter, radio];
    const xMatrix = [diameter, 0, -diameter, -diameter, 0, diameter];
    let hexen = [];

    let firstHalfX = [];
    let lastHalfX = [];
    let centerX = [];

    let firstSegmentX=[];    
    let lastSegmentX=[];


    // let target = 1;
    // for (let z = 0; z <= target; z++) {
    //   if (z != target) {
    //     firstHalfX.push(z * 20 * -1);
    //   } else {
    //     for (let i = 0; i <= target; i++) {
    //       centerX.push(z * -20);
    //     }
    //   }
    // }

    // lastHalfX = [...firstHalfX]
    // lastHalfX.reverse().pop();

    // firstSegmentX = [...firstHalfX, ...centerX, ...lastHalfX];
    // lastSegmentX = [...firstSegmentX]

    // lastSegmentX.forEach((elem, index) => {
    //   lastSegmentX[index] = elem * -1;
    // });
    
    // let circleX = [...firstSegmentX, ...lastSegmentX]; 

    // // console.log("circleX", circleX);

    // for(let z = 40; z >= 0; z -= 10){
    //   console.log("Z", z)
    // }

    hexen.push([[0, 0, 0]]);

    for (let i = 1; i <= maxCircles; i++) {

      //Create new Circle
      let circle = [];

      //Y Counter
      let zCounter = (i * 20)

      //X Counter
      let xCounter = 0;

      //Populate Matrices
      let zMatrixScaled = []
      let xMatrixScaled = []

      for (let x = 0; x < zMatrix.length; x++) {
        for (let z = 0; z < i; z++) {
          zMatrixScaled.push(zMatrix[x])
          xMatrixScaled.push(xMatrix[x])
        }
      }

      // console.log("zMatrixScaled",zMatrixScaled);
      // console.log("xMatrixScaled",xMatrixScaled)


      // console.log("zMatrixScaled", zMatrixScaled);
      // console.log("xMatrixScaled", xMatrixScaled);

      // console.log("---------------------", yCounter);

      for (let n = 0; n < zMatrixScaled.length; n++) {
        zCounter = zCounter + zMatrixScaled[n]
        xCounter = xCounter + xMatrixScaled[n]
        // console.log(i, xCounter)
        circle.push([xCounter, 0, zCounter]);
      }

      // console.log("circle", circle);
      hexen.push(circle)
    }
    console.log("HEXEN", hexen)
    return hexen;
  }

  const placeBiomes = (pos) => {
    let ecosystem = [];

    let biomeSpawn = {
      plain: 0.65,
      forest: 1,
      mountain: 0.15,
      plateau: 0.35,
      iron: 0.05,
      shardium: 0.01,
    }

    pos.forEach((circle, i) => {
      ecosystem.push([]);
      circle.forEach((pos, x) => {
        let randomNumber = Math.random();
        let biomeSelected = {};
        let building = null;

        if (i == 0 || i == 1) {
          if (i == 0) {
            // biomeSelected = { type: "plain", model: chunks.plain };
            building = props.buildings.spawn;
            // console.log("buildingbuilding", building)
          } else {
            biomeSelected = { type: "plain", model: chunks.plain };
          }
        } else {
          if (randomNumber <= biomeSpawn.shardium) {
            let randomType = Math.random() * 3;
            biomeSelected = { type: "shardium", model: chunks.shardium };
          } else if (randomNumber <= biomeSpawn.iron) {
            biomeSelected = { type: "iron", model: chunks.forest };
          } else if (randomNumber <= biomeSpawn.mountain) {
            biomeSelected = { type: "mountain", model: chunks.mountain };
          } else if (randomNumber <= biomeSpawn.plateau) {
            biomeSelected = { type: "plateau", model: chunks.plain };
          } else if (randomNumber <= biomeSpawn.plain) {
            biomeSelected = { type: "plain", model: chunks.plain };
          } else if (randomNumber <= biomeSpawn.forest) {
            biomeSelected = { type: "forest", model: chunks.forest };
          }
        }

        // console.log("biomeSelected", biomeSelected)
        ecosystem[i].push({ position: pos, type: biomeSelected.type, model: biomeSelected.model, buildings: building, circle: i })
      })
    })

    // console.log("ECOSYSTEM", ecosystem)
    return ecosystem;
  };

  return (
    world ? world.map((circle, i) => {
      return circle.map((hex, x) => {
        return <Hex hex={hex} delay={(6 * i) + x} />
      })
    }) : null
  )
}


export default WorldGenerator;


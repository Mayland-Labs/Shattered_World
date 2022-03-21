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
    let positions = generateHexen(10);
    let biomes = placeBiomes(positions);
    console.log("PORTAL", props)
    setWorld(biomes);
  }, [])

  let diameter = 100;
  let radio = (diameter * 0.96) / 2
  let radioX = diameter * 0.84;

  const generateHexen = (maxCircles) => {
    const zMatrix = [-radio, -diameter, -radio, radio, diameter, radio];
    const xMatrix = [radioX, 0, -radioX, -radioX, 0, radioX];
    let hexen = [];

    hexen.push([[0, 0, 0]]);

    for (let i = 1; i <= maxCircles; i++) {

      //Create new Circle
      let circle = [];

      //Y Counter
      let zCounter = i

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

      // console.log("zMatrixScaled", zMatrixScaled);
      // console.log("xMatrixScaled", xMatrixScaled);

      // console.log("---------------------", yCounter);

      for (let n = 0; n < zMatrixScaled.length; n++) {
        zCounter = zCounter + zMatrixScaled[n]
        xCounter = xCounter + xMatrixScaled[n]
        circle.push([xCounter, 0, zCounter]);
      }

      // console.log("circle", circle);
      hexen.push(circle)
    }
    // console.log("PRE- HEXEN", hexen)
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
            console.log("buildingbuilding", building)
          } else {
            biomeSelected = { type: "plain", model: chunks.plain };
          }
        } else {
          if (randomNumber <= biomeSpawn.shardium) {
            biomeSelected = { type: "shardium", model: chunks.shardium };
          } else if (randomNumber <= biomeSpawn.iron) {
            biomeSelected = { type: "iron", model: chunks.iron };
          } else if (randomNumber <= biomeSpawn.mountain) {
            biomeSelected = { type: "mountain", model: chunks.mountain };
          } else if (randomNumber <= biomeSpawn.plateau) {
            biomeSelected = { type: "plateau", model: chunks.plateau };
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
        return <Hex hex={hex} delay = {(6 * i) + x} />
      })
    }) : null
  )
}


export default WorldGenerator;


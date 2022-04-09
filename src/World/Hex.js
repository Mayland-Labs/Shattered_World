import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three'
import { TimelineLite } from "gsap/all";



function Hex(props) {
  const [position, setPosition] = useState({ ...props.hex.position })

  // console.log("position", position);
  //Animated Spawn
  const {spawn} = useSpring({
    from: { spawn: [position[0], -100, position[2]]},
    to: {spawn: [position[0], 0, position[2]]},
    delay: 1000 * props.delay,
    config: {duration: 30000},
});

  // console.log("SPAWN", spawn)
  // console.log("POSITION", position);
  let auxPos = position;

  const type = props.hex.type
  // console.log("POSITIONNNNNN", position)
  // console.log("POSPOSPOS", position)
  let scene
  if (props.hex.model) {
    scene = props.hex.model.scene.clone();
  }
  const randomTilt = Math.round(Math.random() * 7);
  const circle = props.hex.circle;
  // console.log("circle", props.hex.circle);

  //Buildings
  let buildings;
  let portalPos;

  if (props.hex.buildings) {
    // console.log("HEREEEEEEEE", props.hex.buildings)
    buildings = props.hex.buildings;
    // console.log("buildings",  buildings)
    portalPos = { ...position };
    // console.log("pportalHeight", portalPos);
  }

  //Height

  if (circle > 1) {
    let randomHeight;
    if (type == "shardium" || type == "mountain" || type == "plateau" | type == "iron") {
      // console.log("TYPEEE", type)
      randomHeight = 0.05 + ((Math.random()) * 0.25);
    } else {
      randomHeight = (Math.random() - 0.5) * 0.1;
    }
    position[1] = randomHeight;
  } else {
    // position[1] = 0;
  }


  // console.log("POSITIONNN", position)

  return (
    <group>
      {scene && <animated.primitive position={spawn} scale = {[20,20,20]} dispose={null} object={scene} rotation={[0, (1.5 * Math.PI) + (Math.PI / 3) * randomTilt, 0]} />}
      {buildings ? <primitive position={[portalPos[0], 0, portalPos[2]]} scale = {[20,20,20]} dispose={null} object={buildings.scene} rotation={[0, (1.5 * Math.PI), 0]} /> : null}
    </group>
  );
}

export default Hex;


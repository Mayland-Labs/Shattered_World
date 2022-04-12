import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three'
import { TimelineLite } from "gsap/all";



function Staff(props) {
    const [staff, setStaff] = useState(props.items.scene)
    const [startingTime, setStartingTime] = useState(0);

    let delta 
    useFrame((state, delta, xrFrame) => {
        setStartingTime(startingTime + delta);
        staff.children[0].rotation.y += 0.02;
        staff.children[2].rotation.y += 0.01;
        staff.position.y = 10.2 + Math.sin(startingTime) / 4;
    })

    return (
        <primitive position={[-0.3, 10.2, 3.5]} scale={[3, 3, 3]} dispose={null} object={staff} rotation={[0,Math.PI/2,0]}/>
    )
}

export default Staff;


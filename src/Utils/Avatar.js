import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { useGLTF } from '@react-three/drei';


function Avatar(props) {
    const [avatar, setAvatar] = useState(props.avatar.avatar)
    console.log("PROPS AVATAR", avatar);
    // console.log("AVATAR SPAWN", avatar)

    return (
        // <primitive position={[0.1,0.26,0.3]} dispose={null} scale={0.1,0.1,0.1} object={avatar.scene} />
        null 
    )
}

export default Avatar;


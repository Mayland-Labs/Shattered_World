import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber'
import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { useGLTF } from '@react-three/drei';


function Avatar(props) {
    const [avatar, setAvatar] = useState(props.avatar.avatar.scene)
    console.log("PROPS AVATAR", avatar);

    avatar.traverse( function( object ) {
        object.frustumCulled = false;
    } );

    return (
        <primitive position={[-0.5,9.5,0]} scale={[1.8,1.8,1.8]} object={avatar} />
    )
}

export default Avatar;


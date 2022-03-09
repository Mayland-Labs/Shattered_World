
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Forest(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/World/Chunks/forestChunk.glb')
  
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.piedras007.geometry}
        material={nodes.piedras007.material}
      />
    </group>
  )
}

useGLTF.preload('World/Chunks/forestChunk.glb')

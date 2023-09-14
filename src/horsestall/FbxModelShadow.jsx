import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {  useFBX, useGLTF, useAnimations } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'

import * as THREE from "three";
// var skinnedMeshs=[];  
function ShadowRender (props) {
    //const path = "/glb/horseScene.glb";
    const path = "/horsestall/glb/exportshadow.glb";
    
    
    const glb = useGLTF(path);
    
    const group = useRef()    
    const { nodes, materials, animations } = glb;
    const { actions } = useAnimations(animations, group)    


    const material = new THREE.ShadowMaterial();
    material.opacity = 1.0;
    
    // materials.real_horse_dif01.map = textures[props.texture];
    
    
    // materials.real_horse_dif01.emissiveIntensity = 2.0
    // materials.real_horse_dif01.aoMapIntensity = 5.5
    // materials.real_horse_dif01.roughnessMapIntensity = 0

    useEffect(()=>{
        actions['bodystand01'].play();
        // actions['clothstand01'].play();
        // actions['reinsstand01'].play();
        // for(var i = 0; i < actions.length; ++i)
        // {
        //     if(i!=0)
        //         break;
        //     actions[i].play();
        // }
        //materials.real_horse_mask_dif01
        //props.texture;
    },[])

    return (
        <group ref={group} {...props} dispose={null}>
          <group>                      
            <group name="shadow" rotation={[0, Math.PI / 2, 0]} position={[10,1, 0]} scale={[30,0.1,30]}>
              <group name="shadowbody">
                <group
                  name="Bip001shadow"
                  position={[0, 1.065, -0.363]}
                  rotation={[-Math.PI / 2, 0, -1.571]}
                >
                  <primitive object={nodes.Bip001_Pelvis} />
                </group>
                <skinnedMesh
                  name="h_bodyshadow"
                  geometry={nodes.h_body.geometry}
                  material={material}
                  skeleton={nodes.h_body.skeleton}
                  rotation={[-Math.PI / 2, 0, 0]}                  
                />
              </group>
              {/* <group name="real_horse_cloth01">
                <group
                  name="Bip001_1"
                  position={[0, 1.065, -0.363]}
                  rotation={[-Math.PI / 2, 0, -1.571]}
                >
                  <primitive object={nodes.Bip001_Pelvis_1} />
                </group>
                <skinnedMesh
                  name="h_cloth"
                  geometry={nodes.h_cloth.geometry}
                  material={materials.real_horse_mask_dif01}
                  skeleton={nodes.h_cloth.skeleton}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
              <group name="real_horse_reins01">
                <group
                  name="Bip001_2"
                  position={[0, 1.065, -0.363]}
                  rotation={[-Math.PI / 2, 0, -1.571]}
                >
                  <primitive object={nodes.Bip001_Pelvis_2} />
                </group>
                <skinnedMesh
                  name="h_reins"
                  geometry={nodes.h_reins.geometry}
                  material={materials.real_horse_saddle_dif01}
                  skeleton={nodes.h_reins.skeleton}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group> */}
            </group>
          </group>
        </group>
      );
  };


export default ShadowRender;
import { useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useEffect, useRef, useState } from 'react'
import {useMediaQuery } from '@mui/material';
import FbxRender from './FbxModel.jsx'
import ShadowRender from './FbxModelShadow.jsx'

export function CustomGeometrys(props)
{
    // const isDesktop = useMediaQuery('(min-width:1120px)');
    // const position=isDesktop?[0,-1,0]:[0,-1,0];
    // const rotation=[0,Math.PI*0.5,0];
    // const scale=1;

    useEffect(()=>{
        props.sethorseShape(props.defaulthorseShape);
    },[])

    return (
        <group>          
          
          <FbxRender
            texture ={props.texture}
            horse={props.horse}
          >            
          </FbxRender>        
          {/* <ShadowRender></ShadowRender> */}
          
        </group>
    );
}

export function TurnTableModel(props) {  
  
    const turnTable = useLoader(GLTFLoader, '/gltf/turntable/roundtable.gltf');
    const [childCount,setchildCount] = useState(0);    
    useEffect(()=>{
      turnTable.scene.children.forEach((child)=>{
        if(child.name.includes('shadow'))
        {
          child.material.envMapIntensity = 0.1;
          child.material.map.opacity = 0.3;
          child.material.opacity = 0.2;
        }
        else if(child.material != null)
        {
          child.material.emissiveIntensity = 10;
        }
      })
      
      //props.sethorseShape(props.defaulthorseShape);
    },[])
  
    return (
        <group>        
          <primitive
            receiveShadow={true}
            object={turnTable.scene}
            position={props.position}            
            // position={[0.3,-1,0]}            
            scale={1.2}
          />
        </group>
    )
  }
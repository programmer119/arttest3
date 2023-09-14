import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { LeftMiddle } from './layout/styles'
import {
  Html,
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
  useProgress,
  Lightformer,
  useHelper,
  SoftShadows,
  PerspectiveCamera,
  AccumulativeShadows,
  RandomizedLight,
  OrthographicCamera,
  Plane
} from '@react-three/drei';
import {
  CustomOrbit,
  CustomPostEffect,
  CustomPointLight,
  CustomSpotLight,
  CustomEnv,
  CustomLight,
  
} from './CustomEnvironment';
import { CustomGeometrys } from './CustomGeometrys';

import * as CustomUtil from './CustomUtil';
import { CameraHelper } from 'three';

function Loader() {
  // const { progress } = useProgress()
  // return <Html center>{progress} % loaded</Html>
  return <Html center></Html>
}

function CustomCanvas(props) {
  const [perfSucks, degrade] = useState(false);
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const [height, setheight] = useState(25);
  // useFrame((delta)=>{
  //   console.log("DELTA : " + delta);
  // })

  return (
    <div
    id="canvas-container"
    style={{
      // position:'relative',
      position: isDesktop ? 'absolute' : 'relative',
      width: '100%',
      maxHeight: '400px',
      //height: isDesktop ? '100%' : '100%'//'61vh',
      height: '400px',
      //height: isDesktop ? '100%' : '100vh',
      zIndex: '1',
    }}
    className="flex object-cover"
  >     

      <Canvas shadows          
        >
        
        <Suspense fallback={<Loader/>}>          
          <CustomEnv 
            perfSucks={perfSucks} 
            file={props.file}
            heightparent={height}
          />        
          <CustomLight perfSucks={perfSucks}></CustomLight>        
          <CustomGeometrys
            texture = {props.texture}
            horseShape={props.horseShape}
            sethorseShape={props.sethorseShape}
            defaulthorseShape={props.defaulthorseShape}
          />

          <Plane receiveShadow position={[-15.5, 0.5, -100]} rotation-x={-Math.PI / 2} args={[1500, 1500]}>
            <shadowMaterial opacity={0.65} />
          </Plane>          
          
        </Suspense>        
        <CustomOrbit/>
        <CustomPostEffect></CustomPostEffect>
        <PerspectiveCamera makeDefault position={[-30, 100, 20]} fov={35}  />
        
      </Canvas>     
      {/* <LeftMiddle>
        <input type="range" min="0" max="100" value={height} step="1" onChange={(e) => setheight(e.target.value)} />
      </LeftMiddle> */}
    </div>
  );
}



function CustomCamera()
{
  const cameraRef = useRef();
  const camera = useThree(state => state.camera);

  // useHelper(camera, CameraHelper);

  return(<group></group>)
}

export default CustomCanvas;
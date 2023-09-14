import { Geometry, Base, Subtraction, Addition } from '@react-three/csg'
import { useControls } from 'leva'
import {
  Html,
  ContactShadows,
  Environment,
  OrbitControls,
  useProgress,
  Lightformer,
  useHelper,
  SoftShadows,
  PivotControls,
} from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Slider } from '@mui/material';

//  import { 
//   EffectComposer, 
//   DepthOfField, 
//   Bloom, 
//   Noise, 
//   Vignette 
// } from '@react-three/postprocessing'
// import { Direction } from "react-toastify/dist/utils";

export function CustomLight(perfSucks) {
  return (
    <group>      
      <CustomShadowLight></CustomShadowLight>
      <CustomAmbientLight></CustomAmbientLight>
      <CustomSpotLight></CustomSpotLight>
      <CustomDirectionLight></CustomDirectionLight>
      {/* <CustomAmbientLight></CustomAmbientLight> */}
    </group>
  );
}

export function CustomEnv({ perfSucks, file, heightparent }) {  

  var files= '/arttest3/horsestall/bg/cr/inside.hdr';
  const [rerender, setrerender]=useState(false);
  

  const { height, scale, radius } = useControls('Environment',{
    height: { value: 25, min : 0, max : 100 },
    scale: { value: 1300, min : 0, max : 2000 },
    radius: { value: 110, min : 0, max : 1000 }
  })

  // const { scale } = useControls({
  //   scale: { value: 1300, min : 0, max : 2000 }
  // })

  return (

      <Environment      
        SoftShadows={true}
        receiveShadow={true}
        files={files}
        ground={{ height: height, radius: radius, scale: scale }}
      >     
      </Environment>    
  );
}

export function CustomPointLight() {
  const positions = [
    [-0.1, 0.1, 0],
    [0.2, -0.0, 0],
  ];
  const size = 0.3;
  const intensity = 50;
  const color = 'white';

  const pointLightRefs = [useRef(null), useRef(null)];

  // useHelper(pointLightRefs[0], PointLightHelper, size, color);
  // useHelper(pointLightRefs[1], PointLightHelper, size, color);

  return (
    <group>
      <pointLight ref={pointLightRefs[0]} intensity={intensity} distance={size} position={positions[0]} color={color} />
      <pointLight ref={pointLightRefs[1]} intensity={intensity} distance={size} position={positions[1]} color={color} />
    </group>
  );
}

export function CustomShadowLight(){
  return (
    <spotLight angle={0.5} castShadow position={[-80, 200, -100]} intensity={0} shadow-mapSize={[515, 512]} />
  )
}

export function CustomSpotLight() {
  const targetObject = new THREE.Object3D();
  targetObject.position.set(0, 0, 0);

  // const { size } = useControls('3D Object',{
  //   size: { value: 1, min : -1, max : 1 }
  // })

  var size = 1;
  const positions = [
    [0.0, 0.0, 0.7],
    [0.0, 0.0, -0.7],
  ];
  const intensity = 2.5;
  const color = 'white';
  const angle = 1.7;
  //   penumbra?: number,
  // decay?: number,

  const spotLightRefs = [useRef(null), useRef(null)];

  // useHelper(spotLightRefs[0], SpotLightHelper, size, color);
  // useHelper(spotLightRefs[1], SpotLightHelper, size, color);

  return (
    <group>
      <spotLight 
        castShadow
        shadow-mapSize={[512,128]}
        ref={spotLightRefs[0]}
        intensity={intensity}
        distance={size}
        position={positions[0]}
        color={color}
        angle={angle}
        target={targetObject}
      />
      <spotLight
        castShadow
        shadow-mapSize={[512,128]}
        ref={spotLightRefs[1]}
        intensity={intensity}
        distance={size}
        position={positions[1]}
        color={color}
        angle={angle}
        target={targetObject}
      />
    </group>
  );
}

function CustomAmbientLight() {
  const csg = useRef()
  return (
  <group>
    <PivotControls activeAxes={[false, true, true]} rotation={[0, Math.PI / 2, 0]} scale={1} anchor={[0, 0, 0.4]} onDrag={() => csg.current.update()}>
        <ambientLight intensity={1.0} color={'white'} />      
    </PivotControls>    
  </group>)
}

function CustomDirectionLight() {
  // const targetObject = new THREE.Object3D();
  // targetObject.position.set(0,0,0);

  // const positions = [[0.0,0.0,0.7], [0.0,0.0,-0.7]];
  // const size = 1.0;
  // const intensity = 2.5;
  // const color = 'white';
  // const angle = 1.7;

  return (
    <group>
      <directionalLight
        name="Directional_Light"
        intensity={3.14}
        decay={2}
        color="#fffaec"
        position={[0, 3, 0]}
        rotation={[-2.199, -0.327, -2.725]}

        castShadow={true}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}        
      >
        <group position={[0, 0, 0]} />
      </directionalLight>
    </group>
  );
}

export function CustomPostEffect() {
  return (
    <group></group>
    // <EffectComposer>
    //   <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
    //   <Bloom luminanceThreshold={0} luminanceSmoothing={2.0} height={500} intensity={1.5} />
    //   <Vignette eskil={false} offset={0.1} darkness={0.1} />
    // </EffectComposer>
  );
}

export function CustomOrbit() {
  var PolarAngle = Math.PI / 2.25-0.2;
  var AzimuthAngle = -0.8;

  var {useOrbit} = useControls('ETC', {
    useOrbit : {value:false}
  });

  var minPolarAngle;
  var maxPolarAngle;
  var minAzimuthAngle;
  var maxAzimuthAngle;

  if(useOrbit)
  {
    minPolarAngle = PolarAngle - 0.5;
    maxPolarAngle = PolarAngle + 0.5;
    minAzimuthAngle = AzimuthAngle - 1.5;
    maxAzimuthAngle = AzimuthAngle + 1.5;
  }
  else
  {
    minPolarAngle = PolarAngle;
    maxPolarAngle = PolarAngle;
    minAzimuthAngle = AzimuthAngle;
    maxAzimuthAngle = AzimuthAngle;
  }
  

  return (
    <OrbitControls     
    target={[0,14,0]}
    enableZoom={false} 
    enablePan={false} 
    minPolarAngle={minPolarAngle} 
    maxPolarAngle={maxPolarAngle} 
    minAzimuthAngle={minAzimuthAngle}
    maxAzimuthAngle={maxAzimuthAngle}
    makeDefault />

    // <OrbitControls
    //   minPolarAngle={0}
    //   maxPolarAngle={Math.PI * 0.5}
    //   // minDistance={2}
    //   // maxDistance={5}
    //   minDistance={-200}
    //   maxDistance={500}
    //   enablePan={false}
    //   target={[0, 0, 0]}
    //   // position0={[-1,0,0]}
    // ></OrbitControls>
    // // <group></group>
  );
}

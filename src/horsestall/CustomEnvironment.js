import { Sprite } from 'three';
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
  TransformControls,
} from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  SpotLightHelper, 
  PointLightHelper,
  DirectionalLightHelper
} from 'three';
import { Slider } from '@mui/material';
import { proxy, useSnapshot } from 'valtio'

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
      {/* <CustomSpotLight></CustomSpotLight> */}
      <CustomDirectionLight></CustomDirectionLight>
      {/* <CustomAmbientLight></CustomAmbientLight> */}
    </group>
  );
}

// export function CustomEnv({ perfSucks, file, heightparent }) {  

//   var files= '/arttest3/horsestall/bg/cr/inside.hdr';
//   const [rerender, setrerender]=useState(false);
  

//   const { height, scale, radius } = useControls('Environment',{
//     height: { value: 25, min : 0, max : 100 },
//     scale: { value: 1300, min : 0, max : 2000 },
//     radius: { value: 110, min : 0, max : 1000 }
//   })

//   return (
//       // <group></group>
//       <Environment      
//         SoftShadows={true}
//         receiveShadow={true}
//         files={files}
//         ground={{ height: height, radius: radius, scale: scale }}        
//       >     
//       </Environment>    
//   );
// }

export function CustomEnv({ perfSucks, file, heightparent, page }) {  

  var fileName = `/arttest3/horsestall/bg/2d/${page}.png`;
  console.log(fileName);
  
  //  const [src, setSrc] = useState(fileName);  
  // var loader = new THREE.TextureLoader();
  // const texture = loader.load(src);
  // const texture = loader.load(`/arttest3/horsestall/texture/real_horse_dif0${1}.png`);
 
  var loader = new THREE.TextureLoader();
  var texture = loader.load(fileName);

  return ( 
    <group  
    // style={{
    //   // position:'relative',
    //   'absolute' : 'relative',
    //   width: '100%',
    //   maxHeight: '400px',
    //   //height: isDesktop ? '100%' : '100%'//'61vh',
    //   height: '400px',
    //   //height: isDesktop ? '100%' : '100vh',
    //   zIndex: '300',
    // }}    
    position={[100,-5,-100]}
    scale={[753/2.5, 426/2.5,1]}>
      


      <sprite>
        <spriteMaterial 
        map={texture} />
      </sprite>

      <mesh  scale={[1,1]}>
        <planeBufferGeometry/>
        <meshStandardMaterial map={texture}/>
      </mesh>
    </group>   
      // <sprite>
      //   <spriteMaterial map={texture} />
      // </sprite>
  );

  // return (

  //   <img src="/horsestall/bg/2d/country1.jpg" 
  //     alt="Foo eating a sandwich." 
  //     style={{ width: "100%", height: "100%" }}
  //     />  
  // );
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
  useHelper(pointLightRefs[0], PointLightHelper, 0.5, "hotpink")

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
  //-24, 34, -12
  const shadowResolution = 0.5;
  return (
    <spotLight 
      angle={0.5} 
      castShadow 
      position={[-240*shadowResolution, 340*shadowResolution, -120*shadowResolution]} 
      intensity={0} 
      shadow-mapSize={[515, 512]} />
  )
}

export function CustomSpotLight() {
  const intensity = 2.5;
  const color = 'white';
  const angle = 0.4;
  var distance = 6;

  const targetObject = new THREE.Object3D();
  targetObject.position.set(0, 1, 0);

  const positions = [
    [0.0, 5.0, 6.0],
    [0.0, 0.0, -6.0],
  ];


  const useLight = [false, false];

  const spotLightRefs = [useRef(null), useRef(null)];

  
  useHelper(spotLightRefs[0], SpotLightHelper, distance, "hotpink")  
  useHelper(spotLightRefs[1], SpotLightHelper, distance, "hotpink")

  // useHelper(spotLightRefs[0], SpotLightHelper, size, color);
  // useHelper(spotLightRefs[1], SpotLightHelper, size, color);
  var renderSpotLights = [];
  for(var i = 0; i < useLight.length; ++i)
    if(useLight[i])
    renderSpotLights.push(
      <spotLight 
      // castShadow
      // shadow-mapSize={[512,128]}
      ref={spotLightRefs[i]}
      intensity={intensity}
      distance={distance}
      position={positions[i]}
      color={color}
      angle={angle}
      target={targetObject}
    />
  )

  return (
    <group>
      {renderSpotLights}
      {/* <spotLight 
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
      /> */}
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

const FromToTargetAngle=(from, target)=>
{
  // const from = new THREE.Vector3(0, 1, 2);
  // const to = new THREE.Vector3(5, 3, 5);
  const angle = new THREE.Vector3().setFromRotationMatrix(new THREE.Matrix4().lookAt(from, target, new THREE.Vector3(0, 1, 0)));
  return angle;
}

function CustomDirectionLight() {
  const fromRef = useRef(null);
  const targetRef = useRef(null);
  const dirLightRef = useRef(null);
  const targetObject = new THREE.Object3D();
  targetObject.position.set(0,0,0);

  // const positions = [[0.0,0.0,0.7], [0.0,0.0,-0.7]];
  // const size = 1.0;
  // const intensity = 2.5;
  // const color = 'white';
  // const angle = 1.7;
  var lightColor = 0xFF0000;
  // const [lightPosition,setlightPosition] = useState([-5, 30, 0]);
  // var lightRotation = [-2.199, -0.327, -2.725];
   const pivotRef = useRef(null);

  //  useEffect(()=>{
  //   console.log("lightPosition");
  //  },[fromRef.current.position])

  const { lightPosition } = useControls('LIGHT',{
    lightPosition: { value: [-24, 34, -12] },
  })

  if(fromRef.current)
  console.log(fromRef.current.position);
  
  useHelper(dirLightRef, DirectionalLightHelper, 3, lightColor );  

  // useEffect(()=>{
  //   console.log('fromRef.current.position : ' + fromRef.current.position);
  // },[fromRef.current !==null && fromRef.current.position]);

  return (
    <group>

      {/* <PivotControls ref = {pivotRef} onDrag={(val)=>{
        console.log('drag pivot : ' + pivotRef.current.position);
        console.log('drag box : ' + fromRef.current.position);
        setlightPosition(fromRef.current.position);
      }}
        anchor={[1, -1, -1]} scale={75} rotation={[0,0,Math.PI*0]}  depthTest={false} fixed lineWidth={2}>
        <mesh position={lightPosition} ref = {fromRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </PivotControls> */}

      {/* <PivotControls 
        anchor={[1, -1, -1]} scale={75} depthTest={false} fixed lineWidth={2}>
        <mesh position={lightPosition} ref = {targetRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </PivotControls> */}




      {/* <mesh name='LightPos' position={lightPosition} ref = {fromRef}
        
        onClick={(e) => (e.stopPropagation(), (state.current = 'LightPos'), console.log(fromRef.current.position))}
        onPointerMissed={(e) => e.type === 'click' && (state.current = null)}      
        // onDrag={(e)=>{console.log('LightPos')}}
      >        
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
      </mesh>

      <mesh name='LightTarget' position={targetObject.position}
        onClick={(e) => (e.stopPropagation(), (state.current = 'LightTarget'))}
        onPointerMissed={(e) => e.type === 'click' && (state.current = null)}      
      >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
      </mesh>

      <Controls /> */}

      <directionalLight ref={dirLightRef}
        name="Directional_Light"
        intensity={3.14}
        decay={2}
        color={lightColor.toString()} //"#fffaec"
        position={fromRef.current ? fromRef.current.position : lightPosition}
        target={targetObject}
        // rotation={lightRotation}

        castShadow={false}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}        
      >
        {/* <group position={[0, 0, 0]} /> */}
      </directionalLight>
      
    </group>
  );
}
const modes = ['translate', 'rotate', 'scale']
const state = proxy({ current: null, mode: 0 })
function Controls() {
  // Get notified on changes to state
  const snap = useSnapshot(state)
  const scene = useThree((state) => state.scene)
  return (
    <>
      {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
      {snap.current && <TransformControls object={scene.getObjectByName(snap.current)} mode={modes[snap.mode]} />}
      {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
      {/* <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} /> */}
    </>
  )
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
  var PolarAngle = Math.PI / 2.25-0.1;
  var AzimuthAngle = -0.87;

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

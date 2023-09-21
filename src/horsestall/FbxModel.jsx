// import { extend, useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {  
  useFBX, 
  useGLTF, 
  useAnimations,
  AccumulativeShadows,
  RandomizedLight,
  Center,
  Lightformer,
  Environment,
  Float,
  SoftShadows,
  PivotControls,
} from '@react-three/drei'
import { useControls } from "leva"
import React, { useState, useEffect, useRef } from 'react'
import * as THREE from "three";
import {useFrame} from  "@react-three/fiber"
import * as config from '../../src/config';
// import { 
//   LayerMaterial, 
//   Color, 
//   Depth 
// } from 'lamina'

var textures;
var metalnessMap;
var roughnessMap;
var occulusionMap;

function LoadTextures(textureindex)
{
  var loader = new THREE.TextureLoader();
  textures = loader.load(`/arttest3/horsestall/texture/${textureindex}.png`);
  // roughnessMap = loader.load(`/horsestall/texture/real_horse_roughness.png`);
  // roughnessMap.minFilter = THREE.LinearFilter;
  // roughnessMap.magFilter = THREE.LinearFilter;

  // metalnessMap = loader.load(`/horsestall/texture/real_horse_metalness.png`);
  // metalnessMap.minFilter = THREE.LinearFilter;
  // metalnessMap.magFilter = THREE.LinearFilter;

  // occulusionMap = loader.load(`/horsestall/texture/real_horse_occulusion.png`);  
  // occulusionMap.minFilter = THREE.LinearFilter;
  // occulusionMap.magFilter = THREE.LinearFilter;

}    

var copyMaterials = null;
const aninames = ['bodystand01','bodystand02'];
var aniIndex = 0;
var currentTick = 0;
var maxTick = 1;
var loadingTime = 0;

function FbxRender (props) {
    const path = "/arttest3/horsestall/glb/export.glb";
    const glb = useGLTF(path);    
    const group = useRef()    
    const { nodes, materials, animations } = glb;
    const { actions } = useAnimations(animations, group)        

    // const { size } = useControls('3D Object',{
    //   size: { value: 1, min : -1, max : 1 }
    // })

    var texind = props.horse;//props.texture;
    var page = props.page;

    // console.log('hs : ' + config.settings[page].horseScale );

    const { horseScale } = useControls('3D Object',{
      horseScale: { value : config.settings[page].horseScale, min : 1, max : 100}
    });

    const boxRef = useRef();
    
    const {metalness, roughness, normalscale} = useControls('3D Object',{
      metalness :{value : 0.5, min : 0, max : 5.0},
      roughness :{value : 0.5, min : 0, max : 5.0},
      normalscale : {value : 1.0, min : 0, max : 5.0}
    });

    const [refreshRender, setrefreshRender] = useState(false);

    materials.real_horse_dif01.envMapIntensity = 1.0;
    materials.real_horse_dif01.metalness = metalness;
    //materials.real_horse_dif01.metalnessMap = metalnessMap;

    materials.real_horse_dif01.roughness = roughness;
    // materials.real_horse_dif01.roughnessMap = roughnessMap;

    materials.real_horse_dif01.clearcoat = 0.5;         
    materials.real_horse_dif01.normalScale.set(normalscale, normalscale)
    // materials.real_horse_dif01.normalScale.set(2.5, 2.5)
    // materials.real_horse_dif01.normalScale.set(2.5, 2.5)

    // materials.real_horse_dif01.color = new THREE.Color("#f00");//.convertSRGBToLinear();
    copyMaterials = materials.real_horse_dif01.clone();    
    LoadTextures(texind);
    ChangeMaterial(texind);
    

    useEffect(()=>{
      console.log(`FbxRender TEXTURE : ${texind}`);      

      for(var i = 0; i < aninames.length; ++i)
      {
        var aniName = aninames[i];
        actions[aniName].play();
        actions[aniName].reset().play().paused = true;  
      }
    },[])
    
    useFrame((_, delta) => {
      var aniName = aninames[aniIndex];
      actions[aniName].time = actions[aniName].getClip().duration * currentTick;
            
      currentTick += delta * 0.3;
      if(currentTick > maxTick)
      {
        currentTick = 0;
        if(aniIndex===0)
          aniIndex = 1;
        else
          aniIndex = 0;
      }
      loadingTime += delta;
      if(loadingTime > 0)
        setrefreshRender(true);
      // console.log("loadingTime : " + loadingTime*0.3);
    })

    return (
      <group>        
        <group ref={group} {...props} dispose={null}>                  
          <group>                
            <group name="HorseExport" 
            rotation={config.settings[page].horserotation} 
            position={config.settings[page].horseposition} 
            scale={horseScale}>
                <group name="real_horse_body01">
                  <group
                    name="Bip001"
                    position={[0, 1.065, -0.363]}
                    rotation={[-Math.PI / 2, 0, -1.571]}
                  >
                  <primitive object={nodes.Bip001_Pelvis} />                
                  </group>

                  {!refreshRender ? '':
                
                  <skinnedMesh
                    castShadow
                    name="h_body"
                    geometry={nodes.h_body.geometry}
                    material={copyMaterials}
                    // roughnessMap={roughnessMap} 
                    // occulusionMap={occulusionMap}
                    // material={new THREE.MeshPhongMaterial({
                    //   copyMaterials,
                    //   occulusionMap,
                    //   roughnessMap,
                    //   roughness: 0.5,
                    // })}


                    
                    skeleton={nodes.h_body.skeleton}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  }

                </group>     
              
                
              {/* <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
                <RandomizedLight amount={8} radius={10} ambient={0.5} position={[-5, 5, -1]} />
              </AccumulativeShadows>               */}
              {/* <AccumulativeShadows temporal frames={100} color="black" colorBlend={2} toneMapped={true} alphaTest={0.4} opacity={1} scale={22}> */}
                {/* <RandomizedLight amount={4.9} radius={4} ambient={0.0} intensity={1} position={[-15, 5, -15]} bias={0.001} />                 */}                
              {/* </AccumulativeShadows> */}
              {/* <AccumulativeShadows temporal frames={100} color="black" colorBlend={2} toneMapped={true} alphaTest={0.6} opacity={2} scale={12}>
          <RandomizedLight amount={8} radius={4} ambient={0.5} intensity={1} position={[-15, 5, -10]} bias={0.001} />
        </AccumulativeShadows> */}
              

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
              </group> */}
              {/* <group name="real_horse_reins01">
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

              </group>                             */}
            </group>                  
          </group>                  
        </group>
        {/* <SoftShadows {...config} /> */}
        </group>        
      );
  };

  function ChangeMaterial(textureIndex)
  {
    var copyMat = copyMaterials.map;
    var wrap = copyMat.wrap == undefined ? null : copyMat.wrap;  
    var wrapS = copyMat.wrapS;  
    var wrapT = copyMat.wrapT;  
    var flipY = copyMat.flipY;  
    var encoding = copyMat.encoding;
    var userData = copyMat.userData;       

    copyMaterials.map = textures;
    copyMaterials.map.wrap = wrap;
    copyMaterials.map.wrapS = wrapS;
    copyMaterials.map.wrapT = wrapT;
    copyMaterials.map.flipY = flipY;
    copyMaterials.map.encoding = encoding;
    copyMaterials.map.userData = userData;

    copyMaterials.map.envMapIntensity = 1.5;
    copyMaterials.map.metalness = 0.5;
    copyMaterials.map.roughness = 0.5;
    copyMaterials.map.clearcoat = 0.5;
  }

  function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    const group = useRef()
    // useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
    return (
      <>
        {/* Ceiling */}
        <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
        {/* <group rotation={[0, 0.5, 0]}>
          <group ref={group}>
            {positions.map((x, i) => (
              <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
            ))}
          </group>
        </group> */}
        {/* Sides */}
        <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
        <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
        <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        {/* Accent (red) */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
        </Float>
        {/* Background */}
        {/* <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide}>
            <Color color="#444" alpha={1} mode="normal" />
            <Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
          </LayerMaterial>
        </mesh> */}
      </>
    )
  }

export default FbxRender;
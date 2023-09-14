import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, SoftShadows  } from '@react-three/drei';
import { MeshBasicMaterial, SphereGeometry, Vector3, Mesh } from 'three';


export function ShadowTest () {
    const [shadowDirection, setShadowDirection] = useState(new Vector3(-1, 0, 0));
    return (
    <Canvas shadows>
      {/* <pointLight position={[10, 10, 10]} /> */}

    <Environment
            receiveShadow
            preset='city'
            // background={true}
            ground={true}
            groundColor={0xFFFFFF}
    />

{/* <mesh>
        <sphereGeometry />
        <meshStandardMaterial color="hotpink" />
        </mesh> */}
        

        <ContactShadows
            //shadowDirection={shadowDirection.clone().lerp(new Vector3(-1, 1, 0), 0.5)}
            shadowDirection = {[0,1,0]}
            >
        <mesh>
            <sphereGeometry />
            <meshStandardMaterial color="hotpink" />
        </mesh>
        </ContactShadows>      



        <mesh castShadow>
            <sphereGeometry castShadow/>
            <meshStandardMaterial color="hotpink" />

            <SoftShadows            
            // shadowDirection = {[0,1,0]}
            >
                <directionalLight castShadow></directionalLight>

            </SoftShadows>                  
        </mesh>

        <OrbitControls/>
    </Canvas>
    )
}

function ShadowTest2() {
    const [shadowDirection, setShadowDirection] = useState(new Vector3(0, 1, 0));
    const ref = useRef()
  return (
    <div>
      <h1>React Three Fiber ContactShadows Example</h1>
      <div style={{ width: 400, height: 400 }}>        
      </div>
      <input
        type="range"
        min="-1"
        max="1"
        value={shadowDirection.x}
        onChange={(event) => setShadowDirection(new Vector3(event.target.value, shadowDirection.y, shadowDirection.z))}
      />

        <Canvas id="canvas" width="400" height="400" >
        {/* <Environment
            preset='city'
            background={true}
            // ground={true}
            // groundColor={0xFFFFFF}
        /> */}
        <ContactShadows
            shadowDirection={shadowDirection.clone().lerp(new Vector3(-1, 1, 0), 0.5)}
            >
            {/* <Mesh
            geometry={new SphereGeometry(10, 10, 10)}
            material={new MeshBasicMaterial({
                color: 0xff0000,
            })}
            /> */}

            <mesh position={[0,0,0]} ref={ref}>
                <boxBufferGeometry args={[10, 10, 10]} attach="geometry" />
                <meshPhongMaterial color={'red'} attach="material" />
            </mesh>            
        </ContactShadows>
        <OrbitControls/>
        <directionalLight color="#ffffff" intensity={1} position={[-1, 2, 4]} />
      </Canvas>
    </div>
  );
}

export default ShadowTest;
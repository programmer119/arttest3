// if can't use drei or fiber then use blow component 

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function CustomOrbit()
{ 
  const camera = useThree(state=>state.camera);
  const renderer = useThree(state=>state.renderer);
  const conThree = useThree();
  const orbitCon = new OrbitControls(camera, conThree.gl.domElement);
}
"use client";

import { Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Model = () => {
  // location of the 3D model
  const gltf = useLoader(GLTFLoader, "/earth/scene.gltf");
  return (
    <group>
      <primitive object={gltf.scene} scale={5} />
    </group>
  );
};

export default function Model_page() {
  return (
    <div className="earth">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 3, 5], fov: 70 }}>
          <ambientLight intensity={2} />
          <spotLight intensity={5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Suspense fallback={null}>
            <Model />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls autoRotate />
        </Canvas>
      </div>
  )
}

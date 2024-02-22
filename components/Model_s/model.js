"use client";
import { Canvas, useLoader } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { PerspectiveCamera, PresentationControls, ContactShadows, Html } from '@react-three/drei';
import { useRef, useState } from "react";
import { useFrame, useThree  } from "@react-three/fiber";
import SlowmotionText from "./Text_slowmotion";

const Model = () => {
  const { size } = useThree();
  const { width } = size;
  const modelRef = useRef();

  useFrame(({ camera }) => {
    // Adjust rotation speed as needed
    if(camera.position.z > 10)
    {
      modelRef.current.rotation.y += 0.0078;
      modelRef.current.rotation.x += 0.0001;
    }
    else{
      modelRef.current.rotation.y += 0.002;
    }
     // Adjust zoom speed as needed
    if(camera.position.z > 70)
    {
      camera.position.z -= 0.54
    }
    if(camera.position.z > 22 && camera.position.z < 70)
    {
      camera.position.z -= 0.61
    }
    if (camera.position.z > 6 && camera.position.z < 22) { 
      camera.position.z -= 0.29; // Adjust the zoom-in speed
    }
    if (camera.position.z > 4.5 && camera.position.z < 6) {
      camera.position.z -= 0.15; // Adjust the zoom-in speed, no need to change any x,y,z in 1920 to 1750 width screens
    }
    if (camera.position.z > 4.5 && camera.position.z < 4.7) { //for between 1750 to 920 width screens
      if (window.innerWidth >= 920 && window.innerWidth <= 1750) {
        camera.position.x = 1.5;
        camera.position.y = 0;
        camera.position.z = 2;
      }
    }
    if (camera.position.z > 4.5 && camera.position.z < 4.7) { //for less than 920 width screens
      if (window.innerWidth < 920) {
        camera.position.x = 0;
        camera.position.y = 1;
        camera.position.z = 0;
      }
    }
  });


  const gltf = useLoader(GLTFLoader, '/earth/scene.gltf');

  return (
    <mesh ref={modelRef}>
      <primitive object={gltf.scene} scale={5} />
    </mesh>
  );
};

const Text_for_model = () => {
  const [showHtml, setShowHtml] = useState(false);
  const textLine1 = "Discover, Analyze, Act:";
  const textLine2 = "Your Gateway to Data Driven Decisions";
  const textLine3 = "Decisions";

  useFrame(({ camera }) => {
    if (camera.position.z <= 4.5) {
      setShowHtml(true);
    } else {
      setShowHtml(false);
    }
  });
  const { size } = useThree();
  const { width } = size;

  return (
    <group>
      {showHtml && (
        <Html style={{ position: 'relative', padding: '1rem' }}>
          <div id="text-container" className="justify-center text-[#e9cdcd] top-0 h-0 drop-shadow-md [text-shadow:_0_0px_0_rgb(100_76_112_/_20%)]">
            <h1 className="text-6xl pb-12 font-semibold">
              <SlowmotionText text={textLine1} delay={120}/>
            </h1>
            <h2 className="text-5xl font-semibold">
              <SlowmotionText text={textLine2} delay={textLine1.length * 120 + 120} />
            </h2>
          </div>
        </Html>
      )}
    </group>
  );
};

export default function Model_page() {

  return (
    <div className="earth">
        <Canvas shadows dpr={[0.1, 1]} camera={{ position: [0, 0, 0], fov: 70 }}>
          <Text_for_model/>
          <PerspectiveCamera makeDefault fov={68} position={[1, -1, 72]} focusDistance={[1, 0]} near={0.1}  far={1000}/>
          <ambientLight color="#dbc7a9" intensity={0.5} />
            <PresentationControls
                    global={false}
                    config={{ mass: 10, tension: 5 }}
                    snap={{ mass: 10, tension: 50 }}
                    >
                    <Model/>
            </PresentationControls>
            <Environment preset="sunset" />
            <ContactShadows position={[0, -1.4, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
        </Canvas>
    </div>
  )
}

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaPaperPlane, FaGithub, FaLinkedin } from "react-icons/fa";
import * as THREE from 'three';

function Stars(props: any) {
const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 3;

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function CosmicFooter() {
  return (
    <section className="relative w-full h-[60vh] bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
          <Sparkles
            count={100}
            scale={2}
            size={2}
            speed={0.4}
            opacity={0.5}
            color="#4ade80"
          />
          <Float speed={2} rotationIntensity={2} floatIntensity={2}></Float>
        </Canvas>
      </div>

      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            هل نبدأ الرحلة القادمة؟
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
            لقد رأيت كيف بنينا الماضي، دعنا الآن نبني المستقبل معاً.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-3 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                تواصل معي{" "}
                <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="flex gap-4 mt-4 md:mt-0">
              <SocialIcon icon={<FaGithub />} href="#" />
              <SocialIcon icon={<FaLinkedin />} href="#" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-950 to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 backdrop-blur-sm"
    >
      {icon}
    </a>
  );
}

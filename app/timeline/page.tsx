/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useEffect, useState, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, ScrollControls, useScroll, Text } from "@react-three/drei";
import * as THREE from "three";
import { createClient } from "../lib/supabase";
import { Project } from "../types/project";

function TimelineItem({ index, project }: { index: number; project: Project }) {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);

  const year = useMemo(() => {
    return project.created_at
      ? new Date(project.created_at).getFullYear()
      : "N/A";
  }, [project.created_at]);

  const projectName = project.title_en || project.title_ar || "Untitled";
  const projectImage = project.image_url || "";

  useFrame(() => {
    if (!group.current) return;

    const gap = 4;
    const offset = index * gap;
    const scrollOffset = scroll.offset * (scroll.pages * gap - gap);

    group.current.position.z = -offset + scrollOffset;

    const z = group.current.position.z;
    group.current.visible = z < 4 && z > -15;
  });

  return (
    <group ref={group} position={[0, 0, -index * 4]}>
      <Text
        position={[-1.6, 0.5, 0]}
        fontSize={0.4}
        color="#3b82f6"
        anchorX="right"
      >
        {year}
      </Text>

      <Text
        position={[-1.5, 0, 0]}
        fontSize={0.25}
        color="white"
        anchorX="right"
        maxWidth={2.5}
        textAlign="right"
      >
        {projectName}
      </Text>

      {projectImage ? (
        <Image
          url={projectImage}
          scale={[3, 1.8]}
          position={[1.5, 0, 0]}
          transparent
          opacity={0.9}
          radius={0.1}
        />
      ) : (
        <mesh position={[1.5, 0, 0]}>
          <planeGeometry args={[3, 1.8]} />
          <meshBasicMaterial color="#1f2937" wireframe />
        </mesh>
      )}
    </group>
  );
}

function Experience({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.map((project, i) => (
        <TimelineItem key={project.id} index={i} project={project} />
      ))}
    </>
  );
}

export default function TimelinePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      console.log("بدء جلب البيانات للتايم لاين...");

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ خطأ Supabase:", error.message);
      } else {
        console.log("✅ البيانات المستلمة:", data);
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          console.warn("⚠️ الجدول فارغ أو لا توجد صلاحيات (RLS)");
        }
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="h-[50vh] w-full bg-zinc-950 relative border-b border-zinc-800/50 overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-blue-500 z-10">
          <span className="animate-pulse">Loading Timeline...</span>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 z-10 gap-2">
          <p>No Projects Found</p>
          <p className="text-xs text-zinc-700">Check Console for errors</p>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ScrollControls
              pages={Math.max(2, projects.length * 0.8)}
              damping={0.3}
            >
              <Experience projects={projects} />
            </ScrollControls>
          </Suspense>
        </Canvas>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-500 text-xs pointer-events-none opacity-50">
        Scroll to explore / اسحب للاستكشاف
      </div>
    </div>
  );
}

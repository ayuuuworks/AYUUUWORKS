import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAWE } from '../awe/context';
import { BusinessSystem } from '../awe/types';
import { Eye, Shield, Target, Zap, ArrowDown, ArrowRight } from 'lucide-react';

interface StageData {
  id: BusinessSystem;
  name: string;
  question: string;
  tagline: string;
  description: string;
  failurePoint: string;
  ayuuIntervention: string;
}

const STAGES: StageData[] = [
  {
    id: 'attention',
    name: 'ATTENTION',
    question: 'Can people notice you?',
    tagline: 'Earning notice without resorting to cheap gimmicks.',
    description: 'Attention is not screaming louder with discount banners. It is an unmistakable, disciplined editorial voice that stops the scroll.',
    failurePoint: 'Customers scroll past your digital touchpoints because your communication blends into category wallpaper.',
    ayuuIntervention: 'Category-defining visual positioning, bold typography, and cinematic motion that commands pause.',
  },
  {
    id: 'perception',
    name: 'PERCEPTION',
    question: 'What do they think when they encounter you?',
    tagline: 'How valuable you feel in the first 5 seconds.',
    description: 'Clients decide what your business is worth before they ever ask for a price. If your digital presence looks commoditized, they instinctively negotiate.',
    failurePoint: 'The physical craftsmanship or service standard is a 10/10, but the digital storefront looks ordinary and cheap.',
    ayuuIntervention: 'Editorial design systems, bespoke digital flagships, and luxury restraint that project quiet authority.',
  },
  {
    id: 'trust',
    name: 'TRUST',
    question: 'Why should they believe you?',
    tagline: 'Eliminating the hesitation that delays high-ticket decisions.',
    description: 'Before asking for price or timeline, premium clients ask: "Are they safe? Will they deliver? Do they understand my standard?"',
    failurePoint: 'Incomplete proof, hidden credentials, or generic claims like "we are the best" that generate subconscious doubt.',
    ayuuIntervention: 'Transparent craft provenance, founder manifesto, verified certifications, and institutional prestige.',
  },
  {
    id: 'action',
    name: 'ACTION',
    question: 'What makes them take the next step?',
    tagline: 'Frictionless transition from curiosity to qualified conversation.',
    description: 'Conversion is the natural result of curiosity, perception and trust. High-ticket buyers seek discretion and effortless concierge contact.',
    failurePoint: 'Impersonal 8-field contact forms, slow response times, or buried call-to-actions that cause immediate bounce.',
    ayuuIntervention: 'Bespoke 2-step VIP concierge pathways, occasion-based inquiry funnels, and zero-friction communication.',
  },
];

export const BusinessEngineScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { session, trackEvent, isReducedMotion } = useAWE();
  const [activeStageId, setActiveStageId] = useState<BusinessSystem>(session.activeSystem || session.problemCategory || 'perception');

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[1];

  // Restrained 3D Architectural Visualization
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let renderer: THREE.WebGLRenderer;
    let frameId: number;

    try {
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 400;

      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0, 8.5);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // 4 connected architectural node plates arranged vertically
      const nodes: THREE.Mesh[] = [];
      const nodeGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);

      const stageColors = {
        attention: 0xB65B3C,
        perception: 0xB65B3C,
        trust: 0xD7D0C5,
        action: 0xF2EFE8,
      };

      const yPositions = [1.8, 0.6, -0.6, -1.8];

      yPositions.forEach((y, i) => {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x1f1f1f,
          wireframe: false,
        });
        const mesh = new THREE.Mesh(nodeGeo, mat);
        mesh.position.set(0, y, 0);
        mesh.rotation.x = 0.35;

        // Thin accent border ring
        const ringGeo = new THREE.RingGeometry(1.2, 1.24, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: i === 1 ? 0xB65B3C : 0x333333,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);

        mainGroup.add(mesh);
        nodes.push(mesh);
      });

      // Connecting vertical architectural conduit line
      const linePoints = [
        new THREE.Vector3(0, 2.2, 0),
        new THREE.Vector3(0, -2.2, 0),
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x333333 });
      const line = new THREE.Line(lineGeo, lineMat);
      mainGroup.add(line);

      let clock = new THREE.Clock();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        if (!isReducedMotion) {
          mainGroup.rotation.y = Math.sin(time * 0.3) * 0.25;
        }

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch {
      // Graceful fallback
    }
  }, [isReducedMotion, activeStageId]);

  const selectStage = (sys: BusinessSystem) => {
    setActiveStageId(sys);
    trackEvent('service_explored', { system: sys });
  };

  const getIcon = (sys: BusinessSystem) => {
    switch (sys) {
      case 'attention': return Eye;
      case 'perception': return Target;
      case 'trust': return Shield;
      case 'action': return Zap;
      default: return Target;
    }
  };

  return (
    <section id="business-engine" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-[#242424] bg-[#111111]">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <span>MODEL · 04</span>
          <span>·</span>
          <span>THE BUSINESS ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          FOUR INTERCONNECTED SYSTEMS.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          A business is not a collection of disjointed tactics. It is an engine that moves from initial notice to committed action.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 4 Stages Selector */}
        <div className="lg:col-span-5 space-y-3">
          {STAGES.map((stage, idx) => {
            const Icon = getIcon(stage.id);
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => selectStage(stage.id)}
                className={`w-full text-left p-5 rounded border transition-all cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8]'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded border ${isActive ? 'border-[#B65B3C] text-[#B65B3C]' : 'border-[#242424] text-[#9B978F]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#9B978F]">0{idx + 1}</span>
                      <h3 className="text-base font-bold font-display tracking-tight">
                        {stage.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#9B978F] mt-0.5">
                      {stage.question}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#B65B3C]">
                  {isActive ? '● ACTIVE' : '○'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Center: Restrained 3D / Diagram Visualization */}
        <div className="lg:col-span-3 h-64 md:h-80 relative flex items-center justify-center">
          <div ref={containerRef} className="w-full h-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none p-4 text-[10px] font-mono text-[#9B978F]">
            <span>ATTENTION</span>
            <ArrowDown className="w-3 h-3 text-[#B65B3C]" />
            <span>PERCEPTION</span>
            <ArrowDown className="w-3 h-3 text-[#B65B3C]" />
            <span>TRUST</span>
            <ArrowDown className="w-3 h-3 text-[#B65B3C]" />
            <span>ACTION</span>
          </div>
        </div>

        {/* Right Column: Stage Diagnostic Detail */}
        <div className="lg:col-span-4">
          <div className="p-6 md:p-8 rounded border border-[#242424] bg-[#161616] space-y-6">
            <div className="flex items-center justify-between border-b border-[#242424] pb-4">
              <span className="text-xs font-mono uppercase text-[#B65B3C] tracking-widest font-bold">
                SYSTEM DEEP DIVE
              </span>
              <span className="text-xs font-mono text-[#9B978F]">
                STAGE: {activeStage.name}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold font-display text-[#F2EFE8]">
                {activeStage.question}
              </h4>
              <p className="text-xs font-mono text-[#B65B3C] mt-1">
                "{activeStage.tagline}"
              </p>
              <p className="text-xs text-[#D7D0C5] mt-3 leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#242424]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9B978F] block">
                  COMMON BOTTLENECK
                </span>
                <p className="text-xs text-[#D7D0C5] mt-1 leading-snug">
                  {activeStage.failurePoint}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#B65B3C] block font-bold">
                  AYUUWORKS INTERVENTION
                </span>
                <p className="text-xs text-[#F2EFE8] mt-1 leading-snug">
                  {activeStage.ayuuIntervention}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

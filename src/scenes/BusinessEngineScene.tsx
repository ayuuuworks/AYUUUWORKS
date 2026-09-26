import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAWE } from '../awe/context';
import { BusinessSystem } from '../awe/types';
import { Eye, Shield, Target, Zap, ArrowDown, Crosshair, Terminal } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface StageData {
  id: BusinessSystem;
  name: string;
  hinglishName: string;
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
    hinglishName: 'DHYAN KHENCHO',
    question: 'Kya log aapko notice kar rahe hain?',
    tagline: 'Saste gimmicks ke bina scroll rokne wala magnetic pull.',
    description: 'Attention ka matlab discount banners daal ke cheekhna nahi hai. Ek unmistakable, disciplined editorial presence banana hai jo instant pause command kare.',
    failurePoint: 'Customers aapke digital touchpoints ko ignore karke scroll kar jaate hain kyunki aap category ke aam wallpaper mein blend ho rahe ho.',
    ayuuIntervention: 'Category-defining visual positioning, bold bespoke typography aur cinematic motion jo screen par command le.',
  },
  {
    id: 'perception',
    name: 'PERCEPTION',
    hinglishName: 'CLASS DIKHAO',
    question: 'Pehle 5 seconds mein customer kya sochta hai?',
    tagline: 'Pehle glance mein aapki value kitni mehsoos hoti hai.',
    description: 'Clients rate poochne se pehle hi aapke brand ki aukaat judge kar lete hain. Agar digital storefront commoditized ya aam laga, toh woh naturally bargain karenge.',
    failurePoint: 'Aapki real offline craftsmanship ya service 10/10 hai, par website aur social touchpoints 3/10 template lagte hain.',
    ayuuIntervention: 'Editorial design systems, bespoke digital flagships aur luxury restraint jo bina boley silent authority establish kare.',
  },
  {
    id: 'trust',
    name: 'TRUST',
    hinglishName: 'CONVICTION JEETNA',
    question: 'Client aapse transaction kyun karega?',
    tagline: 'High-ticket decisions mein aane wale hesitation ko destroy karna.',
    description: 'Badi deals close karne se pehle premium buyers sochte hain: "Kya yeh log authentic hain? Delivery reliable hogi? Kya inka standard mere jaisa hai?"',
    failurePoint: 'Adhura proof, generic claims jaise "we are best", aur lack of credible craft showcase jo dimaag mein doubt create kare.',
    ayuuIntervention: 'Transparent craft provenance, founder manifesto, verified case results aur institutional prestige architecture.',
  },
  {
    id: 'action',
    name: 'ACTION',
    hinglishName: 'CONVERT KARNA',
    question: 'Unhe final step lene par kya majboor karta hai?',
    tagline: 'Curiosity se qualified high-value booking tak frictionless flow.',
    description: 'Conversion Attention, Perception aur Trust ka natural outcome hai. Luxury buyers private discretion aur effortless concierge communication chahte hain.',
    failurePoint: '8-field lamba boring lead form, slow response time, ya confusing CTA jo high-intent user ko turant bounce kar de.',
    ayuuIntervention: 'Bespoke 2-step VIP concierge pathways, occasion-based private booking funnels aur zero-friction communication.',
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
      const lineMat = new THREE.LineBasicMaterial({ color: 0xB65B3C });
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
    soundEngine.playTargetLock();
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
      {/* Header in Hinglish with AAA Game HUD label */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B65B3C] uppercase mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#B65B3C]" />
          <span>MODEL · 04 // THE CONVERSION ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#F2EFE8] tracking-tight leading-tight">
          CHAR CRITICAL SYSTEMS JO CONVERSION CONTROL KARTE HAIN.
        </h2>
        <p className="text-base text-[#9B978F] mt-3 leading-relaxed">
          Business tukdon-tukdon mein nahi chalta. Yeh ek continuous engine hai jo pehle impression se final transaction tak har point par perform karta hai.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 4 Stages Selector (AAA Game HUD cards) */}
        <div className="lg:col-span-5 space-y-3">
          {STAGES.map((stage, idx) => {
            const Icon = getIcon(stage.id);
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => selectStage(stage.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`hud-bracket w-full text-left p-5 rounded-sm border transition-[border-color,background-color] duration-200 cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'border-[#B65B3C] bg-[#1a1816] text-[#F2EFE8] shadow-md shadow-[#B65B3C]/10'
                    : 'border-[#242424] bg-[#141414] text-[#D7D0C5] hover:border-[#383838] hover:bg-[#181818]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-sm border ${isActive ? 'border-[#B65B3C] text-[#B65B3C] bg-[#B65B3C]/10' : 'border-[#242424] text-[#9B978F]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#9B978F]">0{idx + 1} // STAGE</span>
                      <h3 className="text-base font-bold font-display tracking-tight text-[#F2EFE8]">
                        {stage.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#B65B3C]">[{stage.hinglishName}]</span>
                    </div>
                    <p className="text-xs text-[#9B978F] mt-0.5">
                      {stage.question}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#B65B3C] font-bold">
                  {isActive ? '● ENGAGED' : '○'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Center: 3D / Diagram Visualization with Laser Conduit */}
        <div className="lg:col-span-3 h-64 md:h-80 relative flex items-center justify-center">
          <div ref={containerRef} className="w-full h-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none p-4 text-[10px] font-mono text-[#9B978F]">
            <span className="bg-[#111111]/80 px-2 py-0.5 border border-[#242424] rounded-sm">01 ATTENTION</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B65B3C] animate-bounce" />
            <span className="bg-[#111111]/80 px-2 py-0.5 border border-[#242424] rounded-sm">02 PERCEPTION</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B65B3C] animate-bounce" />
            <span className="bg-[#111111]/80 px-2 py-0.5 border border-[#242424] rounded-sm">03 TRUST</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B65B3C] animate-bounce" />
            <span className="bg-[#111111]/80 px-2 py-0.5 border border-[#242424] rounded-sm">04 ACTION</span>
          </div>
        </div>

        {/* Right Column: Stage Diagnostic Detail in Hinglish */}
        <div className="lg:col-span-4">
          <div className="hud-bracket p-6 md:p-8 rounded-sm border border-[#2e2a24] bg-[#161616] space-y-6 shadow-2xl shadow-black/80">
            <div className="flex items-center justify-between border-b border-[#242424] pb-4">
              <span className="text-xs font-mono uppercase text-[#B65B3C] tracking-widest font-bold flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5" />
                <span>SYSTEM INTEL DEEP DIVE</span>
              </span>
              <span className="text-xs font-mono text-[#9B978F]">
                SYS: {activeStage.name}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold font-display text-[#F2EFE8]">
                {activeStage.question}
              </h4>
              <p className="text-xs font-mono text-[#B65B3C] mt-1 font-semibold">
                "{activeStage.tagline}"
              </p>
              <p className="text-xs text-[#D7D0C5] mt-3 leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#242424]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9B978F] block font-bold">
                  KAHAN ATKATA HAI // COMMON BOTTLENECK
                </span>
                <p className="text-xs text-[#D7D0C5] mt-1 leading-snug">
                  {activeStage.failurePoint}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#B65B3C] block font-bold">
                  AYUUWORKS INTERVENTION // SOLUTION
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


import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAWE } from '../awe/context';
import { ArrowDown, ArrowUpRight, Compass } from 'lucide-react';

type Door = 'business' | 'work' | 'explore';

export const OpeningScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion, trackEvent } = useAWE();
  const [webglSupported, setWebglSupported] = useState(true);
  const [door, setDoor] = useState<Door | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let renderer: THREE.WebGLRenderer;
    let frameId: number;

    try {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111111);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 1.2, 9);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      const geom = new THREE.BoxGeometry(1.6, 3.2, 0.2);
      const edgeGeom = new THREE.EdgesGeometry(geom);
      const panelMat = new THREE.MeshBasicMaterial({ color: 0x181818 });
      const lineMat = new THREE.LineBasicMaterial({ color: 0x333333 });
      const accentLineMat = new THREE.LineBasicMaterial({ color: 0xB65B3C });

      [
        { x: -3.8, y: 0.2, z: -2.5, rotY: 0.35 },
        { x: -1.6, y: -0.2, z: -4.5, rotY: -0.2 },
        { x: 2.2, y: 0.4, z: -3.2, rotY: -0.4 },
        { x: 4.4, y: -0.4, z: -2.0, rotY: 0.25 },
      ].forEach((pos, index) => {
        const mesh = new THREE.Mesh(geom, panelMat);
        mesh.position.set(pos.x, pos.y, pos.z);
        mesh.rotation.y = pos.rotY;
        mesh.add(new THREE.LineSegments(edgeGeom, index === 2 ? accentLineMat : lineMat));
        group.add(mesh);
      });
      scene.add(group);

      const particleCount = 36;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        pPos[i] = (Math.random() - 0.5) * 16;
        pPos[i + 1] = Math.random() * 6 - 2;
        pPos[i + 2] = (Math.random() - 0.5) * 12;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xD7D0C5, size: 0.04, transparent: true, opacity: 0.2 })));

      const clock = new THREE.Clock();
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        if (!isReducedMotion) {
          group.rotation.y = Math.sin(elapsed * 0.15) * 0.05;
          camera.position.x = Math.sin(elapsed * 0.1) * 0.15;
          camera.position.y = 1.2 + Math.cos(elapsed * 0.12) * 0.05;
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
        if (renderer.domElement && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        renderer.dispose();
        geom.dispose();
        edgeGeom.dispose();
      };
    } catch {
      setWebglSupported(false);
    }
  }, [isReducedMotion]);

  const choose = (next: Door) => {
    setDoor(next);
    trackEvent('cta_clicked', { target: \`hero_\${next}\` });
  };

  const continueTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="opening-scene" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-20 pb-10 bg-[#111111]">
      <div ref={containerRef} className={\`absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 \${webglSupported ? 'opacity-70' : 'opacity-0'}\`} />
      <div className="absolute inset-0 bg-editorial-grid pointer-events-none z-10 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_45%,rgba(182,91,60,0.08),transparent_32%),linear-gradient(to_bottom,rgba(17,17,17,0.72),transparent_42%,#111111)] pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-6">
        <div className="flex items-center justify-between border-b border-[#242424] pb-4">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#B65B3C] uppercase">AYUUWORKS</span>
          <span className="hidden sm:block text-[10px] text-[#9B978F] font-mono tracking-[0.18em]">DIGITAL EXPERIENCE STUDIO / INDIA</span>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 py-12 my-auto">
        <div className="max-w-6xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B65B3C] mb-6">LOOK CLOSER.</p>
          <h1 className="max-w-6xl text-[clamp(3.5rem,9.5vw,10rem)] font-black font-display tracking-[-0.07em] text-[#F2EFE8] leading-[0.82]">
            SEE YOUR<br /><span className="text-[#D7D0C5]">BUSINESS</span><br />DIFFERENTLY.
          </h1>
          <div className="mt-8 max-w-xl">
            <p className="text-base sm:text-lg text-[#9B978F] leading-relaxed">
              Good business deserves to be noticed. We build the identity, digital presence and experiences people remember.
            </p>
          </div>

          {!door ? (
            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#D7D0C5]/55 mb-4">WHERE DO YOU WANT TO LOOK?</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl">
                <button onClick={() => choose('business')} className="group min-h-32 text-left border border-[#242424] bg-[#141414]/85 p-5 hover:border-[#B65B3C] transition-all">
                  <div className="flex justify-between text-[#B65B3C]"><span className="font-mono text-[9px] tracking-[0.18em]">01</span><ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></div>
                  <h2 className="mt-8 text-base font-bold font-display text-[#F2EFE8]">MY BUSINESS</h2>
                  <p className="mt-1 text-xs text-[#9B978F]">I want to see what might be missing.</p>
                </button>
                <button onClick={() => choose('work')} className="group min-h-32 text-left border border-[#242424] bg-[#141414]/85 p-5 hover:border-[#D7D0C5] transition-all">
                  <div className="flex justify-between text-[#D7D0C5]"><span className="font-mono text-[9px] tracking-[0.18em]">02</span><ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /></div>
                  <h2 className="mt-8 text-base font-bold font-display text-[#F2EFE8]">YOUR WORK</h2>
                  <p className="mt-1 text-xs text-[#9B978F]">Show me what you've built.</p>
                </button>
                <button onClick={() => choose('explore')} className="group min-h-32 text-left border border-[#242424] bg-[#141414]/85 p-5 hover:border-[#B65B3C] transition-all">
                  <div className="flex justify-between text-[#9B978F]"><span className="font-mono text-[9px] tracking-[0.18em]">03</span><Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" /></div>
                  <h2 className="mt-8 text-base font-bold font-display text-[#F2EFE8]">JUST LOOK AROUND</h2>
                  <p className="mt-1 text-xs text-[#9B978F]">No plan. I'm curious.</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-10 max-w-4xl border border-[#B65B3C]/50 bg-[#151311]/95 p-6 md:p-8 animate-[fadeIn_.5s_ease-out]">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#B65B3C]">ONE MORE THING.</p>
              <h2 className="mt-4 text-2xl md:text-4xl font-display font-semibold text-[#F2EFE8] tracking-[-0.04em]">
                {door === 'business' && 'Maybe the interesting part is not our work. Maybe it is yours.'}
                {door === 'work' && 'Good. We have a few things worth showing you.'}
                {door === 'explore' && 'Good. Nothing to prove. Take a look around.'}
              </h2>
              <p className="mt-4 text-sm md:text-base text-[#9B978F] max-w-2xl leading-7">
                {door === 'business' && 'Start with one small question. We will keep the rest open.'}
                {door === 'work' && 'See the projects, then follow whatever catches your eye.'}
                {door === 'explore' && 'There are cases, ideas and a few rabbit holes further down.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {door === 'business' && <button onClick={() => continueTo('business-explorer')} className="px-5 py-3 bg-[#F2EFE8] text-[#111111] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-colors">LET'S LOOK CLOSER →</button>}
                {door === 'work' && <button onClick={() => continueTo('projects-section')} className="px-5 py-3 bg-[#F2EFE8] text-[#111111] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-colors">SHOW ME →</button>}
                {door === 'explore' && <button onClick={() => continueTo('curiosity-section')} className="px-5 py-3 bg-[#F2EFE8] text-[#111111] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#B65B3C] hover:text-[#F2EFE8] transition-colors">KEEP LOOKING →</button>}
                <button onClick={() => setDoor(null)} className="px-5 py-3 border border-[#242424] text-[#9B978F] text-xs uppercase tracking-[0.16em] hover:text-[#F2EFE8]">START AGAIN</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full px-6">
        <div className="border-t border-[#242424] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] text-[#9B978F] font-mono tracking-[0.12em]">
          <span>GOOD BUSINESS DESERVES TO BE SEEN.</span>
          <span>FOUNDED BY AYUSH MISHRA · INDEPENDENT STUDIO</span>
        </div>
      </div>
    </section>
  );
};

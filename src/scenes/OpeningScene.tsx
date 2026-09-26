import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAWE } from '../awe/context';
import { ArrowDown, ArrowUpRight, Compass, Crosshair, ShieldCheck, Zap } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';
import { getTranslations } from '../data/translations';

export const OpeningScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion, trackEvent, language } = useAWE();
  const [webglSupported, setWebglSupported] = useState(true);
  const t = getTranslations(language);

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
      camera.position.set(0, 1.2, 9.5);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      // AAA Game Tactical Ground Grid (Cybernetic Floor Matrix)
      const gridHelper = new THREE.GridHelper(30, 30, 0xB65B3C, 0x242424);
      gridHelper.position.y = -2.2;
      scene.add(gridHelper);

      // AAA Holographic Core: Gyroscope & Cyber Radar Rings
      const holoGroup = new THREE.Group();

      // Outer Radar Ring
      const outerRingGeo = new THREE.RingGeometry(2.4, 2.45, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xB65B3C,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
      outerRing.rotation.x = Math.PI / 2.5;
      holoGroup.add(outerRing);

      // Mid Orbital Ring
      const midRingGeo = new THREE.RingGeometry(1.8, 1.84, 48);
      const midRingMat = new THREE.MeshBasicMaterial({
        color: 0xD7D0C5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const midRing = new THREE.Mesh(midRingGeo, midRingMat);
      midRing.rotation.y = Math.PI / 3;
      holoGroup.add(midRing);

      // Core Icosahedron Wireframe (Tactical Data Core)
      const icoGeo = new THREE.IcosahedronGeometry(1.1, 1);
      const icoWireGeo = new THREE.WireframeGeometry(icoGeo);
      const icoWireMat = new THREE.LineBasicMaterial({
        color: 0xF2EFE8,
        transparent: true,
        opacity: 0.8,
      });
      const coreMesh = new THREE.LineSegments(icoWireGeo, icoWireMat);
      holoGroup.add(coreMesh);

      // Glowing Ember Particles
      const innerCoreGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const innerCoreMat = new THREE.MeshBasicMaterial({
        color: 0xB65B3C,
        wireframe: true,
      });
      const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      holoGroup.add(innerCore);

      // Floating Tactical Monolith Cards in 3D Space
      const cardGeom = new THREE.BoxGeometry(1.4, 2.6, 0.08);
      const cardWireGeom = new THREE.EdgesGeometry(cardGeom);

      const panelMat = new THREE.MeshBasicMaterial({
        color: 0x161616,
        transparent: true,
        opacity: 0.85,
      });
      const panelWireMat = new THREE.LineBasicMaterial({
        color: 0x333333,
      });
      const accentWireMat = new THREE.LineBasicMaterial({
        color: 0xB65B3C,
      });

      const monolithPositions = [
        { x: -3.8, y: 0.3, z: -2.0, rotY: 0.4, accent: false },
        { x: -1.8, y: -0.2, z: -4.0, rotY: -0.25, accent: false },
        { x: 2.2, y: 0.5, z: -3.0, rotY: -0.35, accent: true },
        { x: 4.2, y: -0.3, z: -1.8, rotY: 0.3, accent: false },
      ];

      monolithPositions.forEach((pos) => {
        const mesh = new THREE.Mesh(cardGeom, panelMat);
        mesh.position.set(pos.x, pos.y, pos.z);
        mesh.rotation.y = pos.rotY;

        const wire = new THREE.LineSegments(cardWireGeom, pos.accent ? accentWireMat : panelWireMat);
        mesh.add(wire);
        holoGroup.add(mesh);
      });

      scene.add(holoGroup);

      // Floating Cyber Dust Particle Cloud
      const particleCount = 75;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        pPos[i] = (Math.random() - 0.5) * 18;
        pPos[i + 1] = Math.random() * 8 - 3;
        pPos[i + 2] = (Math.random() - 0.5) * 14;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xB65B3C,
        size: 0.05,
        transparent: true,
        opacity: 0.4,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      window.addEventListener('mousemove', onMouseMove);

      let clock = new THREE.Clock();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        if (!isReducedMotion) {
          // Smooth Lerp Camera tracking for AAA Game Feel
          targetX += (mouseX * 0.4 - targetX) * 0.05;
          targetY += (-mouseY * 0.25 - targetY) * 0.05;

          camera.position.x = targetX;
          camera.position.y = 1.2 + targetY;
          camera.lookAt(0, 0, 0);

          // Gyroscope rotation
          outerRing.rotation.z = elapsed * 0.25;
          midRing.rotation.x = elapsed * -0.3;
          coreMesh.rotation.y = elapsed * 0.4;
          coreMesh.rotation.x = elapsed * 0.2;
          innerCore.rotation.y = elapsed * -0.6;
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
        window.removeEventListener('mousemove', onMouseMove);
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch {
      setWebglSupported(false);
    }
  }, [isReducedMotion]);

  const navigateTo = (targetId: string, label: string) => {
    soundEngine.playTargetLock();
    trackEvent('cta_clicked', { target: `hero_${label}` });
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="opening-scene"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 pb-12 bg-[#111111]"
    >
      {/* 3D Holographic Spatial Canvas */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />

      {/* AAA Game Scanlines & Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-editorial-grid pointer-events-none z-10 opacity-35" />
      <div className="absolute inset-0 scanlines-overlay pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/85 via-transparent to-[#111111] pointer-events-none z-10" />

      {/* Top Meta Line with Tactical HUD Badges */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-2">
        <div className="flex items-center justify-between border-b border-[#242424] pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#B65B3C] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-[#B65B3C] uppercase font-bold">
              AYUUWORKS // DIGITAL EXPERIENCE STUDIO
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono bg-[#1c1a17] text-[#D7D0C5] border border-[#2e2a24] rounded-sm">
              SECTOR: DLH / BOM
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#9B978F] font-mono">
            <span className="flex items-center gap-1 text-[#F2EFE8]">
              <Zap className="w-3 h-3 text-[#B65B3C]" />
              <span>STRATEGY</span>
            </span>
            <span>·</span>
            <span>DESIGN</span>
            <span>·</span>
            <span>TECH</span>
            <span>·</span>
            <span>EXECUTION</span>
          </div>
        </div>
      </div>

      {/* Central Statement in High-Impact Language */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-6 py-12 my-auto">
        <div className="space-y-6">
          {/* Tactical Target Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#161616] border border-[#2a2a2a] text-xs font-mono text-[#D7D0C5]">
            <Crosshair className="w-3.5 h-3.5 text-[#B65B3C]" />
            <span>{t.hero.tacticalTag}</span>
          </div>

          {/* Main Statement */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#F2EFE8] leading-[0.96]">
            {t.hero.headlinePart1}<br />
            <span className="text-[#D7D0C5]">{t.hero.headlinePart2}</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#9B978F] max-w-2xl font-normal leading-relaxed pt-1">
            {t.hero.body}
          </p>

          {/* Three Entry Paths (AAA Game Cards) */}
          <div className="pt-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[#D7D0C5]/70 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B65B3C]" />
              <span>{t.hero.entryPathHeader}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              {/* Path 1: Explore My Business */}
              <button
                onClick={() => navigateTo('business-explorer', 'explore_business')}
                onMouseEnter={() => soundEngine.playHover()}
                className="hud-bracket text-left p-5 rounded-sm border border-[#2e2a24] bg-[#161616]/95 hover:border-[#B65B3C] hover:bg-[#1a1816] transition-all group flex flex-col justify-between h-40 cursor-pointer shadow-lg shadow-black/40"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#B65B3C]">
                  <span className="font-bold">01 // TACTICAL AUDIT</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-[#F2EFE8] group-hover:text-white transition-colors">
                    {t.hero.path1Title}
                  </h3>
                  <p className="text-xs text-[#9B978F] mt-1 leading-snug">
                    {t.hero.path1Desc}
                  </p>
                </div>
              </button>

              {/* Path 2: See Our Work */}
              <button
                onClick={() => navigateTo('projects-section', 'see_work')}
                onMouseEnter={() => soundEngine.playHover()}
                className="hud-bracket text-left p-5 rounded-sm border border-[#2e2a24] bg-[#161616]/95 hover:border-[#D7D0C5] hover:bg-[#1a1816] transition-all group flex flex-col justify-between h-40 cursor-pointer shadow-lg shadow-black/40"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#D7D0C5]">
                  <span className="font-bold">02 // PROVEN MISSIONS</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-[#F2EFE8] group-hover:text-white transition-colors">
                    {t.hero.path2Title}
                  </h3>
                  <p className="text-xs text-[#9B978F] mt-1 leading-snug">
                    {t.hero.path2Desc}
                  </p>
                </div>
              </button>

              {/* Path 3: Just Explore */}
              <button
                onClick={() => navigateTo('curiosity-section', 'just_explore')}
                onMouseEnter={() => soundEngine.playHover()}
                className="hud-bracket text-left p-5 rounded-sm border border-[#2e2a24] bg-[#161616]/95 hover:border-[#D7D0C5] hover:bg-[#1a1816] transition-all group flex flex-col justify-between h-40 cursor-pointer shadow-lg shadow-black/40"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#9B978F]">
                  <span className="font-bold">03 // PERSPECTIVE</span>
                  <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-[#F2EFE8] group-hover:text-white transition-colors">
                    {t.hero.path3Title}
                  </h3>
                  <p className="text-xs text-[#9B978F] mt-1 leading-snug">
                    {t.hero.path3Desc}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6">
        <div className="border-t border-[#242424] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#9B978F] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B65B3C]"></span>
            <span>SEE YOUR BUSINESS DIFFERENTLY // WE MAKE BRANDS IMPOSSIBLE TO IGNORE</span>
          </div>
          <div>
            <span>FOUNDED BY AYUSH MISHRA · INDEPENDENT COMMERCIAL STUDIO</span>
          </div>
        </div>
      </div>
    </section>
  );
};


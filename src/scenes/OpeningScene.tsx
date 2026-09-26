import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAWE } from '../awe/context';
import { ArrowDown, ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export const OpeningScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion, trackEvent } = useAWE();
  const [webglSupported, setWebglSupported] = useState(true);

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

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      // Subtle architectural grid planes (Editorial Future aesthetic)
      const gridHelper = new THREE.GridHelper(24, 24, 0x242424, 0x1a1a1a);
      gridHelper.position.y = -1.8;
      scene.add(gridHelper);

      // Controlled architectural monolithic monoliths / sculptural spatial blocks
      const group = new THREE.Group();
      const geom = new THREE.BoxGeometry(1.6, 3.2, 0.2);
      const edgeGeom = new THREE.EdgesGeometry(geom);

      // Monolithic panels with muted stone/charcoal materials
      const panelMat = new THREE.MeshBasicMaterial({
        color: 0x181818,
        wireframe: false,
      });
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x333333,
        linewidth: 1,
      });
      const accentLineMat = new THREE.LineBasicMaterial({
        color: 0xB65B3C,
        linewidth: 1.5,
      });

      // Place 4 subtle architectural panels in space
      const positions = [
        { x: -3.8, y: 0.2, z: -2.5, rotY: 0.35, accent: false },
        { x: -1.6, y: -0.2, z: -4.5, rotY: -0.2, accent: false },
        { x: 2.2, y: 0.4, z: -3.2, rotY: -0.4, accent: true },
        { x: 4.4, y: -0.4, z: -2.0, rotY: 0.25, accent: false },
      ];

      positions.forEach((pos) => {
        const mesh = new THREE.Mesh(geom, panelMat);
        mesh.position.set(pos.x, pos.y, pos.z);
        mesh.rotation.y = pos.rotY;

        const wire = new THREE.LineSegments(edgeGeom, pos.accent ? accentLineMat : lineMat);
        mesh.add(wire);
        group.add(mesh);
      });

      scene.add(group);

      // Minimal floating light dust particles
      const particleCount = 45;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        pPos[i] = (Math.random() - 0.5) * 16;
        pPos[i + 1] = Math.random() * 6 - 2;
        pPos[i + 2] = (Math.random() - 0.5) * 12;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xD7D0C5,
        size: 0.04,
        transparent: true,
        opacity: 0.25,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      let clock = new THREE.Clock();

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
    trackEvent('cta_clicked', { target: `hero_${label}` });
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="opening-scene"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-20 pb-12 bg-[#111111]"
    >
      {/* Restrained 3D Spatial Canvas */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 opacity-70" />

      {/* Editorial Grid Overlay */}
      <div className="absolute inset-0 bg-editorial-grid pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-transparent to-[#111111] pointer-events-none z-10" />

      {/* Top Meta Line */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-6">
        <div className="flex items-center justify-between border-b border-[#242424] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-widest text-[#B65B3C] uppercase">
              AYUUWORKS / DIGITAL EXPERIENCE STUDIO
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#9B978F] font-mono">
            <span>STRATEGY</span>
            <span>·</span>
            <span>DESIGN</span>
            <span>·</span>
            <span>TECHNOLOGY</span>
            <span>·</span>
            <span>EXPERIENCE</span>
          </div>
        </div>
      </div>

      {/* Central Statement & Three Entry Paths */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-6 py-12 my-auto">
        <div className="space-y-6">
          {/* Main Statement */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#F2EFE8] leading-[0.98]">
            YOUR BUSINESS<br />
            <span className="text-[#D7D0C5]">DESERVES TO BE SEEN.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#9B978F] max-w-2xl font-normal leading-relaxed pt-2">
            We build digital experiences, identities and creative systems that help businesses become easier to notice, understand and remember.
          </p>

          {/* Three Entry Paths (Section 10) */}
          <div className="pt-8">
            <p className="text-xs uppercase tracking-widest font-mono text-[#D7D0C5]/60 mb-4">
              CHOOSE HOW YOU'D LIKE TO BEGIN
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              {/* Path 1: Explore My Business */}
              <button
                onClick={() => navigateTo('business-explorer', 'explore_business')}
                className="text-left p-5 rounded border border-[#242424] bg-[#161616]/90 hover:border-[#B65B3C] transition-all group flex flex-col justify-between h-36"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#B65B3C]">
                  <span>01 / DIAGNOSTIC</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F2EFE8] group-hover:text-white transition-colors">
                    EXPLORE MY BUSINESS
                  </h3>
                  <p className="text-xs text-[#9B978F] mt-1 leading-snug">
                    Uncover opportunities and bottlenecks in 30–60 seconds.
                  </p>
                </div>
              </button>

              {/* Path 2: See Our Work */}
              <button
                onClick={() => navigateTo('projects-section', 'see_work')}
                className="text-left p-5 rounded border border-[#242424] bg-[#161616]/90 hover:border-[#D7D0C5] transition-all group flex flex-col justify-between h-36"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#D7D0C5]">
                  <span>02 / PROOF</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F2EFE8] group-hover:text-white transition-colors">
                    SEE OUR WORK
                  </h3>
                  <p className="text-xs text-[#9B978F] mt-1 leading-snug">
                    Selected case studies built for regional and market authority.
                  </p>
                </div>
              </button>

              {/* Path 3: Just Explore */}
              <button
                onClick={() => navigateTo('curiosity-section', 'just_explore')}
                className="text-left p-5 rounded border border-[#242424] bg-[#161616]/90 hover:border-[#D7D0C5] transition-all group flex flex-col justify-between h-36"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#9B978F]">
                  <span>03 / PERSPECTIVE</span>
                  <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F2EFE8] group-hover:text-white transition-colors">
                    JUST EXPLORE
                  </h3>
                  <p className="text-xs text-[#9B978F] mt-1 leading-snug">
                    Discover how AyuuWorks thinks about attention, perception and trust.
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
            <span>SEE YOUR BUSINESS DIFFERENTLY</span>
          </div>
          <div>
            <span>FOUNDED BY AYUSH MISHRA · INDEPENDENT STUDIO</span>
          </div>
        </div>
      </div>
    </section>
  );
};

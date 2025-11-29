import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Module2 = () => {
  const container = useRef(null);
  const marqueeRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const imageWrapperRef = useRef(null);
  
  // Mouse tilt effect state
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = imageWrapperRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Calculate rotation based on mouse position
      setRotation({
        x: (y / rect.height) * -20, // Invert Y for tilt
        y: (x / rect.width) * 20
      });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. MARQUEE ANIMATION (Infinite Scroll Background)
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });

      // 2. TEXT REVEAL ON ENTER
      // We animate the items into place, but we DON'T move them on scroll 
      // to prevent them from crashing into each other.
      gsap.from(".editorial-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentWrapperRef.current,
          start: "top 80%"
        }
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container}
      className="relative min-h-screen w-full bg-[#080808] overflow-hidden text-[#e5e5e5] py-24 flex flex-col justify-center"
    >
      {/* --- BACKGROUND GRAIN --- */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.05] mix-blend-overlay">
        <svg className='w-full h-full'><filter id='noiseM2'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseM2)'/></svg>
      </div>

      {/* --- KINETIC TYPOGRAPHY BACKGROUND (The Marquee) --- */}
      {/* Lowered opacity to 0.05 to prevent visual clash with main text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] z-0 opacity-[0.05] select-none pointer-events-none mix-blend-lighten">
        <div ref={marqueeRef} className="whitespace-nowrap font-black text-[15vw] leading-none text-transparent stroke-white" style={{ WebkitTextStroke: '1px #555' }}>
          CONSTRUCTING THE SELF — IDENTITY IN FLUX — BIOLOGY VS SOCIETY — CONSTRUCTING THE SELF — IDENTITY IN FLUX —
        </div>
      </div>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div ref={contentWrapperRef} className="relative z-10 container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Typography & Context */}
        <div className="lg:col-span-7 flex flex-col justify-center relative">
          
          {/* Chapter Marker */}
          <div className="editorial-text flex items-center gap-4 mb-8 text-amber-600/80">
            <span className="text-xs font-mono border border-amber-600/50 px-2 py-1 rounded">FIG. 02</span>
            <div className="h-px w-12 bg-amber-600/50"></div>
            <span className="text-xs font-mono uppercase tracking-widest">Selfhood in Society</span>
          </div>

          {/* Main Title - Relaxed leading to prevent line overlap */}
          <div className="relative z-20 mix-blend-normal mb-12">
            <h2 className="editorial-text text-6xl md:text-8xl font-black tracking-tighter leading-[0.95]">
              IDENTITY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">IS NOT</span> <br />
              FIXED.
            </h2>
          </div>

          {/* Editorial Paragraphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-3xl">
            <p className="editorial-text border-l border-white/10 pl-6">
              Module 2 dismantled the idea of a pre-determined self. Learning about <strong className="text-white font-normal">Biological Determinism</strong> and Eugenics highlighted the danger of reducing complexity to genetics.
            </p>
            <p className="editorial-text">
              The concepts of <strong className="text-white font-normal">Mead & Cooley</strong> proved that we are reflections of our interactions. The "Self" is a negotiation between internal agency and external perception.
            </p>
          </div>

          {/* "Key Insight" Ticket */}
          <div className="editorial-text mt-12 inline-block">
            <div className="bg-[#151515] border border-white/10 p-6 max-w-md relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-amber-700"></div>
               <div className="absolute -right-4 -bottom-4 text-9xl text-white/5 font-black z-0 group-hover:scale-110 transition-transform duration-500">?</div>
               
               <p className="relative z-10 font-mono text-xs text-amber-600 mb-2 uppercase tracking-wider">Analysis Result</p>
               <p className="relative z-10 text-white font-medium">
                 "Selfhood is not found, it is built. It is shaped by memory, time, and the active choices we make within our social constraints."
               </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: The Interactive Image */}
        <div className="lg:col-span-5 h-full flex items-center justify-center lg:justify-end perspective-1000 mt-12 lg:mt-0">
           
           <div 
             ref={imageWrapperRef}
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
             className="relative w-full max-w-md aspect-[3/4] group cursor-pointer"
             style={{ perspective: "1000px" }}
           >
             {/* The "Card" Container - Rotates in 3D */}
             <div 
               className="w-full h-full relative transition-transform duration-100 ease-out will-change-transform"
               style={{ 
                 transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                 transformStyle: "preserve-3d" 
               }}
             >
                 {/* Decorative Frame Elements (Floating off the card) */}
                 <div className="absolute -inset-4 border border-white/20 z-0 translate-z-[-20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute -top-10 -right-10 text-xs font-mono text-white/30 writing-vertical-lr">REF: MODULE_02_DATA</div>

                 {/* THE IMAGE */}
                 <div className="relative w-full h-full overflow-hidden bg-neutral-900 shadow-2xl shadow-black">
                    <img 
                      src="placeholder-module2.jpg" 
                      alt="Selfhood Construction" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
                    />
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                 </div>

                 {/* Floating Text ON TOP of Image (3D Depth) */}
                 <div 
                   className="absolute bottom-8 left-8 z-30 transform translate-z-[50px] mix-blend-difference"
                   style={{ transform: "translateZ(50px)" }}
                 >
                    <h3 className="text-4xl font-black text-white leading-none">THE<br/>AGENCY</h3>
                 </div>
             </div>
           </div>

        </div>
      </div>
      
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .writing-vertical-lr { writing-mode: vertical-lr; }
      `}</style>
    </section>
  );
};

export default Module2;
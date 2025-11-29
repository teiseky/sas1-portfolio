import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Module3 = () => {
  const container = useRef(null);
  const titleGroup = useRef(null);
  const imageWrapper = useRef(null);
  const ghostImageRef = useRef(null);
  const contentColRef = useRef(null);
  
  // Mouse interaction state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates -1 to 1
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;

    setMousePos({ x, y });
    
    // Parallax the "Ghost" image instantly for responsiveness
    gsap.to(ghostImageRef.current, {
      x: x * -40, // Moves opposite to mouse
      y: y * -40,
      duration: 1,
      ease: "power2.out"
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=200%", // Pin for a while to let animation breathe
          pin: true,
          scrub: 1.5,
        }
      });

      // 1. INTRO: Title Construction
      tl.from(".title-part", {
        yPercent: 150,
        skewY: 10,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out"
      })

      // 2. IMAGE: Reveal & Scale
      .from(imageWrapper.current, {
        clipPath: "inset(50% 0 50% 0)", // Unfolds vertically
        scale: 1.2,
        duration: 1.5,
        ease: "expo.inOut"
      }, "-=1")

      // 3. CONTENT: Slide in from right
      .from(contentColRef.current, {
        xPercent: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.inOut"
      }, "-=1.2")

      // 4. SCROLL ACTION: Elements separate
      .to(".title-outline", { xPercent: -10, ease: "none" }, 0.5) // Parallax title
      .to(".title-solid", { xPercent: 10, ease: "none" }, 0.5);   // Parallax title

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#1a1818] text-[#e0dcd3] overflow-hidden flex flex-col justify-center"
    >
      {/* --- BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay z-50">
         <svg className='w-full h-full'><filter id='noiseM3'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseM3)'/></svg>
      </div>

      {/* --- DECORATIVE GRID --- */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="w-full h-full border-l border-r border-[#e0dcd3] max-w-7xl mx-auto grid grid-cols-12">
            <div className="col-span-1 border-r border-[#e0dcd3]"></div>
            <div className="col-span-5 border-r border-[#e0dcd3]"></div>
            <div className="col-span-5 border-r border-[#e0dcd3]"></div>
        </div>
        <div className="absolute top-24 left-0 w-full h-px bg-[#e0dcd3]"></div>
        <div className="absolute bottom-24 left-0 w-full h-px bg-[#e0dcd3]"></div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* COL 1: TYPOGRAPHY & IMAGE COMPOSITION */}
        <div className="lg:col-span-7 h-full flex flex-col justify-center relative">
            
            {/* The Sculptural Title */}
            <div ref={titleGroup} className="relative z-20 mb-[-5%] mix-blend-exclusion pointer-events-none">
                <div className="overflow-hidden">
                    <h1 className="title-part title-outline font-display text-[8vw] md:text-[7vw] leading-[0.85] font-black text-transparent stroke-white tracking-tighter" style={{ WebkitTextStroke: '2px #e0dcd3' }}>
                        CULTURE
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h1 className="title-part title-solid font-display text-[8vw] md:text-[7vw] leading-[0.85] font-black text-[#e0dcd3] tracking-tighter ml-[10%]">
                        & IDENTITY
                    </h1>
                </div>
            </div>

            {/* The Image Stack */}
            <div className="relative w-full max-w-xl aspect-[4/3] mt-8 self-center lg:self-start perspective-1000">
                
                {/* Ghost Image (Moves with Mouse) */}
                <div 
                    ref={ghostImageRef}
                    className="absolute inset-0 bg-red-900/40 mix-blend-screen z-0 opacity-60 blur-[2px]"
                >
                    <img src="placeholder-module3.jpg" className="w-full h-full object-cover opacity-50 grayscale" alt="Ghost" />
                </div>

                {/* Main Image */}
                <div ref={imageWrapper} className="relative w-full h-full overflow-hidden bg-[#2a2a2a] z-10 border border-white/10 shadow-2xl">
                    <img 
                        src="placeholder-module3.jpg" 
                        alt="Culture and Identity" 
                        className="w-full h-full object-cover scale-110"
                        style={{
                            transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px) scale(1.1)`,
                            transition: 'transform 0.4s ease-out'
                        }}
                    />
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1818] via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Decorative Sticker */}
                <div className="absolute -bottom-6 -right-6 z-20 bg-[#c2410c] text-[#1a1818] p-4 rounded-full w-24 h-24 flex items-center justify-center animate-spin-slow">
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                        <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="none"/>
                        <text fontSize="13" fontWeight="bold">
                            <textPath href="#curve">
                                MODULE 03 • REFLECTION •
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>
        </div>

        {/* COL 2: EDITORIAL CONTENT */}
        <div ref={contentColRef} className="lg:col-span-5 flex flex-col justify-center h-full pl-0 lg:pl-12 bg-[#1a1818]/90 backdrop-blur-sm lg:bg-transparent">
            
            {/* Header Tag */}
            <div className="mb-8 border-b border-[#e0dcd3]/30 pb-4">
                <span className="font-mono text-xs text-[#c2410c] tracking-[0.4em] uppercase">
                    Ethnicity • Personality
                </span>
            </div>

            {/* Main Text - Broken into blocks */}
            <div className="space-y-8">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-[#e0dcd3]">
                    Culture is not just a backdrop; it is the <span className="font-serif italic text-[#c2410c]">invisible architecture</span> of the self.
                </p>

                <div className="grid grid-cols-1 gap-6 text-sm text-[#9ca3af] font-mono leading-relaxed">
                    <p>
                        <strong className="text-white block mb-1 font-sans uppercase tracking-wider">Ethnocentrism vs. Relativism</strong>
                        By studying these opposing forces, I became aware of the lens through which I view the world. We judge others by our own standards, often forgetting that our "normal" is constructed.
                    </p>
                    
                    <p>
                        <strong className="text-white block mb-1 font-sans uppercase tracking-wider">The Filipino Context</strong>
                        My experiences as a Filipino are deeply woven into how I express emotion, respect authority, and define success. Culture shapes personality, but we also negotiate with it.
                    </p>
                </div>
            </div>

            {/* "Key Realization" Styled as a Stamp */}
            <div className="mt-12 border border-[#e0dcd3]/20 p-6 relative">
                <div className="absolute -top-3 left-4 bg-[#1a1818] px-2 text-xs font-bold text-[#c2410c] uppercase tracking-widest">
                    Key Insight
                </div>
                <p className="font-serif text-lg italic text-[#e0dcd3]/90">
                    "We are not passive recipients of culture. We are active participants who choose which traditions to carry forward and which to challenge."
                </p>
                {/* Barcode graphic */}
                <div className="mt-4 h-8 w-32 opacity-50 flex items-end gap-[2px]">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="bg-white" style={{ width: Math.random() * 4 + 1 + 'px', height: Math.random() * 100 + '%' }}></div>
                    ))}
                </div>
            </div>

        </div>

      </div>
        
        {/* CSS for animations */}
      <style jsx>{`
        .animate-spin-slow {
            animation: spin 12s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Module3;
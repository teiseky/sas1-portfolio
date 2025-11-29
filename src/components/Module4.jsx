import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Module4 = () => {
  const container = useRef(null);
  const titleRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRefs = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalized -1 to 1
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    
    setMousePos({ x, y });

    // Chromatic Aberration Effect on Image (RGB Shift)
    gsap.to(".rgb-layer-r", { x: x * 15, y: y * 15, duration: 0.5 });
    gsap.to(".rgb-layer-g", { x: x * -10, y: y * -10, duration: 0.5 });
    gsap.to(".rgb-layer-b", { x: x * 5, y: y * 5, duration: 0.5 });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. LIQUID TITLE REVEAL
      tl.from(".liquid-title-char", {
        y: 200,
        scaleY: 2, // Stretch effect
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out"
      })

      // 2. IMAGE EXPANSION
      .from(imageContainerRef.current, {
        scale: 0,
        rotation: -10,
        duration: 1.5,
        ease: "expo.inOut"
      }, "-=1.2")

      // 3. CARDS FLOAT IN
      .from(contentRefs.current, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // --- SCROLL INTERACTIONS ---
      
      // Title melts/blurs away
      tl.to(titleRef.current, {
        filter: "blur(20px)",
        opacity: 0,
        scale: 1.1,
        ease: "none"
      }, 0.5);

      // Image rotates and follows scroll
      tl.to(imageContainerRef.current, {
        rotation: 360,
        scale: 0.5,
        opacity: 0.2,
        ease: "power1.inOut"
      }, 0.5);

      // Content cards spread out
      tl.to(contentRefs.current[0], { x: -100, rotation: -5 }, 0.5);
      tl.to(contentRefs.current[1], { x: 100, rotation: 5 }, 0.5);

    }, container);
    return () => ctx.revert();
  }, []);

  // Helper for splitting text into spans
  const splitText = (text) => text.split("").map((char, i) => (
    <span key={i} className="liquid-title-char inline-block origin-bottom">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section 
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#120214] text-rose-100 overflow-hidden flex flex-col justify-center items-center"
    >
        {/* --- CUSTOM FILTERS --- */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
                <filter id="liquid">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>
        </svg>

        {/* --- BACKGROUND GRADIENTS --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-fuchsia-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[100px] mix-blend-screen" style={{ animationDuration: '8s' }}></div>
            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay">
                <svg className='w-full h-full'><filter id='noiseM4'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseM4)'/></svg>
            </div>
        </div>

        {/* --- MAIN TITLE (Liquid Effect) --- */}
        <div ref={titleRef} className="absolute top-16 w-full text-center z-20 pointer-events-none mix-blend-lighten">
            <h1 className="font-display text-[10vw] font-black leading-none tracking-tighter text-transparent stroke-white" 
                style={{ filter: "url(#liquid)", WebkitTextStroke: "2px #f0abfc" }}>
                {splitText("FLUIDITY")}
            </h1>
            <h2 className="font-display text-[4vw] font-bold tracking-[0.5em] text-fuchsia-500/80 mt-[-2vw] mix-blend-screen">
                TRANSITION
            </h2>
        </div>

        {/* --- CENTRAL IMAGE (RGB Shift) --- */}
        <div className="relative z-10 w-[400px] h-[500px] perspective-1000">
            <div 
                ref={imageContainerRef}
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* RGB Layer Red */}
                <div className="rgb-layer-r absolute inset-0 bg-red-500/50 mix-blend-screen opacity-70" style={{ clipPath: "inset(0)" }}>
                     <img src="placeholder-module4.jpg" className="w-full h-full object-cover grayscale opacity-50" alt="red" />
                </div>
                {/* RGB Layer Green */}
                <div className="rgb-layer-g absolute inset-0 bg-green-500/50 mix-blend-screen opacity-70" style={{ clipPath: "inset(0)" }}>
                     <img src="placeholder-module4.jpg" className="w-full h-full object-cover grayscale opacity-50" alt="green" />
                </div>
                {/* RGB Layer Blue */}
                <div className="rgb-layer-b absolute inset-0 bg-blue-500/50 mix-blend-screen opacity-70" style={{ clipPath: "inset(0)" }}>
                     <img src="placeholder-module4.jpg" className="w-full h-full object-cover grayscale opacity-50" alt="blue" />
                </div>
                
                {/* Main Clear Image */}
                <div className="absolute inset-0 border border-white/20 overflow-hidden bg-black">
                     <img src="placeholder-module4.jpg" alt="Body Gender" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                     {/* Scanlines */}
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>
            </div>
        </div>

        {/* --- FLOATING CONTENT CARDS (Glassmorphism) --- */}
        <div className="absolute w-full h-full pointer-events-none flex items-center justify-center z-30">
            
            {/* Card 1: Left */}
            <div ref={el => contentRefs.current[0] = el} className="absolute left-[10%] top-[40%] w-80 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-lg pointer-events-auto hover:bg-white/10 transition-colors">
                <div className="w-8 h-1 bg-fuchsia-500 mb-4 shadow-[0_0_10px_#d946ef]"></div>
                <h3 className="font-mono text-sm text-fuchsia-300 uppercase tracking-widest mb-2">Refraction</h3>
                <p className="text-sm font-light leading-relaxed text-gray-200">
                    "Insecurities aren't just personal—they're shaped by media standards that unconsciously influence how I evaluate my own body."
                </p>
            </div>

            {/* Card 2: Right */}
            <div ref={el => contentRefs.current[1] = el} className="absolute right-[10%] bottom-[20%] w-80 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-lg pointer-events-auto hover:bg-white/10 transition-colors">
                 <div className="w-8 h-1 bg-purple-500 mb-4 shadow-[0_0_10px_#a855f7]"></div>
                <h3 className="font-mono text-sm text-purple-300 uppercase tracking-widest mb-2">Spectrum</h3>
                <p className="text-sm font-light leading-relaxed text-gray-200">
                    "Discussions on sexuality challenged me to look beyond stereotypes. Every transition is a cultural process of redefining the self."
                </p>
            </div>

        </div>

        {/* --- DECORATIVE ELEMENTS --- */}
        <div className="absolute bottom-12 w-full flex justify-between px-12 z-40 mix-blend-overlay">
             <div className="font-mono text-[10px] tracking-widest uppercase">
                Fig. 04 — Body/Gender
             </div>
             <div className="font-mono text-[10px] tracking-widest uppercase">
                [ Coordinates: Fluid ]
             </div>
        </div>

    </section>
  );
};

export default Module4;
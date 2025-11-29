import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Module4 = () => {
  const container = useRef(null);
  const titleWrapper = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);

  // Mouse movement logic for the "RGB Split" effect
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate normalized position (-1 to 1)
    const x = (clientX / width - 0.5) * 2;
    const y = (clientY / height - 0.5) * 2;

    // Move the RGB layers with different intensities to create the "Split"
    gsap.to(".rgb-red", { x: x * 20, y: y * 20, duration: 1, ease: "power2.out" });
    gsap.to(".rgb-green", { x: x * -15, y: y * -15, duration: 1, ease: "power2.out" });
    gsap.to(".rgb-blue", { x: x * 10, y: y * 10, duration: 1, ease: "power2.out" });
    
    // Tilt the main image container slightly
    gsap.to(imageRef.current, { 
      rotateY: x * 5, 
      rotateX: -y * 5, 
      duration: 1.5, 
      ease: "power3.out" 
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=250%", // Longer scroll distance for drama
          pin: true,
          scrub: 1,
        }
      });

      // --- SEQUENCE 1: THE LIQUID INTRO ---
      tl.from(".liquid-char", {
        y: 150,
        opacity: 0,
        scaleY: 2.5, // Stretch vertically like taffy
        filter: "blur(20px)",
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out"
      })
      
      // --- SEQUENCE 2: THE SPLIT ---
      // Move text apart to reveal image
      .to(".liquid-word-1", { x: "-20vw", duration: 2, ease: "power2.inOut" }, "-=1")
      .to(".liquid-word-2", { x: "20vw", duration: 2, ease: "power2.inOut" }, "<")
      
      // --- SEQUENCE 3: IMAGE EMERGES ---
      .from(imageRef.current, {
        scale: 0.5,
        opacity: 0,
        filter: "grayscale(100%) blur(10px)",
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.5")

      // --- SEQUENCE 4: CARDS APPEAR ---
      .from(".content-card", {
        y: 50,
        opacity: 0,
        rotateX: 45,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5");

    }, container);
    return () => ctx.revert();
  }, []);

  // Helper to split text for animation
  const splitText = (text) => text.split("").map((char, i) => (
    <span key={i} className="liquid-char inline-block">{char}</span>
  ));

  return (
    <section 
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#0a050a] text-white overflow-hidden flex flex-col justify-center items-center perspective-1000"
    >
        {/* --- GLOBAL SVG FILTERS (The "Sauce") --- */}
        <svg className="absolute w-0 h-0">
            <defs>
                <filter id="liquidFilter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>
        </svg>

        {/* --- ATMOSPHERE --- */}
        {/* Grain Texture */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[5s]"></div>
             <div className="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] bg-pink-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        {/* --- TYPOGRAPHY LAYER --- */}
        <div ref={titleWrapper} className="absolute z-20 flex flex-col items-center justify-center w-full mix-blend-screen pointer-events-none">
            {/* The filter creates the "Liquid" effect on the text */}
            <h1 className="liquid-word-1 font-display text-[12vw] font-black leading-none tracking-tighter text-white/90" style={{ filter: "url(#liquidFilter)" }}>
                {splitText("FLUID")}
            </h1>
            <h1 className="liquid-word-2 font-display text-[12vw] font-black leading-none tracking-tighter text-white/90 mt-[-4vw]" style={{ filter: "url(#liquidFilter)" }}>
                {splitText("FORM")}
            </h1>
        </div>

        {/* --- INTERACTIVE IMAGE LAYER (The "Eye") --- */}
        <div ref={imageRef} className="relative z-10 w-[350px] md:w-[450px] aspect-[3/4] preserve-3d">
            
            {/* RGB Layers (These move separately on mouse hover) */}
            <div className="rgb-red absolute inset-0 bg-red-600 mix-blend-screen opacity-60 overflow-hidden rounded-sm">
                <img src="placeholder-module4.jpg" className="w-full h-full object-cover grayscale contrast-150" alt="" />
            </div>
            <div className="rgb-green absolute inset-0 bg-green-600 mix-blend-screen opacity-60 overflow-hidden rounded-sm">
                <img src="placeholder-module4.jpg" className="w-full h-full object-cover grayscale contrast-150" alt="" />
            </div>
            <div className="rgb-blue absolute inset-0 bg-blue-600 mix-blend-screen opacity-60 overflow-hidden rounded-sm">
                <img src="placeholder-module4.jpg" className="w-full h-full object-cover grayscale contrast-150" alt="" />
            </div>

            {/* Main Image Base */}
            <div className="absolute inset-0 border-[1px] border-white/20 bg-black overflow-hidden rounded-sm">
                <img src="placeholder-module4.jpg" alt="Module 4 Main" className="w-full h-full object-cover opacity-80" />
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
            </div>
        </div>

        {/* --- FLOATING EDITORIAL CARDS --- */}
        <div className="absolute inset-0 z-30 pointer-events-none">
            
            {/* Top Right Data Block */}
            <div className="absolute top-12 right-6 md:right-12 text-right">
                <div className="font-mono text-xs text-gray-500 mb-1">MODULE 04</div>
                <div className="text-2xl font-display uppercase tracking-widest text-white">Identity Spectrum</div>
                <div className="w-full h-[1px] bg-white/20 mt-2"></div>
            </div>

            {/* Content Card 1 (Bottom Left) */}
            <div className="content-card absolute bottom-20 left-6 md:left-20 w-72 md:w-80 backdrop-blur-md bg-black/40 border border-white/10 p-6">
                <div className="text-pink-500 font-mono text-xs mb-3 tracking-widest">REF. 01 — PERCEPTION</div>
                <p className="font-body text-sm leading-relaxed text-gray-300">
                    "Insecurities aren't just personal—they're shaped by media standards that unconsciously influence how I evaluate my own body."
                </p>
            </div>

            {/* Content Card 2 (Right Center) */}
            <div className="content-card absolute top-1/2 right-6 md:right-20 w-72 md:w-80 backdrop-blur-md bg-black/40 border border-white/10 p-6 transform -translate-y-1/2">
                <div className="text-purple-500 font-mono text-xs mb-3 tracking-widest">REF. 02 — SPECTRUM</div>
                <p className="font-body text-sm leading-relaxed text-gray-300">
                    "Every transition is a cultural process. I learned to look beyond stereotypes and see identity as a constant state of becoming."
                </p>
            </div>

        </div>

        {/* --- DECORATIVE MARKERS --- */}
        <div className="absolute bottom-6 w-full flex justify-between px-6 opacity-30 font-mono text-[10px] tracking-[0.3em]">
            <span>SCROLL TO PROCESS</span>
            <span>FIG. 4.0</span>
        </div>
    </section>
  );
};

export default Module4;
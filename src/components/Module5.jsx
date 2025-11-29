import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Conclusion from './Conclusion';

gsap.registerPlugin(ScrollTrigger);

// --- MODULE 5 COMPONENT (GSAP Artistry) ---
const Module5 = () => {
  const container = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });

    // Subtle parallax for the background elements
    gsap.to(".floating-orb", {
        x: x * 50,
        y: y * 50,
        duration: 1.5,
        ease: "power2.out"
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. Title Unfolding
      tl.from(".char-slide", {
        yPercent: 120,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out"
      })
      
      // 2. Image Reveal (Scale + Rotation)
      .from(imageRef.current, {
        scale: 0.8,
        rotation: -5,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      }, "-=0.5")

      // 3. Cards Slide In
      .from(cardsRef.current, {
        y: 200,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.2)"
      }, "-=1");

      // --- SCROLL ANIMATIONS ---
      
      // Title splits
      tl.to(".title-top", { xPercent: -10, opacity: 0.5 }, 0.5);
      tl.to(".title-bottom", { xPercent: 10, opacity: 0.5 }, 0.5);

      // Image floats up
      tl.to(imageRef.current, { y: -100, rotation: 5 }, 0.5);

      // Cards spread
      tl.to(cardsRef.current[0], { x: -50, rotation: -5 }, 0.5);
      tl.to(cardsRef.current[1], { x: 50, rotation: 5 }, 0.5);

    }, container);
    return () => ctx.revert();
  }, []);

  // Split text helper
  const splitText = (text) => text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden align-top">
        <span className="char-slide inline-block">
            {char === " " ? "\u00A0" : char}
        </span>
    </span>
  ));

  return (
    <div className="w-full bg-[#fff0f5] text-[#831843]">
        
        <section 
            ref={container}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center"
        >
            {/* --- ARTISTIC BACKGROUND --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Soft Gradients */}
                <div className="floating-orb absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-rose-200/40 rounded-full blur-[100px] mix-blend-multiply"></div>
                <div className="floating-orb absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-pink-300/30 rounded-full blur-[120px] mix-blend-multiply"></div>
                
                {/* Noise Texture (Essential for the "Paper" look) */}
                <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay z-10">
                    <svg className='w-full h-full'><filter id='noisePink'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noisePink)'/></svg>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-20 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
                
                {/* Typography Layer */}
                <div ref={titleRef} className="md:col-span-12 absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 opacity-20 md:opacity-100">
                    <h1 className="title-top font-display text-[12vw] leading-[0.8] font-black tracking-tighter text-transparent stroke-rose-900 mix-blend-multiply" style={{ WebkitTextStroke: '1px #be123c' }}>
                        {splitText("VALUES")}
                    </h1>
                    <h1 className="title-bottom font-display text-[12vw] leading-[0.8] font-black tracking-tighter text-[#be123c] ml-[15vw] mix-blend-multiply">
                        {splitText("&LOVE")}
                    </h1>
                </div>

                {/* Central Image Art */}
                <div className="md:col-span-12 flex justify-center z-10">
                    <div 
                        ref={imageRef}
                        className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]"
                    >
                        {/* Decorative Tape */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#fdf2f8]/80 backdrop-blur shadow-sm rotate-2 z-20"></div>

                        {/* Image Container */}
                        <div className="w-full h-full bg-white p-4 shadow-2xl rotate-[-2deg] transition-transform duration-500 hover:rotate-0">
                            <div className="w-full h-full overflow-hidden bg-rose-100 relative">
                                <img 
                                    src="placeholder-module5.jpg" 
                                    alt="Values" 
                                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#be123c]/40 to-transparent mix-blend-multiply"></div>
                            </div>
                        </div>

                        {/* Floating Sticker */}
                        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#be123c] rounded-full flex items-center justify-center text-white font-mono text-xs text-center p-2 shadow-lg animate-spin-slow z-30">
                            DECISION MAKING <br/> PROCESS
                        </div>
                    </div>
                </div>

                {/* Floating Glass Cards */}
                <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
                    
                    {/* Card 1: Filipino Values */}
                    <div ref={el => cardsRef.current[0] = el} className="absolute top-[25%] left-[5%] md:left-[10%] w-72 bg-white/40 backdrop-blur-md border border-white/60 p-6 shadow-xl pointer-events-auto hover:bg-white/60 transition-colors rounded-sm">
                        <div className="w-8 h-1 bg-[#be123c] mb-4"></div>
                        <h3 className="font-serif text-2xl text-[#881337] italic mb-2">Filipino Values</h3>
                        <p className="font-mono text-xs text-[#9f1239] leading-relaxed">
                            "Bahala na" and "Utang na loob"—these aren't just traits, they are the social glue that dictates my agency.
                        </p>
                    </div>

                    {/* Card 2: Connection */}
                    <div ref={el => cardsRef.current[1] = el} className="absolute bottom-[20%] right-[5%] md:right-[10%] w-72 bg-white/40 backdrop-blur-md border border-white/60 p-6 shadow-xl pointer-events-auto hover:bg-white/60 transition-colors rounded-sm text-right">
                        <div className="w-8 h-1 bg-[#be123c] mb-4 ml-auto"></div>
                        <h3 className="font-serif text-2xl text-[#881337] italic mb-2">The Choice</h3>
                        <p className="font-mono text-xs text-[#9f1239] leading-relaxed">
                            Love is not passive. It is a decision to nurture growth in oneself and another, defying peer pressure.
                        </p>
                    </div>

                </div>

            </div>
        </section>

        {/* --- INTEGRATED CONCLUSION --- */}
        <Conclusion />

        <style jsx>{`
            .animate-spin-slow {
                animation: spin 15s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
  );
};

export default Module5;
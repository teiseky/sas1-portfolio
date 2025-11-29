import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Module1 = () => {
  const sectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const mainTitleRef = useRef(null);
  const contentContainerRef = useRef(null);
  const detailsRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // --- INITIAL ENTRY ANIMATION ---
      const entryTl = gsap.timeline();
      
      // 1. Image reveals slowly from a blur and scale
      entryTl.fromTo(bgImageRef.current, 
        { scale: 1.2, filter: "blur(15px) brightness(0.4)" },
        { scale: 1.1, filter: "blur(0px) brightness(0.7)", duration: 2.5, ease: "power2.out" }
      );

      // 2. Text elements slide up from their masks
      entryTl.from(".masked-text-reveal > span", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.5,
        ease: "power4.out"
      }, "-=2"); // Overlap with image reveal

      // --- SCROLL-LINKED ANIMATION ---
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%", // Long pin duration for drama
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      scrollTl
        // 1. DEEP PARALLAX: Background image moves slowly downwards
        .to(bgImageRef.current, {
          yPercent: 20, 
          scale: 1,
          ease: "none"
        }, 0)

        // 2. FOREGROUND PARALLAX: Main title moves upwards faster
        .to(mainTitleRef.current, {
          yPercent: -50,
          opacity: 0, // Fade out eventually to clear way for bottom content
          ease: "power1.in"
        }, 0)

        // 3. CONTENT LIFT: The bottom details content moves up to meet eye level
        .fromTo(detailsRef.current, 
            { yPercent: 20, opacity: 0.5 },
            { yPercent: -10, opacity: 1, ease: "none" },
            0
        );

    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  // Helper to create masked text reveals for the editorial look
  const MaskedLine = ({ children, className = "" }) => (
    <div className={`overflow-hidden ${className}`}>
      <span className="inline-block w-full">{children}</span>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-full bg-[#0a0a0a] overflow-hidden relative text-white"
    >
        {/* --- LAYER 1: BACKGROUND ARTISTRY --- */}
        
        {/* Noise Texture Overlay for cinematic grain */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.12] mix-blend-overlay">
            <svg className='w-full h-full'><filter id='noiseM1'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseM1)'/></svg>
        </div>

        {/* The Main Image Holder with deep parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div ref={bgImageRef} className="relative w-full h-full will-change-transform">
                {/* Replace src with your actual image path if needed */}
                <img 
                    src="placeholder-module1.jpg" 
                    alt="Module Background" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.style.backgroundColor = '#1a1a1a'} // Fallback if image missing
                />
                 {/* Dark gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
            </div>
        </div>


      {/* --- LAYER 2: FOREGROUND CONTENT --- */}
      <div 
        ref={contentContainerRef}
        className="relative h-full w-full z-10 flex flex-col justify-center px-8 md:px-20"
      >
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center relative">
          
            {/* Top Label */}
            <div className="masked-text-reveal mb-8">
                <MaskedLine className="text-xs font-mono tracking-[0.4em] uppercase text-white/60">
                    — 01 / Discovery Phase
                </MaskedLine>
            </div>

            {/* MAIN TITLE - Overlapping and heavy */}
            <div ref={mainTitleRef} className="masked-text-reveal relative z-20 mix-blend-overlay">
                <MaskedLine>
                    <h2 className="text-[12vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter text-white/90">
                        LAYERS
                    </h2>
                </MaskedLine>
                <MaskedLine className="-mt-[2vw]">
                     <h2 className="text-[12vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter text-white/90 ml-[10vw]">
                        OF THE
                    </h2>
                </MaskedLine>
                 <MaskedLine className="-mt-[2vw]">
                    <h2 className="text-[12vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter text-transparent stroke-white/80" style={{ WebkitTextStroke: '2px white' }}>
                        SELF.
                    </h2>
                </MaskedLine>
            </div>

             {/* Decorative line */}
             <div className="w-full h-px bg-white/20 my-12 masked-text-reveal origin-left">
                <MaskedLine><div className="w-full h-full bg-white/40"></div></MaskedLine>
             </div>


            {/* Bottom Detailed Content - Slides up as you scroll */}
            <div ref={detailsRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 masked-text-reveal items-start opacity-80">
                
                {/* Left Block */}
                <div className="md:col-span-5 space-y-8">
                    <MaskedLine>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                        Identity is not a fixed point, but a continuous evolution shaped by reflection and social mirrors.
                        </p>
                    </MaskedLine>
                </div>

                {/* Right Block - Two Columns */}
                <div className="md:col-span-7 grid grid-cols-2 gap-8 font-mono text-sm tracking-wide text-white/70">
                    <div>
                         <MaskedLine className="border-b border-white/20 pb-2 mb-4 uppercase text-white">The "I" vs "Me"</MaskedLine>
                         <MaskedLine>
                            <p>Distinguishing between the active observer and the socialized self shapes how we perceive our place in the world.</p>
                        </MaskedLine>
                    </div>
                    <div>
                        <MaskedLine className="border-b border-white/20 pb-2 mb-4 uppercase text-white">The Twenty Statements</MaskedLine>
                        <MaskedLine>
                            <p>The test revealed that identity extends far beyond surface traits into deeply layered social constructs.</p>
                        </MaskedLine>
                    </div>
                </div>
            </div>

        </div>
      </div>

       {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 mix-blend-difference">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/80">Explore Module</p>
          <div className="h-12 w-px bg-white/50"></div>
        </div>
      </div>
    </section>
  );
};

export default Module1;
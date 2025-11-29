import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef(null);
  const titleRef = useRef(null);
  const imageContainerRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Title Sequence (Staggered Drop from Top)
      tl.from(".title-char", {
        y: -150,
        opacity: 0,
        rotateX: 90,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out"
      })

      // 2. The Face Reveal (The "Curtain" effect)
      // We animate the clip-path to open up the image from the center
      .fromTo(imageContainerRef.current, 
        { clipPath: "inset(50% 50% 50% 50%)", scale: 1.1, filter: "grayscale(100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "grayscale(0%)", duration: 1.5, ease: "expo.inOut" },
        "-=0.8"
      )

      // 3. Side Elements Slide In
      .from([leftSideRef.current, rightSideRef.current], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=1")

      // 4. Background Line Animation
      .to(overlayRef.current, {
        opacity: 0.4,
        duration: 2
      }, "-=1.5");

      // Scroll Parallax: The Text moves slower than the image creates depth
      gsap.to(imageContainerRef.current, {
        yPercent: 20, // Image moves down slightly
        scale: 1.05,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      gsap.to(titleRef.current, {
        yPercent: -50, // Title moves up faster
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, container);
    return () => ctx.revert();
  }, []);

  // Split title logic for animation
  const titleText = "SEBASTIAN MERDEGIA";
  const titleChars = titleText.split("").map((char, i) => (
    <span key={i} className="title-char inline-block origin-top">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section 
      ref={container} 
      className="relative h-screen w-full overflow-hidden bg-[#050505] text-[#e0e0e0]"
    >
      {/* --- BACKGROUND TEXTURE (Heavy Grain) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] z-30 mix-blend-overlay">
        <svg className='w-full h-full'>
            <filter id='noise'>
                <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>
            </filter>
            <rect width='100%' height='100%' filter='url(#noise)'/>
        </svg>
      </div>

      {/* --- DECORATIVE GRID LINES --- */}
      <div ref={overlayRef} className="absolute inset-0 z-0 opacity-0 flex justify-between px-4 md:px-20 pointer-events-none">
        <div className="w-px h-full bg-gradient-to-b from-white/0 via-white/10 to-white/0"></div>
        <div className="w-px h-full bg-gradient-to-b from-white/0 via-white/10 to-white/0"></div>
        <div className="w-px h-full bg-gradient-to-b from-white/0 via-white/10 to-white/0"></div>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between py-8 md:py-12 px-6">
        
        {/* TOP: THE NAME (Huge & Bold) */}
        <div ref={titleRef} className="w-full text-center z-20 mix-blend-difference">
          <h1 className="font-display text-[10vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter uppercase text-white">
            {titleChars}
          </h1>
        </div>

        {/* CENTER: THE IMAGE (Your Face) */}
        {/* We use absolute positioning to ensure it stays dead center regardless of text size */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[35vw] aspect-[3/4] z-10 pointer-events-none">
            
            {/* The Image Container with Reveal Effect */}
            <div ref={imageContainerRef} className="w-full h-full relative overflow-hidden bg-neutral-900 shadow-2xl shadow-black/80">
                {/* >>> REPLACE THE SRC BELOW WITH YOUR PHOTO <<< */}
                <img
                    src="/placeholder-hero-bg.png"
                    alt="Portrait"
                    className="w-full h-full object-cover opacity-90"
                />
                
                {/* Artistic "Vignette" Overlay on top of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* "Scanner" line animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30 blur-[2px] animate-[scan_4s_ease-in-out_infinite]"></div>
            </div>

            {/* Glowing "Aura" behind the image */}
            <div className="absolute -inset-10 bg-white/5 blur-[60px] -z-10 rounded-full"></div>
        </div>


        {/* SIDES & BOTTOM: ARTISTIC DETAILS (Filling the negative space) */}
        <div className="flex justify-between items-end w-full h-full pointer-events-none">
            
            {/* Left Side: Vertical Text */}
            <div ref={leftSideRef} className="hidden md:flex flex-col justify-end h-full pb-12">
                <div className="writing-vertical-lr rotate-180 text-xs font-mono tracking-[0.3em] text-neutral-500 flex items-center gap-4">
                    <span className="w-12 h-px bg-neutral-700"></span>
                    SAS 1 E2 — REFLECTION
                </div>
            </div>

            {/* Right Side: Data/Coordinates */}
            <div ref={rightSideRef} className="hidden md:flex flex-col justify-end h-full pb-12 text-right">
                <div className="font-mono text-xs text-neutral-400 space-y-1">
                    <p>LAT: 14.5995° N</p>
                    <p>LNG: 120.9842° E</p>
                    <p className="mt-4 text-white">EST. 2025</p>
                </div>
            </div>

        </div>

        {/* BOTTOM CENTER: Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference">
            <span className="text-[10px] uppercase tracking-[0.2em] animate-pulse">Scroll</span>
            <div className="w-px h-8 bg-white"></div>
        </div>

      </div>

      <style jsx>{`
        .writing-vertical-lr {
            writing-mode: vertical-lr;
        }
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
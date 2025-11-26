import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const container = useRef(null);
  const title = useRef(null);
  const subtitle = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Intro Animation - adjusted for top-left positioning
      const tl = gsap.timeline();
      tl.from(title.current, { x: -100, opacity: 0, duration: 1.5, ease: "power4.out", skewY: 7 })
        .from(subtitle.current, { x: -50, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");

      // Parallax on Scroll
      gsap.to(container.current, {
        backgroundPosition: `50% ${window.innerHeight / 2}px`,
        ease: "none",
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

  return (
    <section ref={container} className="relative h-screen flex flex-col overflow-hidden bg-neutral-900">
      {/* Placeholder for Hero BG - stylized as a darkened overlay */}
      <div className="absolute inset-0 opacity-40">
        <img src="placeholder-hero-bg.png" alt="Abstract Background" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 px-4 pt-8">
        <h1 ref={title} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-4 mix-blend-difference uppercase">
          Sebastian Merdegia
        </h1>
        <p ref={subtitle} className="font-body text-lg md:text-xl font-light tracking-widest uppercase text-neutral-400">
          SAS 1 E2 – Self and Society: A Reflection
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <span className="text-xs uppercase tracking-[0.3em]">Scroll to Explore</span>
      </div>
    </section>
  );
};

export default Hero;

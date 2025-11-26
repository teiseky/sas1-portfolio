import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Module3 = () => {
  const sectionRef = useRef(null);
  const imageReveal = useRef(null);
  const textContent = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1
        }
      });

      // Mask Reveal Animation
      tl.to(imageReveal.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power2.inOut"
      })
      .from(textContent.current, {
        y: 50,
        opacity: 0,
        duration: 0.5
      }, "-=0.5");

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-mod3-bg text-white relative flex items-center justify-center overflow-hidden">
      {/* Background Texture placeholder */}
      <div className="absolute inset-0 opacity-10 bg-[url('placeholder-texture.png')] bg-cover mix-blend-soft-light"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full h-full">

        {/* Image Side with Mask */}
        <div className="relative w-full h-[60vh] flex items-center justify-center">
            <div
                ref={imageReveal}
                className="w-full h-full absolute inset-0 bg-gray-800"
                style={{ clipPath: "inset(10% 10% 10% 10%)" }} // Initial State
            >
                <img src="placeholder-module3.jpg" alt="Culture" className="w-full h-full object-cover grayscale sepia hover:grayscale-0 transition-all duration-700" />
            </div>
        </div>

        {/* Text Side */}
        <div ref={textContent} className="relative z-10">
          <div className="w-12 h-1 bg-mod3-gold mb-6"></div>
          <h2 className="font-display text-5xl text-mod3-gold mb-8">Culture &<br/>Identity</h2>
          <p className="font-body text-lg leading-relaxed text-gray-200">
            Module 3 helped me understand that identity is inseparable from culture—its values, symbols, traditions, and even its unspoken expectations. By studying ethnocentrism and cultural relativism, I became more aware of how easily we judge practices outside our own cultural lens. Exploring ethnicity and personality made me realize how deeply my experiences as a Filipino influence the way I think, feel, and express myself. I learned that culture can shape personality, but individuals also negotiate with culture, choosing which parts to accept, modify, or challenge. This module pushed me to reflect on my own cultural identity with more openness, respect, and critical awareness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Module3;

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Module1 = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      // Animation: The content "peels" upwards and splits
      tl.to(cardRef.current, {
        y: -50,
        rotation: -5,
        scale: 0.9,
        opacity: 0.8,
        ease: "power1.inOut"
      })
      .from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5
      }, "<");

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-mod1-bg text-mod1-text flex items-center justify-center overflow-hidden relative">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Text Side */}
        <div ref={textRef} className="order-2 md:order-1 z-10">
          <span className="block text-sm font-bold tracking-widest uppercase mb-4 text-gray-400">Module 01</span>
          <h2 className="font-display text-5xl md:text-6xl mb-8 leading-tight">Layers of<br/>the Self</h2>
          <p className="font-body text-lg leading-relaxed opacity-80 max-w-md">
            Through Module 1, I learned that the self is far more layered than I initially thought. Exploring the Twenty Statements Test and the different categories of self-descriptions made me realize how my identity stretches across my physical traits, personal attributes, social roles, and even universal human experiences. Understanding concepts like self-concept, self-esteem, and the distinction between the "I" and the "Me" helped me see how my own thoughts interact with how society perceives me. This module taught me that who I am is not fixed—it is continuously shaped by reflection, relationships, and the various lenses through which I view myself and allow others to view me.

          </p>
        </div>

        {/* Visual Side - Layered Parallax */}
        <div className="order-1 md:order-2 relative flex justify-center">
          <div ref={cardRef} className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
             {/* Back Layer */}
             <div className="absolute inset-0 bg-gray-300 transform translate-x-4 translate-y-4"></div>
             {/* Main Image */}
             <img src="placeholder-module1.jpg" alt="Layers" className="absolute inset-0 w-full h-full object-cover shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module1;

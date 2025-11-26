import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Module2 = () => {
  const container = useRef(null);
  const linesRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Connect lines on scroll
      gsap.from(linesRef.current, {
        scaleX: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="min-h-screen bg-mod2-bg text-white relative py-20 flex flex-col justify-center">
      {/* Decorative Network Grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
         {[...Array(5)].map((_, i) => (
           <div
             key={i}
             ref={el => linesRef.current[i] = el}
             className="h-px bg-mod2-accent w-full absolute"
             style={{ top: `${(i + 1) * 20}%` }}
           />
         ))}
         <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-mod2-accent/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto border-l-2 border-mod2-accent pl-8 md:pl-16 py-10 backdrop-blur-sm">
            <span className="text-mod2-accent font-mono text-sm tracking-widest mb-2 block">MODULE 02 // NETWORK</span>
            <h2 className="font-display text-4xl md:text-6xl mb-6">Selfhood in Society</h2>

            <div className="flex flex-col md:flex-row gap-10">

                <p className="font-body text-lg text-gray-300 flex-1">
                  Module 2 deepened my understanding of selfhood by showing how identity is a fluid, ongoing process influenced by biology, society, history, and personal agency. Learning about eugenics and biological determinism made me more aware of how dangerous and limiting it is to reduce people to their genes. Mead and Cooley's ideas on the social self helped me realize how my identity emerges from the interactions, roles, and meanings I share with others.
                </p>

                <div className="flex-1">
                    <p className="font-body text-lg text-gray-300 mb-6">
                      I also reflected on how memory, time, and place shape who I am today. This module reminded me that selfhood is something I constantly negotiate—shaped by my social world, but also something I actively build through choices and reflection.
                    </p>
                    <img src="placeholder-module2.jpg" alt="Network" className="w-full h-48 object-cover rounded border border-mod2-accent/30 opacity-70 hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Module2;

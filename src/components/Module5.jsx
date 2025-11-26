import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Module5 = () => {
  const container = useRef(null);
  const heartRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(heartRef.current, {
        scale: 1.1,
        opacity: 1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="min-h-screen bg-mod5-bg text-mod5-text flex items-center justify-center py-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-200 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
            <div ref={heartRef} className="text-6xl mb-4 opacity-80">❤️</div>
            <h2 className="font-display text-5xl md:text-7xl font-bold">Values, Love, &<br/>Decision-Making</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
                <img src="placeholder-module5.jpg" alt="Values" className="w-full h-auto rounded-full aspect-square object-cover border-4 border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="md:col-span-8 font-body text-lg leading-relaxed space-y-6">
                <p>
                Module 5 allowed me to see how the values, principles, and ideologies I carry are not random but are shaped by the society and culture that raised me. Understanding Filipino values like <span className="font-bold italic">bahala na</span>, <span className="font-bold italic">hiya</span>, <span className="font-bold italic">utang na loob</span>, and <span className="font-bold italic">pakikipagkapwa</span> made me realize how these influence not just my decisions but also how I relate to others, especially in moments of conflict, affection, or pressure.
                </p>
                <p>
                The module's discussion on love reminded me that the feelings I experience—infatuation, attraction, commitment—have deeper psychological and social foundations. It also helped me reflect on how peer influence and risk-taking behaviors can push me toward either growth or harm depending on the choices I make. In the end, the biggest takeaway for me is that who I am is always connected to the people around me, and my decisions—big or small—are guided by the values I choose to uphold.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Module5;

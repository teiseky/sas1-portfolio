import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Module4 = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={container} className="relative py-32 bg-gradient-to-b from-mod4-start to-mod4-end text-white overflow-hidden">


        {/* Animated Background Blobs (Framer Motion) */}
        <motion.div

            style={{ y: y }}
            className="absolute top-10 right-0 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-screen blur-3xl opacity-30"
        />
        <motion.div

            style={{ scale: scale }}
            className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-screen blur-3xl opacity-30"
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div

                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="font-display text-5xl md:text-7xl mb-12 italic">Body, Gender, <br/>& Transition</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                         <img src="placeholder-module4.jpg" alt="Fluidity" className="w-full h-40 object-cover rounded-lg mb-6 opacity-80" />
                         <p className="font-body">
                         Module 4 helped me understand how deeply my sense of self is shaped by the way I view my own body, the transitions I go through, and the gendered expectations society places on me. Learning about body image made me realize that the insecurities I sometimes feel are not just personal struggles but are influenced by peers, culture, and media standards that have unconsciously shaped how I evaluate myself.
                         </p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-body text-lg mb-4">
                        At the same time, exploring rites of passage showed me that every stage of my growth is part of a cultural process that helps me redefine who I am becoming. Discussions on sex, gender, and sexuality also challenged me to look beyond stereotypes and appreciate the diversity that exists within people's identities and expressions. Overall, this module taught me to see my body and identity with more compassion and awareness.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
  );
};

export default Module4;

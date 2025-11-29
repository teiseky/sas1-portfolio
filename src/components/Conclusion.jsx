import React from 'react';
import { motion } from 'framer-motion';

const Conclusion = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants for staggered text reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delays each child animation
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom bezier for "smooth" feel
    },
  };

  return (
    <section className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col justify-center py-20">
      
      {/* --- ARTISTIC BACKGROUND ELEMENTS --- */}
      
      {/* 1. Grain/Noise Overlay for Texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-20 mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Ambient "Aura" Gradient Blob */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900 rounded-full blur-[100px] opacity-20"></div>

      {/* 3. Background Image (Subtle) */}
      <img 
        src="placeholder-conclusion.jpg" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale mix-blend-screen z-0" 
      />

      {/* --- MAIN CONTENT --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
      >

        {/* --- LEFT COLUMN: The Headline --- */}
        <div className="md:col-span-5 flex flex-col justify-between h-full">
          <motion.h2 
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl font-light tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500"
          >
            The Full<br />Circle.
          </motion.h2>
          
          <motion.div variants={itemVariants} className="hidden md:block w-12 h-[1px] bg-white/30 my-6"></motion.div>
          
          <motion.p variants={itemVariants} className="font-body text-lg text-gray-400 font-light italic">
            "Understanding the self is a journey that moves from within and extends outward."
          </motion.p>
        </div>

        {/* --- RIGHT COLUMN: The Deconstructed Narrative --- */}
        <div className="md:col-span-7 space-y-16 mt-8 md:mt-0">
          
          {/* Segment 1: The Layers */}
          <motion.div variants={itemVariants} className="border-l border-white/10 pl-8">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">01. The Layers</h3>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-gray-200">
              I learned that my identity is shaped not just by my thoughts and emotions, but also by my relationships, my culture, my body, and the values I grew up with. Each module showed me a different layer of who I am—how I see myself, how others influence me, and how society shapes my choices.
            </p>
          </motion.div>

          {/* Segment 2: The Evolution */}
          <motion.div variants={itemVariants} className="border-l border-white/10 pl-8">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">02. The Evolution</h3>
            <p className="font-body text-lg md:text-xl leading-relaxed text-gray-400">
              In the end, these lessons taught me that the self is never fixed; it evolves through reflection, interaction, and the courage to understand both my individuality and my connection to others.
            </p>
          </motion.div>

          {/* Action Area */}
          <motion.div variants={itemVariants} className="pt-8 flex flex-col md:flex-row items-center gap-6">
            <button
              onClick={scrollToTop}
              className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/20 hover:border-white/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="relative flex items-center gap-2 font-display text-sm uppercase tracking-widest group-hover:tracking-[0.25em] transition-all duration-500">
                Back to Top
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              </span>
            </button>
          </motion.div>

        </div>
      </motion.div>

      {/* Footer Minimalist */}
      <footer className="absolute bottom-6 w-full text-center text-gray-700 text-[10px] uppercase tracking-widest mix-blend-difference">
        &copy; 2023 Sebastian Merdegia &mdash; Self and Society
      </footer>
    </section>
  );
};

export default Conclusion;
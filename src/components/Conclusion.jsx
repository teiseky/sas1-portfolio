import React from 'react';
import { motion } from 'framer-motion';

const Conclusion = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-black text-white relative px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-80"></div>

      {/* Background Image Fade */}
      <img src="placeholder-conclusion.jpg" alt="Conclusion" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl"
      >
        <h2 className="font-display text-4xl mb-8">The Full Circle</h2>
        <p className="font-body text-lg md:text-xl leading-relaxed text-gray-300 mb-12">
        Looking back at all five modules, I realized that understanding the self is a journey that moves from within and extends outward into the world around me. I learned that my identity is shaped not just by my thoughts and emotions, but also by my relationships, my culture, my body, and the values I grew up with. Each module showed me a different layer of who I am—how I see myself, how others influence me, how society shapes my choices, and how culture and community guide my growth. In the end, these lessons taught me that the self is never fixed; it evolves through reflection, interaction, and the courage to understand both my individuality and my connection to others.
        </p>

        <button
            onClick={scrollToTop}
            className="px-8 py-4 border border-white text-white font-display hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm"
        >
            Back to Top
        </button>
      </motion.div>

      <footer className="absolute bottom-6 w-full text-center text-gray-600 text-xs">
        &copy; 2023 Sebastian Merdegia. Self and Society.
      </footer>
    </section>
  );
};

export default Conclusion;

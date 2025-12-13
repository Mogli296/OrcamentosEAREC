import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { cn } from '../../lib/utils';

interface MoodboardProps {
  images: string[];
}

const Moodboard: React.FC<MoodboardProps> = ({ images }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl mb-4 text-white">
            Visual Direction
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-400 max-w-2xl text-lg font-light">
            Uma abordagem estética baseada em alto contraste, granulação de filme 35mm e uma paleta de cores noturna e sofisticada.
          </motion.p>
        </motion.div>

        {/* Masonry Layout via Tailwind Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative break-inside-avoid group overflow-hidden rounded-sm"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={cn(
                "absolute inset-0 bg-black/60 z-10 transition-opacity duration-500",
                hoveredIndex === null ? "opacity-0" : hoveredIndex === index ? "opacity-0" : "opacity-70"
              )} />
              
              <img 
                src={src} 
                alt={`Moodboard ${index}`} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Border Effect */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Moodboard;
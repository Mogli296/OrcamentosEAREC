import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { cn } from '../../lib/utils';

interface MoodboardProps {
  images: string[];
}

const Moodboard: React.FC<MoodboardProps> = ({ images }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  
  // Hooks para o efeito Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transformações diferentes para cada coluna simular "troca de posição" relativa
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -100]); // Sobe rápido
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [0, 50]);   // Desce devagar
  const yColumn3 = useTransform(scrollYProgress, [0, 1], [0, -50]);  // Sobe devagar

  // Dividindo as imagens em 3 colunas para o layout masonry manual (compatível com parallax)
  const col1 = images.filter((_, i) => i % 3 === 0);
  const col2 = images.filter((_, i) => i % 3 === 1);
  const col3 = images.filter((_, i) => i % 3 === 2);

  const renderImage = (src: string, originalIndex: number) => (
    <motion.div
      key={originalIndex}
      className="relative group overflow-hidden rounded-sm mb-6"
      onMouseEnter={() => setHoveredIndex(originalIndex)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
        <div className={cn(
        "absolute inset-0 bg-black/60 z-10 transition-opacity duration-500",
        hoveredIndex === null ? "opacity-0" : hoveredIndex === originalIndex ? "opacity-0" : "opacity-70"
        )} />
        
        <img 
        src={src} 
        alt={`Moodboard ${originalIndex}`} 
        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Border Effect */}
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20" />
    </motion.div>
  );

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16 relative z-10"
        >
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl mb-4 text-white">
            Direção Audiovisual
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-400 max-w-2xl text-lg font-light">
            Projetos com identidades visuais marcantes e únicas, onde cada frame conta uma história inesquecível.
          </motion.p>
        </motion.div>

        {/* Parallax Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Coluna 1 */}
            <motion.div style={{ y: yColumn1 }}>
                {col1.map((src, i) => renderImage(src, i * 3))}
            </motion.div>

            {/* Coluna 2 */}
            <motion.div style={{ y: yColumn2 }} className="pt-12 md:pt-24">
                 {col2.map((src, i) => renderImage(src, i * 3 + 1))}
            </motion.div>

            {/* Coluna 3 */}
            <motion.div style={{ y: yColumn3 }} className="pt-6 md:pt-0">
                 {col3.map((src, i) => renderImage(src, i * 3 + 2))}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Moodboard;
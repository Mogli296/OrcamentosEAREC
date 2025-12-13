import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

// NOTE: We cannot import images directly in native ESM (browser) without a bundler loader.
// We reference the file by its serving path. 
// Ensure 'src/assets/logo.png' exists in your project structure.
const logoSrc = '/src/assets/logo.png'; 

interface LogoProps {
  className?: string; // Classes CSS extras para tamanho (w-*, h-*)
  animate?: boolean;  // Se true, anima a entrada da logo
}

/**
 * Componente de Logo
 * ------------------
 * Exibe a imagem da marca.
 * Para alterar o tamanho, passe classes via props (ex: className="w-32").
 */
const Logo: React.FC<LogoProps> = ({ className, animate = false }) => {
  
  // Configuração da animação (Framer Motion)
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  if (!animate) {
    return (
      <div className={cn("relative select-none", className)}>
        <img 
          src={logoSrc} 
          alt="EAREC Logo" 
          className="w-full h-auto object-contain"
          onError={(e) => {
            // Fallback visual caso a imagem não carregue
            console.warn("Logo image failed to load at", logoSrc);
            e.currentTarget.style.opacity = '0.5';
          }}
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={imageVariants}
      className={cn("relative select-none", className)}
    >
      <img 
        src={logoSrc} 
        alt="EAREC Logo" 
        className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        onError={(e) => {
           console.warn("Logo image failed to load at", logoSrc);
        }}
      />
    </motion.div>
  );
};

export default Logo;
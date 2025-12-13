import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, animate = false }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const circle: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 10 } }
  };

  if (!animate) {
    return (
      <div className={cn("flex items-center tracking-tighter font-sans select-none", className)}>
        <span className="font-bold text-neutral-100">EA</span>
        <div className="w-[0.4em] h-[0.4em] bg-[#DC2626] rounded-full mx-[0.05em] translate-y-[-0.3em]" />
        <span className="font-light text-[#DC2626]">REC</span>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("flex items-center tracking-tighter font-sans select-none", className)}
    >
      <motion.span variants={item} className="font-bold text-neutral-100">EA</motion.span>
      <motion.div 
        variants={circle}
        className="w-[0.4em] h-[0.4em] bg-[#DC2626] rounded-full mx-[0.05em] translate-y-[-0.3em]" 
      />
      <motion.span variants={item} className="font-light text-[#DC2626]">REC</motion.span>
    </motion.div>
  );
};

export default Logo;
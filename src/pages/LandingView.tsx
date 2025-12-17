
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import { fadeInUp, staggerContainer } from '../lib/animations';

interface LandingViewProps {
  onNext: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onNext }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-950 relative overflow-hidden px-6">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black z-0" />
      
      {/* Elementos de fundo animados */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-DEFAULT/5 rounded-full blur-[120px] pointer-events-none" 
      />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-lg text-center"
      >
        <motion.div variants={fadeInUp} className="mb-12">
           <Logo className="w-64 md:w-80" animate />
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-12 space-y-2">
            <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                Audiovisual Experience
            </h1>
            <p className="text-neutral-500 text-sm md:text-base font-light">
                Descubra o orçamento ideal para o seu projeto.
            </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
            <Button 
                onClick={onNext}
                size="lg"
                className="group px-12 py-4 text-lg tracking-widest bg-white/5 border-white/10 hover:bg-brand-DEFAULT hover:border-brand-DEFAULT transition-all duration-500"
            >
                <span className="flex items-center gap-3">
                    CONTINUAR 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
            </Button>
        </motion.div>

      </motion.div>

      {/* Footer discreto */}
      <div className="absolute bottom-8 left-0 w-full text-center">
        <p className="text-[10px] text-neutral-600 uppercase tracking-[0.3em]">
            EAREC Cinematic Systems
        </p>
      </div>
    </div>
  );
};

export default LandingView;

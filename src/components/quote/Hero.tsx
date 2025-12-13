import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, fadeInUp, scaleIn } from '../../lib/animations';
import { QuoteData } from '../../types';
import Logo from '../ui/Logo';

interface HeroProps {
  data: QuoteData; // Recebe os dados do orçamento (incluindo nome do cliente)
}

/**
 * Componente Hero
 * ---------------
 * A "capa" da proposta. Deve ser impactante.
 * Exibe a imagem de fundo, o logo e a saudação personalizada.
 */
const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      
      {/* BACKGROUND CINEMATOGRÁFICO */}
      <motion.div 
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0"
      >
        {/* Overlay Escuro para garantir leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/70 to-neutral-950 z-10" />
        
        {/* Imagem de Fundo (Altere a URL abaixo para mudar a imagem da capa) */}
        <img 
          src="https://picsum.photos/id/42/1920/1080" 
          alt="Cinematic Background" 
          className="w-full h-full object-cover opacity-60 grayscale-[30%]"
        />
      </motion.div>

      {/* CONTEÚDO CENTRAL */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-6 max-w-5xl"
      >
        {/* Logo EAREC */}
        <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            {/* Ajuste 'w-64' ou 'w-80' para mudar tamanho da logo */}
            <Logo className="w-64 md:w-96" />
        </motion.div>
        
        {/* Linha Divisória Vermelha (Brand Color) */}
        <motion.div variants={fadeInUp} className="w-16 h-1 bg-brand-DEFAULT mx-auto my-8 shadow-[0_0_15px_#DC2626]" />

        {/* Saudação Personalizada */}
        <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl text-white font-light mb-4 tracking-wide leading-tight">
          Olá, <span className="font-semibold">{data.client.name}</span>.
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            Aqui começa a materialização do seu projeto em <span className="text-white font-medium">{data.client.location}</span>.
            <br className="hidden md:block"/> Esta proposta foi desenhada exclusivamente para você.
        </motion.p>
      </motion.div>

      {/* Indicador de Scroll (Seta pulando) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-white/50 uppercase">Deslize para configurar</span>
        <ChevronDown className="text-white/70 animate-bounce" size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
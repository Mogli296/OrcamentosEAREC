import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, User, Smartphone, Lock } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import { ClientData } from '../types';
import { fadeInUp, staggerContainer } from '../lib/animations';

interface WelcomeViewProps {
  onStart: (data: ClientData) => void;
  onAdminClick: () => void;
}

/**
 * Tela de Boas-Vindas (Landing Page)
 */
const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart, onAdminClick }) => {
  const [formData, setFormData] = useState<ClientData>({
    name: '',
    location: '',
    date: '',
    contact: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.contact) {
      onStart(formData);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-950 relative overflow-hidden px-6">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-DEFAULT/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Botão Admin (Discreto no canto superior direito) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        onClick={onAdminClick}
        className="absolute top-6 right-6 z-50 text-white p-2"
        title="Área Administrativa"
      >
        <Lock size={16} />
      </motion.button>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-12">
          <Logo className="w-64 md:w-80" animate />
        </div>

        <motion.form 
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl"
        >
          <div className="space-y-2">
            <h2 className="text-xl text-white font-medium text-center mb-6">Iniciar Novo Projeto</h2>
          </div>

          <div className="space-y-5">
            <div className="group relative">
              <User className="absolute left-0 top-3 text-neutral-500 group-focus-within:text-brand-DEFAULT transition-colors" size={20} />
              <input 
                type="text" 
                name="name"
                required
                placeholder="Seu Nome ou Empresa"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 pl-8 text-white focus:outline-none focus:border-brand-DEFAULT transition-colors placeholder:text-neutral-600"
              />
            </div>

            <div className="group relative">
              <MapPin className="absolute left-0 top-3 text-neutral-500 group-focus-within:text-brand-DEFAULT transition-colors" size={20} />
              <input 
                type="text" 
                name="location"
                placeholder="Cidade / Local do Evento"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 pl-8 text-white focus:outline-none focus:border-brand-DEFAULT transition-colors placeholder:text-neutral-600"
              />
            </div>

            <div className="group relative">
              <Calendar className="absolute left-0 top-3 text-neutral-500 group-focus-within:text-brand-DEFAULT transition-colors" size={20} />
              <input 
                type="date" 
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                style={{ colorScheme: 'dark' }}
                className="w-full bg-transparent border-b border-white/20 py-3 pl-8 text-white focus:outline-none focus:border-brand-DEFAULT transition-colors placeholder:text-neutral-600 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>

            <div className="group relative">
              <Smartphone className="absolute left-0 top-3 text-neutral-500 group-focus-within:text-brand-DEFAULT transition-colors" size={20} />
              <input 
                type="text" 
                name="contact"
                required
                placeholder="Whatsapp ou Email"
                value={formData.contact}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 pl-8 text-white focus:outline-none focus:border-brand-DEFAULT transition-colors placeholder:text-neutral-600"
              />
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <Button className="w-full group" size="lg">
              <span className="mr-2">Visualizar Orçamento</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.form>

        <motion.p variants={fadeInUp} className="text-center text-neutral-600 text-sm mt-8">
          Experiência Audiovisual High-End
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeView;
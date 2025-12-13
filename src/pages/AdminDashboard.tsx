import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Save, ArrowLeft, DollarSign, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';
import { QuoteData } from '../types';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { formatCurrency } from '../lib/utils';

interface AdminDashboardProps {
  currentConfig: QuoteData;
  onUpdateConfig: (newConfig: QuoteData) => void;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentConfig, onUpdateConfig, onExit }) => {
  // Estado de Autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Estado do Formulário de Edição
  const [formData, setFormData] = useState({
    basePrice: currentConfig.basePrice,
    studioFee: currentConfig.studioFee,
    photoUnitPrice: currentConfig.photoUnitPrice,
    videoUnitPrice: currentConfig.videoUnitPrice,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'xingu') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Acesso negado. Senha incorreta.');
      setPassword('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSave = () => {
    onUpdateConfig({
      ...currentConfig,
      ...formData
    });
    alert('Configurações salvas com sucesso!');
  };

  // TELA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black z-0" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 w-full max-w-sm bg-neutral-900/50 border border-white/5 p-8 rounded-2xl backdrop-blur-xl"
        >
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-brand-DEFAULT/10 rounded-full text-brand-DEFAULT">
              <Lock size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-serif text-white text-center mb-2">Acesso Restrito</h2>
          <p className="text-neutral-500 text-center text-sm mb-8">Área exclusiva para administradores.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <input 
                type="password" 
                placeholder="Senha Mestre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-DEFAULT focus:outline-none transition-colors"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs pl-1">{error}</p>}
            </div>
            
            <div className="flex gap-3 pt-2">
               <Button 
                type="button" 
                variant="secondary" 
                className="w-1/3"
                onClick={onExit}
               >
                 Voltar
               </Button>
               <Button type="submit" className="w-2/3">
                 Entrar
               </Button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // TELA DE DASHBOARD
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/5 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="w-24" />
            <span className="h-6 w-px bg-white/10" />
            <span className="text-sm font-medium text-neutral-400">Admin Dashboard</span>
          </div>
          <button 
            onClick={onExit}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-6">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif mb-2">Configuração de Preços</h1>
              <p className="text-neutral-400">Ajuste os valores base utilizados no cálculo automático dos orçamentos.</p>
            </div>
            <div className="p-3 bg-brand-DEFAULT/10 rounded-lg text-brand-DEFAULT">
              <DollarSign size={24} />
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-8 space-y-8">
            
            {/* Base Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-white/5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preço Base (Mobilização)</label>
                <p className="text-xs text-neutral-500">Valor mínimo para saída da equipe. Incluído em todos os orçamentos.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-neutral-500">R$</span>
                <input 
                  type="number" 
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-950 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-DEFAULT focus:outline-none"
                />
              </div>
            </div>

            {/* Studio Fee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-white/5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Taxa de Estúdio</label>
                <p className="text-xs text-neutral-500">Adicional cobrado quando o cliente seleciona "Estúdio Controlado".</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-neutral-500">R$</span>
                <input 
                  type="number" 
                  name="studioFee"
                  value={formData.studioFee}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-950 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-DEFAULT focus:outline-none"
                />
              </div>
            </div>

            {/* Photo Unit Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-white/5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preço por Foto</label>
                <p className="text-xs text-neutral-500">Valor unitário por fotografia tratada.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-neutral-500">R$</span>
                <input 
                  type="number" 
                  name="photoUnitPrice"
                  value={formData.photoUnitPrice}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-950 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-DEFAULT focus:outline-none"
                />
              </div>
            </div>

            {/* Video Unit Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preço por Vídeo</label>
                <p className="text-xs text-neutral-500">Valor unitário por vídeo (1 min).</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-neutral-500">R$</span>
                <input 
                  type="number" 
                  name="videoUnitPrice"
                  value={formData.videoUnitPrice}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-950 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-DEFAULT focus:outline-none"
                />
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="secondary" onClick={onExit}>
              Cancelar e Sair
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save size={18} />
              Salvar Alterações
            </Button>
          </div>

          {/* Preview Rápido */}
          <div className="mt-12 p-6 bg-brand-DEFAULT/5 border border-brand-DEFAULT/10 rounded-lg">
            <h3 className="text-sm font-medium text-brand-DEFAULT mb-4">Simulação Atual</h3>
            <div className="flex justify-between text-sm text-neutral-400">
              <span>Orçamento Básico (Externo + 20 Fotos + 1 Vídeo):</span>
              <strong className="text-white">
                {formatCurrency(formData.basePrice + (20 * formData.photoUnitPrice) + (1 * formData.videoUnitPrice))}
              </strong>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
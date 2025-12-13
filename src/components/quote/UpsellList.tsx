import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Video, 
  MapPin, 
  Home, 
  Briefcase, 
  GlassWater, 
  Megaphone, 
  Sparkles,
  CheckCircle2,
  Minus,
  Plus
} from 'lucide-react';
import { QuoteData, OccasionType, LocationType } from '../../types';
import { formatCurrency, cn } from '../../lib/utils';
import { fadeInUp, staggerContainer } from '../../lib/animations';

// Tipagem das Props recebidas do componente pai (QuoteView)
interface ConfiguratorProps {
  data: QuoteData; // Dados base de preços
  occasion: OccasionType; // Estado atual da ocasião
  setOccasion: (o: OccasionType) => void;
  location: LocationType; // Estado atual do local
  setLocation: (l: LocationType) => void;
  photoQty: number; // Quantidade de fotos
  setPhotoQty: (n: number) => void;
  videoQty: number; // Quantidade de vídeos
  setVideoQty: (n: number) => void;
}

/**
 * Componente Configurador (UpsellList)
 * ------------------------------------
 * O coração da venda. Aqui o cliente interage com os parâmetros
 * que alteram o preço final.
 */
const UpsellList: React.FC<ConfiguratorProps> = ({ 
  data,
  occasion, setOccasion,
  location, setLocation,
  photoQty, setPhotoQty,
  videoQty, setVideoQty
}) => {

  // CONFIGURAÇÃO DAS OCASIÕES
  // Para adicionar uma nova ocasião, adicione um objeto aqui e atualize o tipo OccasionType.
  const occasions = [
    { id: 'institutional', label: 'Institucional', icon: Briefcase, desc: 'Corporativo & Marca' },
    { id: 'advertising', label: 'Publicidade', icon: Megaphone, desc: 'Comercial & Vendas' },
    { id: 'fashion', label: 'Fashion', icon: Sparkles, desc: 'Editorial & Style' },
    { id: 'social', label: 'Social', icon: GlassWater, desc: 'Eventos & Gala' },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-neutral-900/30 border-y border-white/5 relative overflow-hidden">
      {/* Background Decorativo (Luzes de fundo) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-DEFAULT/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-20 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl text-white mb-2">Configure sua Produção</motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-400">Personalize o escopo para atender às necessidades do projeto.</motion.p>
        </motion.div>

        {/* 1. SELEÇÃO DE OCASIÃO (Grid de botões) */}
        <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold border-l-2 border-brand-DEFAULT pl-3">
                01. Ocasião do Projeto
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {occasions.map((occ) => {
                    const isActive = occasion === occ.id;
                    const Icon = occ.icon;
                    return (
                        <motion.button
                            key={occ.id}
                            onClick={() => setOccasion(occ.id as OccasionType)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "flex flex-col items-center justify-center p-6 rounded-lg border transition-all duration-300",
                                isActive 
                                    ? "bg-brand-DEFAULT text-white border-brand-DEFAULT shadow-[0_0_20px_rgba(220,38,38,0.3)]" 
                                    : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon size={24} className="mb-3" />
                            <span className="font-serif text-lg font-medium">{occ.label}</span>
                            <span className="text-xs opacity-60 mt-1">{occ.desc}</span>
                        </motion.button>
                    )
                })}
            </div>
        </div>

        {/* 2. SELEÇÃO DE LOCAL (Cards grandes) */}
        <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold border-l-2 border-brand-DEFAULT pl-3">
                02. Ambiente & Logística
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    onClick={() => setLocation('external')}
                    className={cn(
                        "cursor-pointer p-6 rounded-lg border flex items-center gap-6 transition-all duration-300",
                        location === 'external'
                            ? "bg-gradient-to-r from-neutral-900 to-neutral-800 border-brand-DEFAULT/50 ring-1 ring-brand-DEFAULT"
                            : "bg-neutral-950 border-white/10 hover:border-white/20"
                    )}
                >
                    <div className={cn("p-4 rounded-full", location === 'external' ? "bg-brand-DEFAULT text-white" : "bg-white/10 text-neutral-400")}>
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-serif text-white">Locação Externa</h4>
                        <p className="text-sm text-neutral-400 mt-1">Luz natural e cenários reais. Ideal para lifestyle.</p>
                        <span className="text-xs text-brand-DEFAULT mt-2 block font-medium">Incluso no pacote base</span>
                    </div>
                </motion.div>

                <motion.div
                    onClick={() => setLocation('studio')}
                    className={cn(
                        "cursor-pointer p-6 rounded-lg border flex items-center gap-6 transition-all duration-300",
                        location === 'studio'
                            ? "bg-gradient-to-r from-neutral-900 to-neutral-800 border-brand-DEFAULT/50 ring-1 ring-brand-DEFAULT"
                            : "bg-neutral-950 border-white/10 hover:border-white/20"
                    )}
                >
                    <div className={cn("p-4 rounded-full", location === 'studio' ? "bg-brand-DEFAULT text-white" : "bg-white/10 text-neutral-400")}>
                        <Home size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-serif text-white">Estúdio Controlado</h4>
                        <p className="text-sm text-neutral-400 mt-1">Fundo infinito, iluminação de cinema e estrutura completa.</p>
                        {/* Exibe o preço extra vindo do mock.ts */}
                        <span className="text-xs text-white/60 mt-2 block font-medium">+ {formatCurrency(data.studioFee)} (Taxa de Locação)</span>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* 3. ENTREGÁVEIS (Contadores +/-) */}
        <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold border-l-2 border-brand-DEFAULT pl-3">
                03. Volume de Entregáveis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/20 p-8 rounded-2xl border border-white/5">
                {/* Contador de Fotos */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-4 text-white">
                        <Camera className="text-brand-DEFAULT" />
                        <span className="font-serif text-xl">Fotografias (Tratadas)</span>
                    </div>
                    <div className="flex items-center gap-6 bg-neutral-950 p-2 rounded-full border border-white/10">
                        <button 
                            onClick={() => setPhotoQty(Math.max(0, photoQty - 5))}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="text-3xl font-mono w-16 text-center text-white">{photoQty}</span>
                        <button 
                            onClick={() => setPhotoQty(photoQty + 5)}
                            className="w-10 h-10 rounded-full bg-brand-DEFAULT hover:bg-red-600 flex items-center justify-center text-white transition-colors shadow-lg shadow-brand-DEFAULT/20"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <p className="mt-3 text-sm text-neutral-500">{formatCurrency(data.photoUnitPrice)} / unidade</p>
                </div>

                {/* Contador de Vídeos */}
                <div className="flex flex-col items-center md:border-l md:border-white/10">
                    <div className="flex items-center gap-3 mb-4 text-white">
                        <Video className="text-brand-DEFAULT" />
                        <span className="font-serif text-xl">Vídeos (1 min)</span>
                    </div>
                    <div className="flex items-center gap-6 bg-neutral-950 p-2 rounded-full border border-white/10">
                        <button 
                            onClick={() => setVideoQty(Math.max(0, videoQty - 1))}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="text-3xl font-mono w-16 text-center text-white">{videoQty}</span>
                        <button 
                            onClick={() => setVideoQty(videoQty + 1)}
                            className="w-10 h-10 rounded-full bg-brand-DEFAULT hover:bg-red-600 flex items-center justify-center text-white transition-colors shadow-lg shadow-brand-DEFAULT/20"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <p className="mt-3 text-sm text-neutral-500">{formatCurrency(data.videoUnitPrice)} / vídeo</p>
                </div>
            </div>
        </div>

        {/* 4. ITENS INCLUSOS (Estática) */}
        <div className="bg-white/5 rounded-lg p-8 border border-white/5">
            <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-3">
                <Sparkles className="text-brand-DEFAULT" size={20} />
                Incluso na Experiência
            </h3>
            <div className="space-y-4">
                {data.items.filter(i => i.isIncluded).map((item, idx) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded bg-neutral-950/50 border border-white/5"
                    >
                        <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={18} />
                        <div>
                            <div className="flex items-center gap-3">
                                <h4 className="text-white font-medium">{item.title}</h4>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-DEFAULT bg-brand-DEFAULT/10 px-2 py-0.5 rounded">
                                    INCLUSO
                                </span>
                            </div>
                            <p className="text-sm text-neutral-400 mt-1">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default UpsellList;
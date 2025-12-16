
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Video, MapPin, Gift, Crown, GraduationCap, Heart, 
  Store, Building2, Aperture, Plane, Clock, Zap, Minus, Plus, Route, Star, Info, X, MessageCircle
} from 'lucide-react';
import { formatCurrency, cn } from '../../lib/utils';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { ServiceCategory, ServiceId } from '../../types';
import Button from '../ui/Button';

interface UpsellListProps {
  category: ServiceCategory;
  setCategory: (c: ServiceCategory) => void;
  serviceId: ServiceId;
  setServiceId: (s: ServiceId) => void;
  hours: number;
  setHours: (h: number) => void;
  qty: number;
  setQty: (q: number) => void;
  addDrone: boolean;
  setAddDrone: (b: boolean) => void;
  addRealTime: boolean;
  setAddRealTime: (b: boolean) => void;
  distance: number;
  pricePerKm: number;
  locationClient: string;
}

const UpsellList: React.FC<UpsellListProps> = ({ 
  category, setCategory,
  serviceId, setServiceId,
  hours, setHours,
  qty, setQty,
  addDrone, setAddDrone,
  addRealTime, setAddRealTime,
  distance,
  pricePerKm,
  locationClient
}) => {

  const categories = [
    { id: 'social', label: 'Eventos Sociais', icon: Crown },
    { id: 'commercial', label: 'Comercial', icon: Store },
    { id: 'studio', label: 'Estúdio', icon: Aperture },
    { id: 'video_production', label: 'Produção', icon: Video },
    { id: 'custom', label: 'Personalizado', icon: Star, highlight: true },
  ];

  // Cálculo de custo de deslocamento (Zero se for Estúdio ou Custom)
  const isNoTravelCost = category === 'studio' || category === 'custom';
  const travelCost = isNoTravelCost ? 0 : distance * 2 * pricePerKm;

  const whatsappNumber = "5584981048857";

  return (
    <section id="configurator" className="py-12 px-4 md:px-8 bg-neutral-900/30 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* 1. SELEÇÃO DE CATEGORIA (TABS) */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-neutral-950/50 p-2 rounded-xl border border-white/5">
            {categories.map((cat) => {
                const isActive = category === cat.id;
                const Icon = cat.icon;
                return (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id as ServiceCategory)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-3 rounded-lg transition-all text-sm md:text-base font-medium",
                            isActive 
                                ? "bg-brand-DEFAULT text-white shadow-lg shadow-brand-DEFAULT/20" 
                                : "text-neutral-400 hover:text-white hover:bg-white/5",
                            // Destaque visual para "Personalizado"
                            cat.highlight && !isActive && "text-brand-DEFAULT hover:bg-brand-DEFAULT/10 border border-brand-DEFAULT/20"
                        )}
                    >
                        <Icon size={18} />
                        {cat.label}
                    </button>
                )
            })}
        </div>

        <motion.div 
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* 2. OPÇÕES ESPECÍFICAS DA CATEGORIA */}
            
            {/* === SOCIAL === */}
            {category === 'social' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ServiceCard 
                        active={serviceId === 'birthday'} onClick={() => setServiceId('birthday')}
                        icon={Gift} title="Aniversário / Chá" price="R$ 400 (2h)"
                        desc="Cobertura completa dos parabéns e decoração."
                        details="Inclui 2 horas de cobertura fotográfica. Todas as fotos tratadas entregues via link. Valor de hora extra aplicável. Ideal para Chá Revelação, Mesversário e Aniversários intimistas."
                    />
                    <ServiceCard 
                        active={serviceId === 'fifteen'} onClick={() => setServiceId('fifteen')}
                        icon={Crown} title="15 Anos" price="R$ 400 (2h)"
                        desc="Registro especial do debut."
                        details="Foco na debutante, recepção e valsa. Inclui 2 horas de cobertura base. Fotos ilimitadas durante o período contratado com tratamento de cor profissional."
                    />
                    <ServiceCard 
                        active={serviceId === 'graduation'} onClick={() => setServiceId('graduation')}
                        icon={GraduationCap} title="Formatura" price="R$ 800 (Fixo)"
                        details="Cobertura do evento de colação ou baile. Valor fechado para o evento (sem limite rígido de horas, cobrindo os momentos principais). Entrega digital em alta resolução."
                    />
                    <ServiceCard 
                        active={serviceId === 'wedding_base'} onClick={() => setServiceId('wedding_base')}
                        icon={Heart} title="Casamento (Base)" price="R$ 650"
                        desc="Cerimônia + Decoração + Convidados"
                        details="Cobertura essencial do casamento. Inclui fotos protocolares, decoração, cerimônia religiosa/civil e fotos com padrinhos e convidados."
                    />
                    
                    {/* Pacotes de Casamento */}
                    <div className="md:col-span-2 pt-4">
                        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3 ml-1">Pacotes de Casamento</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <ServiceCard 
                                active={serviceId === 'wedding_classic'} onClick={() => setServiceId('wedding_classic')}
                                title="Clássico" price="R$ 900"
                                desc="Pré-Wedding + Casamento"
                                details="O pacote essencial. Inclui ensaio Pré-Wedding (externo) e a cobertura completa do evento de Casamento (Cerimônia e Recepção)."
                                highlight
                            />
                            <ServiceCard 
                                active={serviceId === 'wedding_romance'} onClick={() => setServiceId('wedding_romance')}
                                title="Romance" price="R$ 1.150"
                                desc="Pré + Making Off + Casamento"
                                details="Pacote intermediário. Acrescenta a cobertura do Making Of da noiva/noivo, capturando a emoção da preparação, além do Pré-Wedding e Casamento."
                                highlight
                            />
                            <ServiceCard 
                                active={serviceId === 'wedding_essence'} onClick={() => setServiceId('wedding_essence')}
                                title="Essência" price="R$ 1.750"
                                desc="Pré + MkOff + Casamento + Vídeo"
                                details="A experiência completa EAREC. Tudo do pacote Romance + cobertura de VÍDEO cinematográfico do grande dia (Highlight/Melhores Momentos)."
                                highlight
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* === COMMERCIAL === */}
            {category === 'commercial' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ServiceCard 
                        active={serviceId === 'comm_photo'} onClick={() => setServiceId('comm_photo')}
                        icon={Camera} title="Fotografia" price="R$ 20 / foto"
                        desc="Para lojas e gastronomia."
                        details="Valor por foto tratada. Ideal para e-commerce, cardápios e lookbooks."
                    />
                    <ServiceCard 
                        active={serviceId === 'comm_video'} onClick={() => setServiceId('comm_video')}
                        icon={Video} title="Vídeo" price="R$ 500"
                        desc="Captação + Edição (até 1min)."
                        details="Produção de vídeo institucional ou promocional (Reels/TikTok) de até 1 minuto."
                    />
                    <ServiceCard 
                        active={serviceId === 'comm_combo'} onClick={() => setServiceId('comm_combo')}
                        icon={Zap} title="Combo Visual" price="Vídeo + Fotos"
                        desc="Foto + Vídeo (até 1min)"
                        details="O pacote completo para redes sociais. Inclui a produção do vídeo comercial E as fotos dos produtos/espaço. Selecione a quantidade de fotos desejada abaixo."
                        highlight
                    />
                </div>
            )}

            {/* === STUDIO === */}
            {category === 'studio' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ServiceCard 
                        active={serviceId === 'studio_photo'} onClick={() => setServiceId('studio_photo')}
                        icon={Camera} title="Ensaio em Estúdio" price="R$ 25 / foto"
                        details="Sessão fotográfica em ambiente controlado. Iluminação profissional. Valor por foto escolhida e tratada (Skin retouch incluso)."
                    />
                    <ServiceCard 
                        active={serviceId === 'studio_video'} onClick={() => setServiceId('studio_video')}
                        icon={Video} title="Vídeo em Estúdio" price="R$ 350 (2h)"
                        details="Gravação de conteúdo em estúdio (ex: Cursos, Youtube, Entrevistas). Valor referente a diária de 2 horas de estúdio com operador."
                    />
                </div>
            )}

            {/* === VIDEO PRODUCTION === */}
            {category === 'video_production' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ServiceCard 
                        active={serviceId === 'edit_only'} onClick={() => setServiceId('edit_only')}
                        icon={Zap} title="Apenas Edição" price="R$ 250 / vídeo"
                        details="Você envia o material bruto, nós editamos. Cortes, transições, correção de cor e sound design."
                    />
                    <ServiceCard 
                        active={serviceId === 'cam_cap'} onClick={() => setServiceId('cam_cap')}
                        icon={Video} title="Captação Câmera" price="R$ 350"
                        details="Operador de câmera profissional com equipamento de cinema (4K). Valor por serviço/diária (até 6h)."
                    />
                    <ServiceCard 
                        active={serviceId === 'mobile_cap'} onClick={() => setServiceId('mobile_cap')}
                        icon={SmartphoneIcon} title="Captação Celular" price="R$ 250"
                        details="Captação ágil com iPhone de última geração. Ideal para bastidores e conteúdo nativo para Stories/TikTok."
                    />
                    <ServiceCard 
                        active={serviceId === 'drone'} onClick={() => setServiceId('drone')}
                        icon={Plane} title="Drone" price="R$ 250"
                        details="Imagens aéreas em 4K. Inclui 2 baterias de voo. Operador licenciado."
                    />
                </div>
            )}

            {/* === CUSTOM (SEMPRE DISPONÍVEL) - DESIGN SUTIL === */}
            {category === 'custom' && (
                <div className="bg-white/5 border border-white/10 p-8 rounded-xl text-center group transition-colors hover:border-white/20">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Star size={48} className="text-red-600 mx-auto mb-4 fill-red-600/20" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-serif text-neutral-200 mb-2">Orçamento Personalizado</h3>
                    <p className="text-neutral-500 mb-6 max-w-lg mx-auto text-sm">
                        Projetos únicos exigem soluções sob medida. Fale diretamente com nossa equipe criativa.
                    </p>
                    
                    <a 
                        href={`https://wa.me/${whatsappNumber}?text=Olá, gostaria de um orçamento personalizado.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-full transition-colors font-medium text-sm border border-white/10"
                    >
                        <MessageCircle size={16} />
                        Fale conosco clicando aqui
                    </a>
                </div>
            )}


            {/* 3. CONFIGURAÇÕES ADICIONAIS (CONDICIONAIS) */}
            
            {/* Seletor de HORAS (Só para Birthday e 15 anos) */}
            {(serviceId === 'birthday' || serviceId === 'fifteen') && category === 'social' && (
                <div className="bg-white/5 p-8 rounded-xl border border-white/10 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-white mb-6">
                        <Clock className="text-brand-DEFAULT" />
                        <span className="font-serif text-xl">Duração do Evento</span>
                    </div>
                    
                    {/* Número Grande em Destaque */}
                    <span className="text-7xl font-sans font-bold text-white mb-2 tracking-tighter">
                        {hours}<span className="text-2xl text-neutral-500 ml-1 font-normal">h</span>
                    </span>
                    <p className="text-sm text-neutral-400 mb-8">Tempo total de cobertura</p>

                    <div className="flex items-center gap-6 w-full max-w-xs">
                        <button onClick={() => setHours(Math.max(2, hours - 1))} className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Minus size={24} /></button>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-DEFAULT transition-all" style={{ width: `${(hours / 10) * 100}%` }} />
                        </div>
                        <button onClick={() => setHours(hours + 1)} className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Plus size={24} /></button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-6 bg-black/30 px-3 py-1 rounded-full">Incluso 2h base. +R$ 250/h extra.</p>
                </div>
            )}

            {/* Seletor de QUANTIDADE (Comercial: Foto/Combo, Estúdio: Foto, Produção: Edição) */}
            {(
                (category === 'commercial' && (serviceId === 'comm_photo' || serviceId === 'comm_combo')) || 
                serviceId === 'studio_photo' || 
                serviceId === 'edit_only'
             ) && (
                <div className="bg-white/5 p-8 rounded-xl border border-white/10 flex flex-col items-center shadow-2xl">
                    <div className="flex items-center gap-2 text-white mb-6">
                        <Camera className="text-brand-DEFAULT" />
                        <span className="font-serif text-xl">Quantidade de {serviceId === 'edit_only' ? 'Vídeos' : 'Fotos'}</span>
                    </div>
                    
                    {/* Número Gigante Centralizado */}
                    <div className="relative mb-8">
                        <span className="text-8xl font-sans font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {qty}
                        </span>
                        <span className="absolute -right-8 top-2 text-lg text-neutral-500 font-medium">und</span>
                    </div>

                    <div className="flex items-center gap-8 w-full max-w-sm">
                        <button 
                            onClick={() => setQty(Math.max(1, qty - 5))} 
                            className="w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-brand-DEFAULT hover:border-brand-DEFAULT transition-all group"
                        >
                            <Minus size={24} className="text-neutral-400 group-hover:text-white" />
                        </button>
                        
                        <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div 
                                layout 
                                className="h-full bg-gradient-to-r from-brand-DEFAULT/50 to-brand-DEFAULT" 
                                style={{ width: `${Math.min(100, (qty / 100) * 100)}%` }} 
                            />
                        </div>

                        <button 
                            onClick={() => setQty(qty + 5)} 
                            className="w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-brand-DEFAULT hover:border-brand-DEFAULT transition-all group"
                        >
                            <Plus size={24} className="text-neutral-400 group-hover:text-white" />
                        </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-6">Ajuste de 5 em 5 unidades.</p>
                </div>
            )}

            {/* ADICIONAIS (Checkboxes) - Social Only */}
            {category === 'social' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                        onClick={() => setAddRealTime(!addRealTime)}
                        className={cn("cursor-pointer p-4 rounded-lg border flex items-center gap-4 transition-all", addRealTime ? "bg-brand-DEFAULT/20 border-brand-DEFAULT" : "bg-white/5 border-white/10")}
                    >
                        <div className={cn("w-6 h-6 rounded border flex items-center justify-center", addRealTime ? "bg-brand-DEFAULT border-brand-DEFAULT" : "border-white/50")}>
                           {addRealTime && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                            <p className="text-white font-medium">Fotos Real Time (+ R$ 600)</p>
                            <p className="text-xs text-neutral-400">Entrega imediata durante o evento.</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => setAddDrone(!addDrone)}
                        className={cn("cursor-pointer p-4 rounded-lg border flex items-center gap-4 transition-all", addDrone ? "bg-brand-DEFAULT/20 border-brand-DEFAULT" : "bg-white/5 border-white/10")}
                    >
                        <div className={cn("w-6 h-6 rounded border flex items-center justify-center", addDrone ? "bg-brand-DEFAULT border-brand-DEFAULT" : "border-white/50")}>
                           {addDrone && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                            <p className="text-white font-medium">Imagens de Drone (+ R$ 250)</p>
                            <p className="text-xs text-neutral-400">Perspectivas aéreas cinematográficas.</p>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>

        {/* LOGÍSTICA (Compacta) */}
        {!isNoTravelCost && (
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-full"><Route size={20} className="text-brand-DEFAULT" /></div>
                    <div>
                        <p className="text-xs text-neutral-500 uppercase">Destino</p>
                        <p className="text-white font-medium">{locationClient} <span className="text-neutral-500 text-sm">({distance} km)</span></p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-neutral-500 uppercase">Taxa de Deslocamento</p>
                    <p className="text-xl text-white font-mono">{travelCost > 0 ? formatCurrency(travelCost) : "Grátis"}</p>
                </div>
            </div>
        )}
        
        {isNoTravelCost && category !== 'custom' && (
             <div className="border-t border-white/10 pt-8 text-center">
                <span className="text-xs text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    Deslocamento Gratuito (Estúdio)
                </span>
             </div>
        )}

      </div>
    </section>
  );
};

// Componente Auxiliar de Card com EXPANSÃO DE DETALHES e ANIMAÇÃO DE ÍCONE
const ServiceCard = ({ active, onClick, icon: Icon, title, price, desc, details, highlight }: any) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div 
            onClick={onClick}
            className={cn(
                "cursor-pointer p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group flex flex-col h-full justify-between",
                active 
                    ? "bg-gradient-to-br from-neutral-800 to-neutral-900 border-brand-DEFAULT shadow-lg shadow-brand-DEFAULT/10" 
                    : "bg-white/5 border-white/10 hover:bg-white/10",
                highlight && active && "ring-1 ring-brand-DEFAULT"
            )}
        >
            {active && <div className="absolute top-0 right-0 w-16 h-16 bg-brand-DEFAULT/20 blur-xl rounded-full -mr-8 -mt-8 pointer-events-none" />}
            
            <div>
                <div className="flex items-start justify-between mb-3">
                    {Icon && (
                        <motion.div
                            animate={active ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Icon size={24} className={cn("mb-2", active ? "text-brand-DEFAULT" : "text-neutral-400")} />
                        </motion.div>
                    )}
                    <div className="flex items-center gap-2">
                        {/* Botão de Info */}
                        {details && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetails(!showDetails);
                                }}
                                className="text-neutral-500 hover:text-white transition-colors p-1 z-10"
                                title="Ver detalhes"
                            >
                                <Info size={16} />
                            </button>
                        )}
                        {active && <div className="w-2 h-2 bg-brand-DEFAULT rounded-full" />}
                    </div>
                </div>
                <h4 className={cn("font-serif text-lg leading-tight mb-1", active ? "text-white" : "text-neutral-300")}>{title}</h4>
                {desc && <p className="text-xs text-neutral-500 mb-2">{desc}</p>}
            </div>

            <p className={cn("text-sm font-medium mt-2", active ? "text-brand-DEFAULT" : "text-white/60")}>{price}</p>

            {/* Painel de Detalhes Expandível */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 mt-3 border-t border-white/10 text-xs text-neutral-300 leading-relaxed bg-black/20 -mx-5 -mb-5 p-5">
                             <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-white uppercase tracking-wider text-[10px]">O que está incluso:</span>
                                <button onClick={(e) => { e.stopPropagation(); setShowDetails(false); }}><X size={12} /></button>
                             </div>
                             {details}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Ícone auxiliar
const SmartphoneIcon = ({ size, className }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);

export default UpsellList;


import React, { useState, useMemo, useEffect } from 'react';
import Hero from '../components/quote/Hero';
import UpsellList from '../components/quote/UpsellList';
import StickyFooter from '../components/quote/StickyFooter';
import SignatureModal from '../components/quote/SignatureModal';
import SummaryView from './SummaryView';
import SuccessView from './SuccessView';
import { formatCurrency } from '../lib/utils';
import { calculateDistance } from '../lib/maps';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ClientData, QuoteData, ServiceCategory, ServiceId } from '../types';
import { ChevronDown } from 'lucide-react';

interface QuoteViewProps {
  clientData: ClientData;
  config: QuoteData;
}

type ViewState = 'config' | 'summary' | 'success';

// === TABELA DE PREÇOS ===
const PRICING_TABLE = {
    social: {
        birthday: { base: 400, hoursIncluded: 2, hourPrice: 250, label: "Chá Revelação / Aniversário" },
        fifteen: { base: 400, hoursIncluded: 2, hourPrice: 250, label: "15 Anos" },
        graduation: { base: 800, label: "Formatura" },
        wedding_base: { base: 650, label: "Casamento (Base)" },
        wedding_classic: { base: 900, label: "Pacote Clássico (Pre + Casamento)" },
        wedding_romance: { base: 1150, label: "Pacote Romance (Pre + MkOff + Casamento)" },
        wedding_essence: { base: 1750, label: "Pacote Essência (Completo + Vídeo)" },
        realtime: { fixed: 600, label: "Fotos Real Time" }
    },
    commercial: {
        photo: { unit: 20, label: "Comércio (Fotos)" },
        video: { fixed: 500, label: "Comércio (Vídeo)" },
        combo: { videoBase: 500, photoUnit: 20, label: "Comércio (Foto + Vídeo)" }
    },
    studio: {
        photo: { unit: 25, label: "Estúdio (Fotos)" },
        video: { fixed: 350, label: "Estúdio (Vídeo 2h)" },
    },
    video_production: {
        edit: { unit: 250, label: "Apenas Edição" },
        cam_cap: { fixed: 350, label: "Captação Câmera" },
        mobile_cap: { fixed: 250, label: "Captação Celular" },
        drone: { fixed: 250, label: "Drone (Imagens Aéreas)" }
    },
    custom: {
        custom_project: { base: 0, label: "Projeto Personalizado" } // Preço sob consulta
    }
};

const QuoteView: React.FC<QuoteViewProps> = ({ clientData, config }) => {
  const [viewState, setViewState] = useState<ViewState>('config');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [showFooter, setShowFooter] = useState(true);

  const quoteData: QuoteData = useMemo(() => ({
    ...config,
    client: { ...config.client, ...clientData, projectTitle: `Project: ${clientData.name}` }
  }), [clientData, config]);

  // === ESTADOS DO CONFIGURADOR ===
  const [category, setCategory] = useState<ServiceCategory>('social');
  const [serviceId, setServiceId] = useState<ServiceId>('birthday');
  
  // Variáveis Quantitativas
  const [hours, setHours] = useState<number>(2);
  const [qty, setQty] = useState<number>(10);
  
  // Adicionais
  const [addDrone, setAddDrone] = useState(false);
  const [addRealTime, setAddRealTime] = useState(false);

  // Logística
  const [distance, setDistance] = useState<number>(0); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const updateDistance = async () => {
        if (clientData.location) {
            const dist = await calculateDistance(clientData.location);
            if (isMounted) setDistance(dist);
        }
    };
    updateDistance();
    return () => { isMounted = false; };
  }, [clientData.location]);

  // === MOTOR DE CÁLCULO DE PREÇO ===
  const totalPrice = useMemo(() => {
    let total = 0;

    // 1. Cálculo do Serviço Principal
    if (category === 'social') {
        const s = PRICING_TABLE.social;
        switch (serviceId) {
            case 'birthday':
            case 'fifteen':
                total += s.birthday.base;
                if (hours > s.birthday.hoursIncluded) {
                    total += (hours - s.birthday.hoursIncluded) * s.birthday.hourPrice;
                }
                break;
            case 'graduation': total += s.graduation.base; break;
            case 'wedding_base': total += s.wedding_base.base; break;
            case 'wedding_classic': total += s.wedding_classic.base; break;
            case 'wedding_romance': total += s.wedding_romance.base; break;
            case 'wedding_essence': total += s.wedding_essence.base; break;
        }
        if (addRealTime) total += s.realtime.fixed;
    } 
    else if (category === 'commercial') {
        if (serviceId === 'comm_photo') total += qty * PRICING_TABLE.commercial.photo.unit;
        if (serviceId === 'comm_video') total += PRICING_TABLE.commercial.video.fixed;
        if (serviceId === 'comm_combo') {
            // Combo: Preço do Vídeo Base + (Quantidade de fotos * Preço unitário da foto)
            total += PRICING_TABLE.commercial.combo.videoBase + (qty * PRICING_TABLE.commercial.combo.photoUnit);
        }
    }
    else if (category === 'studio') {
        if (serviceId === 'studio_photo') total += qty * PRICING_TABLE.studio.photo.unit;
        if (serviceId === 'studio_video') total += PRICING_TABLE.studio.video.fixed;
    }
    else if (category === 'video_production') {
        if (serviceId === 'edit_only') total += qty * PRICING_TABLE.video_production.edit.unit;
        if (serviceId === 'cam_cap') total += PRICING_TABLE.video_production.cam_cap.fixed;
        if (serviceId === 'mobile_cap') total += PRICING_TABLE.video_production.mobile_cap.fixed;
        if (serviceId === 'drone') total += PRICING_TABLE.video_production.drone.fixed;
    }
    else if (category === 'custom') {
        total += PRICING_TABLE.custom.custom_project.base;
    }

    // 2. Adicionais Globais
    if (addDrone && category !== 'video_production' && category !== 'custom') { 
         total += PRICING_TABLE.video_production.drone.fixed; 
    }

    // 3. Logística
    // REGRA: Estúdio e Custom não cobram deslocamento automático
    if (distance > 0 && category !== 'studio' && category !== 'custom') {
        total += (distance * 2 * quoteData.pricePerKm);
    }

    return total;
  }, [category, serviceId, hours, qty, addDrone, addRealTime, distance, quoteData.pricePerKm]);

  // Resetar estados ao trocar de categoria
  useEffect(() => {
      if (category === 'social') setServiceId('birthday');
      if (category === 'commercial') setServiceId('comm_photo');
      if (category === 'studio') setServiceId('studio_photo');
      if (category === 'video_production') setServiceId('edit_only');
      if (category === 'custom') setServiceId('custom_project');
      
      setHours(2);
      setQty(10);
      setAddRealTime(false);
  }, [category]);

  const handleSignatureSuccess = (signatureData: string) => {
    setIsModalOpen(false);
    setIsApproved(true);
    setViewState('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => { window.location.reload(); };

  // Objeto de detalhes para passar para o SuccessView
  let label = 'Serviço Personalizado';
  if (category === 'social') label = PRICING_TABLE.social[serviceId as keyof typeof PRICING_TABLE.social]?.label || label;
  if (category === 'commercial') {
      if (serviceId === 'comm_combo') label = PRICING_TABLE.commercial.combo.label;
      else label = PRICING_TABLE.commercial[serviceId as keyof typeof PRICING_TABLE.commercial]?.label || label;
  }
  if (category === 'studio') label = PRICING_TABLE.studio[serviceId as keyof typeof PRICING_TABLE.studio]?.label || label;
  if (category === 'video_production') label = PRICING_TABLE.video_production[serviceId as keyof typeof PRICING_TABLE.video_production]?.label || label;

  const quoteDetails = {
    occasion: category === 'custom' ? 'custom' : (category as any),
    customOccasionText: label,
    location: (category === 'studio' ? 'studio' : 'external'),
    photoQty: (category === 'studio' || (category === 'commercial' && serviceId === 'comm_photo') || (category === 'commercial' && serviceId === 'comm_combo')) ? qty : 0,
    videoQty: (category === 'video_production' && serviceId === 'edit_only') ? qty : 
              ((category === 'commercial' && (serviceId === 'comm_video' || serviceId === 'comm_combo'))) ? 1 : 0,
    distance
  };

  if (viewState === 'success') {
      return (
        <SuccessView 
            onReset={handleReset} 
            clientData={clientData}
            totalPrice={totalPrice}
            quoteDetails={quoteDetails as any}
        />
      );
  }

  return (
    <div className="relative">
      <div className="block pb-40">
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-brand-DEFAULT z-50 origin-left shadow-[0_0_15px_#DC2626]"
            style={{ scaleX }}
          />

          <Hero data={quoteData} />
          
          <div className="relative z-10">
            <UpsellList 
              category={category} setCategory={setCategory}
              serviceId={serviceId} setServiceId={setServiceId}
              hours={hours} setHours={setHours}
              qty={qty} setQty={setQty}
              addDrone={addDrone} setAddDrone={setAddDrone}
              addRealTime={addRealTime} setAddRealTime={setAddRealTime}
              distance={distance}
              pricePerKm={quoteData.pricePerKm}
              locationClient={clientData.location}
            />
          </div>

          <AnimatePresence>
            {showFooter && (
                <StickyFooter 
                    totalPrice={totalPrice} 
                    onApprove={() => setViewState('summary')} 
                    isApproved={isApproved}
                    highlight={true} 
                />
            )}
          </AnimatePresence>
      </div>

      <AnimatePresence>
         {viewState === 'summary' && (
            <SummaryView 
                clientData={clientData}
                quoteData={quoteData}
                totalPrice={totalPrice}
                onBack={() => setViewState('config')}
                onProceedToSign={() => setIsModalOpen(true)}
            />
         )}
      </AnimatePresence>

      <SignatureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSignatureSuccess}
        totalValue={formatCurrency(totalPrice)}
      />
    </div>
  );
};

export default QuoteView;

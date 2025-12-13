import React, { useState, useMemo, useEffect } from 'react';
import Hero from '../components/quote/Hero';
import Moodboard from '../components/quote/Moodboard';
import UpsellList from '../components/quote/UpsellList';
import StickyFooter from '../components/quote/StickyFooter';
import SignatureModal from '../components/quote/SignatureModal';
import { mockQuote } from '../data/mock';
import { formatCurrency } from '../lib/utils';
import { motion } from 'framer-motion';
import { OccasionType, LocationType, ClientData, QuoteData } from '../types';

interface QuoteViewProps {
  clientData: ClientData;
}

const QuoteView: React.FC<QuoteViewProps> = ({ clientData }) => {
  // Merge dos dados do cliente com o Mock (Template)
  const quoteData: QuoteData = useMemo(() => ({
    ...mockQuote,
    client: {
        ...mockQuote.client,
        ...clientData,
        projectTitle: `Project: ${clientData.name}`
    }
  }), [clientData]);

  // Estados do Configurador
  const [occasion, setOccasion] = useState<OccasionType>('advertising');
  const [location, setLocation] = useState<LocationType>('external');
  const [photoQty, setPhotoQty] = useState<number>(20); 
  const [videoQty, setVideoQty] = useState<number>(1); 
  
  // Controle do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  // Cálculo reativo do preço total
  const totalPrice = useMemo(() => {
    let total = quoteData.basePrice;

    if (location === 'studio') {
      total += quoteData.studioFee;
    }

    total += (photoQty * quoteData.photoUnitPrice);
    total += (videoQty * quoteData.videoUnitPrice);

    return total;
  }, [location, photoQty, videoQty, quoteData]);

  const handleSignatureSuccess = (signatureData: string) => {
    console.log("Signature captured:", signatureData);
    setIsModalOpen(false);
    setIsApproved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper para formatar data corrigindo Timezone (Evita que caia no dia anterior)
  const formatDateSafe = (dateString: string) => {
    if (!dateString) return 'A definir';
    // Adiciona meio-dia para evitar problemas de UTC-3 (Brasil) virando dia anterior
    const date = new Date(`${dateString}T12:00:00`);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="pb-32 relative">
      <Hero data={quoteData} />
      
      <div className="relative z-10">
        
        {/* Intro Text / Letter */}
        <section className="py-20 px-6 max-w-3xl mx-auto text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-serif text-2xl italic text-neutral-400 leading-relaxed"
            >
              "Cada frame importa. Para o projeto de <span className="text-white not-italic">{clientData.name}</span>, traremos uma estética cinematográfica única, onde a técnica serve à emoção."
            </motion.p>
            <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-white/20"></div>
                <span className="text-xs uppercase tracking-widest text-white/50">EAREC Creative</span>
                <div className="h-px w-12 bg-white/20"></div>
            </div>
        </section>

        <Moodboard images={quoteData.moodboardImages} />
        
        {/* Novo Configurador */}
        <UpsellList 
          data={quoteData}
          occasion={occasion}
          setOccasion={setOccasion}
          location={location}
          setLocation={setLocation}
          photoQty={photoQty}
          setPhotoQty={setPhotoQty}
          videoQty={videoQty}
          setVideoQty={setVideoQty}
        />
        
        {/* Technical Details */}
        <section className="py-20 px-6 border-t border-white/5 bg-neutral-950">
           <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-neutral-500 text-sm">
              <div>
                  <h5 className="text-white mb-2 font-medium">Data Alvo</h5>
                  <p>{formatDateSafe(clientData.date)}</p>
                  <p>Produção: 1 Diária</p>
                  <p>Contato: {clientData.contact}</p>
              </div>
              <div>
                  <h5 className="text-white mb-2 font-medium">Entrega</h5>
                  <p>Link Privado</p>
                  <p>Alta Resolução</p>
                  <p>Backup Cloud</p>
              </div>
              <div>
                  <h5 className="text-white mb-2 font-medium">Direitos</h5>
                  <p>Uso Comercial</p>
                  <p>Redes Sociais</p>
              </div>
              <div>
                  <h5 className="text-white mb-2 font-medium">Pagamento</h5>
                  <p>50% Reserva</p>
                  <p>50% Entrega</p>
              </div>
           </div>
        </section>

      </div>

      <StickyFooter 
        totalPrice={totalPrice} 
        onApprove={() => setIsModalOpen(true)}
        isApproved={isApproved}
      />

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
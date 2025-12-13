import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuoteView from './src/pages/QuoteView';
import WelcomeView from './src/pages/WelcomeView';
import AdminDashboard from './src/pages/AdminDashboard';
import Loading from './src/components/ui/Loading';
import { ClientData, QuoteData } from './src/types';
import { mockQuote } from './src/data/mock';
import { delay } from './src/lib/utils';

type ViewState = 'welcome' | 'quote' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('welcome');
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado Global da Configuração (Preços, etc).
  // Inicializado com o mock, mas pode ser alterado pelo Admin.
  const [config, setConfig] = useState<QuoteData>(mockQuote);

  const handleStart = async (data: ClientData) => {
    setClientData(data);
    
    // Inicia transição de carregamento cinematográfica
    setIsLoading(true);
    await delay(2000); // 2 segundos para o cliente apreciar o loading
    setIsLoading(false);
    
    setView('quote');
    window.scrollTo(0, 0);
  };

  const handleAdminUpdate = (newConfig: QuoteData) => {
    setConfig(newConfig);
  };

  return (
    <main className="w-full min-h-screen bg-neutral-950 text-neutral-100 selection:bg-brand-DEFAULT selection:text-white overflow-x-hidden font-sans">
      
      {/* Loading Overlay com AnimatePresence para saída suave */}
      <AnimatePresence>
        {isLoading && <Loading key="loader" />}
      </AnimatePresence>

      {/* Gerenciamento de Visualização */}
      {!isLoading && (
        <>
          {view === 'welcome' && (
            <WelcomeView 
              onStart={handleStart} 
              onAdminClick={() => setView('admin')} 
            />
          )}

          {view === 'quote' && clientData && (
            <QuoteView 
              clientData={clientData} 
              config={config} 
            />
          )}

          {view === 'admin' && (
            <AdminDashboard 
              currentConfig={config}
              onUpdateConfig={handleAdminUpdate}
              onExit={() => setView('welcome')}
            />
          )}
        </>
      )}
    </main>
  );
};

export default App;
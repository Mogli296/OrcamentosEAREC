import React, { useState } from 'react';
import QuoteView from './src/pages/QuoteView';
import WelcomeView from './src/pages/WelcomeView';
import { ClientData } from './src/types';

const App: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'quote'>('welcome');
  const [clientData, setClientData] = useState<ClientData | null>(null);

  const handleStart = (data: ClientData) => {
    setClientData(data);
    setView('quote');
    window.scrollTo(0, 0);
  };

  return (
    <main className="w-full min-h-screen bg-neutral-950 text-neutral-100 selection:bg-brand-DEFAULT selection:text-white overflow-x-hidden font-sans">
      {view === 'welcome' && <WelcomeView onStart={handleStart} />}
      {view === 'quote' && clientData && <QuoteView clientData={clientData} />}
    </main>
  );
};

export default App;
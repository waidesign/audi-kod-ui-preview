import React, { useState } from 'react';
import { Agentation } from "agentation";
import Header from './components/Header';
import Hero from './components/Hero';
import WhatIsSticker from './components/WhatIsSticker';
import Benefits from './components/Benefits';
import WhatInformation from './components/WhatInformation';
import HowToGet from './components/HowToGet';
import WhereToFindVIN from './components/WhereToFindVIN';
import HowToReadVIN from './components/HowToReadVIN';
import VinCharacterBreakdown from './components/VinCharacterBreakdown';
import WhyChooseUs from './components/WhyChooseUs';
import PopularModels from './components/PopularModels';
import RecentlySearched from './components/RecentlySearched';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import VinLocationModal from './components/VinLocationModal';
import SampleStickerModal from './components/SampleStickerModal';
import AuthPage from './components/AuthPage';
import MsrpByVinPage from './components/MsrpByVinPage';
import { AppView } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isVinModalOpen, setIsVinModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let content;
  if (currentView === 'login' || currentView === 'signup') {
    content = (
      <AuthPage 
        initialMode={currentView} 
        onNavigate={handleNavigate} 
      />
    );
  } else {
    content = (
      <div className="min-h-screen bg-brand-white text-brand-black flex flex-col font-sans">
        <Header 
          currentView={currentView} 
          onNavigate={handleNavigate} 
          onOpenSampleModal={() => setIsSampleModalOpen(true)}
        />
        
        <main className="flex-1">
          {currentView === 'msrp' ? (
            <MsrpByVinPage 
              onOpenVinModal={() => setIsVinModalOpen(true)} 
              onOpenSampleModal={() => setIsSampleModalOpen(true)}
              onNavigate={handleNavigate}
            />
          ) : (
            <>
              <Hero 
                onOpenVinModal={() => setIsVinModalOpen(true)} 
                onOpenSampleModal={() => setIsSampleModalOpen(true)}
              />
              <WhatIsSticker />
              <Benefits />
              <WhatInformation />
              <HowToGet onOpenVinModal={() => setIsVinModalOpen(true)} />
              <WhereToFindVIN />
              <HowToReadVIN />
              <VinCharacterBreakdown />
              <WhyChooseUs />
              <RecentlySearched />
              <PopularModels />
              <FAQ />
              <FinalCTA 
                onOpenVinModal={() => setIsVinModalOpen(true)} 
                onOpenSampleModal={() => setIsSampleModalOpen(true)}
              />
            </>
          )}
        </main>

        <Footer onNavigate={handleNavigate} />
        <VinLocationModal isOpen={isVinModalOpen} onClose={() => setIsVinModalOpen(false)} />
        <SampleStickerModal isOpen={isSampleModalOpen} onClose={() => setIsSampleModalOpen(false)} />
      </div>
    );
  }

  return (
    <>
      {content}
      {process.env.NODE_ENV === 'development' && <Agentation />}
    </>
  );
}


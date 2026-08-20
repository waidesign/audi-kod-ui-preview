import { useState } from 'react';
import { Search, Info, HelpCircle, ChevronDown, Calendar, Database, ShieldCheck, FileDown } from 'lucide-react';
import SearchWidget from './SearchWidget';

interface HeroProps {
  onOpenVinModal?: () => void;
  onOpenSampleModal?: () => void;
}

export default function Hero({ onOpenVinModal, onOpenSampleModal }: HeroProps) {
  return (
    <section className="pt-20 pb-16 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Hero Copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-grey-50 border border-grey-200 rounded-sm text-xs font-bold uppercase tracking-wider text-brand-black mb-6">
            <div className="w-2 h-2 bg-brand-red"></div>
            Live Database Connected
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            <span className="text-brand-black">Original Factory Data.</span><br />
            <span className="text-brand-red">Any Audi.</span>
          </h1>
          <p className="text-lg md:text-xl text-grey-700 max-w-lg mx-auto lg:mx-0">
            Instantly retrieve the factory window sticker (Monroney label) by VIN, license plate, or year/make/model.
          </p>
        </div>

        {/* Search Box */}
        <SearchWidget 
          onOpenVinModal={onOpenVinModal} 
          onOpenSampleModal={onOpenSampleModal}
          className="w-full lg:w-[540px] xl:w-[600px] lg:mx-0 lg:ml-auto" 
        />
      </div>
      
      {/* Trust & Features Bar */}
      <div className="max-w-[1440px] mx-auto mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-grey-200 border border-grey-200 rounded-sm overflow-hidden">
          {[
            { title: 'Up to 2026 Models', desc: 'Covers latest production schedules', icon: Calendar },
            { title: 'Classic & Heritage', desc: 'Deep heritage chassis logs (1989+)', icon: Database },
            { title: 'NHTSA Safety Star', desc: 'Federal rating database synced', icon: ShieldCheck },
            { title: 'Downloadable PDF', desc: 'High-resolution, vector replicas', icon: FileDown },
          ].map((fact, i) => (
            <div key={i} className="bg-brand-white p-6 hover:bg-grey-50 transition-colors group cursor-default">
              <div className="flex items-center gap-3 mb-3">
                <fact.icon className="w-5 h-5 text-brand-red group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black">{fact.title}</h4>
              </div>
              <p className="text-sm text-grey-600 leading-tight">{fact.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

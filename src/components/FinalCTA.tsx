import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import SearchWidget from './SearchWidget';
import audiCtaBg from '../assets/images/audi_cta_background_1787236545498.jpg';

interface FinalCTAProps {
  onOpenVinModal?: () => void;
  onOpenSampleModal?: () => void;
}

export default function FinalCTA({ onOpenVinModal, onOpenSampleModal }: FinalCTAProps) {
  return (
    <section className="py-24 px-6 bg-brand-white border-t border-grey-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-brand-black rounded-sm overflow-hidden flex flex-col lg:flex-row relative border border-grey-800 shadow-2xl">
          
          {/* Audi Car Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={audiCtaBg} 
              alt="Audi Performance Vehicle" 
              className="w-full h-full object-cover object-center scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Reduced Opacity Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/85 via-brand-black/60 to-brand-black/70 backdrop-blur-[0.5px]"></div>
          </div>

          {/* Subtle red accent ambient glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/15 to-transparent pointer-events-none hidden lg:block z-[1]"></div>

          {/* Left Content (Text) */}
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red text-white text-[11px] font-black uppercase rounded-xs tracking-wider mb-4 w-fit shadow-xs">
              Official Monroney Decoder
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-white mb-6 leading-tight drop-shadow-sm">
              Lookup any Audi Window Sticker to Confirm the Original Details
            </h2>
            <p className="text-lg text-grey-300 leading-relaxed mb-8 drop-shadow-xs font-normal">
              Verify any Audi's original MSRP, factory-installed options, packages, colors, fuel economy, standard equipment, and safety features. Enter the VIN to get accurate factory information.
            </p>
            
            <ul className="space-y-3 mb-10 lg:mb-0">
              {['Instant PDF Download', '100% Accurate Factory Data', 'Available for all modern & classic Audis'].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-grey-200 font-medium">
                  <CheckCircle2 size={18} className="text-brand-red shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content (Input area) */}
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-10">
            <div className="w-full max-w-[540px] mx-auto">
              <SearchWidget 
                onOpenVinModal={onOpenVinModal}
                onOpenSampleModal={onOpenSampleModal}
                className="w-full shadow-2xl" 
              />
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-grey-300">
                <ShieldCheck size={16} className="text-brand-red" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

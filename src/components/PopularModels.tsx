import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const popularModels = [
  "A3", "A4", "A6", "Q5", "Q7",
  "Q8", "e-tron", "S4", "RS5", "TT"
];

export default function PopularModels() {
  return (
    <section className="py-24 px-6 bg-brand-white border-t border-grey-100">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* Left Intro */}
        <div className="lg:w-4/12 sticky top-24">
          <div className="w-12 h-1 bg-brand-red mb-8"></div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black mb-6 leading-tight">
            Get Window Stickers for Popular Audi Models
          </h2>
          <p className="text-lg text-grey-600 leading-relaxed">
            Our Audi window sticker lookup tool provides window stickers for every Audi model, whether classic or modern. This includes:
          </p>
        </div>

        {/* Right Grid */}
        <div className="lg:w-8/12 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {popularModels.map((model, idx) => (
            <a 
              key={idx}
              href={`#model-${model.toLowerCase().replace(/\s+/g, '-')}`}
              className="group block relative p-6 md:p-8 bg-grey-50 border border-grey-200 rounded-sm hover:border-brand-red transition-all cursor-pointer overflow-hidden"
            >
              {/* Animated hover background */}
              <div className="absolute inset-0 bg-brand-red translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-grey-500 group-hover:text-brand-white/80 transition-colors">
                    Audi
                  </span>
                  <ArrowUpRight size={20} className="text-grey-400 group-hover:text-brand-white transition-colors" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-brand-black group-hover:text-brand-white transition-colors">
                  {model}
                </h3>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { CheckCircle2, Zap, Car, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    icon: CheckCircle2,
    title: "100% Accurate Data",
    desc: "We match your VIN to factory build records, so the options, packages, colors, and MSRP are correct. No guessing, no forum myths."
  },
  {
    icon: Zap,
    title: "Instant Window Sticker Lookup",
    desc: "Type the VIN to access the window sticker in seconds. No waiting around for manual generation."
  },
  {
    icon: Car,
    title: "Support All Audi Models",
    desc: "We have stickers for all Audi vehicles, from A3 to RS Q8, plus e-tron lines. We also support classic Audis such as the TT Mk1 and early A4/A6."
  },
  {
    icon: ShieldCheck,
    title: "Easy Checkout Process",
    desc: "Clear steps, secure payment, instant access. No hidden hoops. If you can buy a coffee online, you can get your sticker and download the PDF right away."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 bg-brand-black text-brand-white">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Intro */}
        <div className="lg:w-5/12 w-full">
          <div className="w-12 h-1 bg-brand-red mb-8"></div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Why Choose Our Audi Window Sticker Tool?
          </h2>
          <p className="text-lg text-grey-400 leading-relaxed mb-8">
            Below is an extra-detailed reason why you should choose us to generate your official Audi Window Sticker. We prioritize speed, accuracy, and ease of use above all else.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-black bg-grey-800 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-grey-700 opacity-50"></div>
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-white">Trusted by thousands</span>
              <br />
              <span className="text-grey-500">of Audi owners & dealers</span>
            </div>
          </div>
        </div>
        
        {/* Right Column: Bento Grid */}
        <div className="lg:w-7/12 w-full">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div 
                  key={idx} 
                  className="relative bg-grey-900 border border-grey-800 p-8 rounded-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-black/50 border border-grey-800 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-brand-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">
                    {reason.title}
                  </h3>
                  
                  <p className="text-grey-400 leading-relaxed text-sm">
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

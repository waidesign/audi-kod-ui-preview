import { FileText, CheckCircle2, ChevronRight } from 'lucide-react';

const cards = [
  { title: 'Original MSRP', desc: 'See the exact base price and destination charge.' },
  { title: 'Factory Options', desc: 'Identify individual add-ons versus dealer installations.' },
  { title: 'Packages', desc: 'Full breakdown of Prestige, Premium Plus, and S line.' },
  { title: 'Mechanical Specs', desc: 'Engine code, transmission, and drivetrain details.' },
  { title: 'Exterior & Interior', desc: 'Official paint colors, wheel specs, and cabin tech.' },
  { title: 'Efficiency & Safety', desc: 'EPA fuel economy, emissions, and NHTSA ratings.' },
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-grey-50 border-y border-grey-100">
      <div className="max-w-[1440px] mx-auto space-y-24">
        
        {/* Factory Grid */}
        <div>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-black mb-3">See how your Audi left the factory</h2>
            <p className="text-grey-700">Everything printed on the original Monroney label.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, i) => (
              <div key={i} className="group bg-brand-white border border-grey-200 rounded-sm p-6 hover:border-grey-900 transition-colors relative overflow-hidden cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-red scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"></div>
                <h3 className="font-semibold text-brand-black mb-2">{card.title}</h3>
                <p className="text-sm text-grey-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Preview Split */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-brand-white border border-grey-200 rounded-sm p-8 shadow-sm flex items-center justify-center aspect-[3/4] relative overflow-hidden">
            {/* Visual representation of a window sticker */}
            <div className="absolute inset-0 border-[8px] border-brand-white shadow-[inset_0_0_0_1px_#E5E5E5]"></div>
            <div className="w-full h-full border border-grey-200 p-6 flex flex-col">
               <div className="border-b-4 border-brand-black pb-4 mb-4 flex justify-between items-end">
                  <div className="w-2/3 h-6 bg-grey-200 rounded-sm"></div>
                  <div className="w-1/4 h-8 bg-brand-black rounded-sm"></div>
               </div>
               <div className="flex-1 grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="w-full h-3 bg-grey-200 rounded-sm"></div>
                    <div className="w-5/6 h-3 bg-grey-200 rounded-sm"></div>
                    <div className="w-full h-3 bg-grey-200 rounded-sm"></div>
                    <div className="w-4/6 h-3 bg-grey-200 rounded-sm"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-grey-300 rounded-sm"></div>
                    <div className="flex justify-between">
                      <div className="w-1/2 h-3 bg-grey-200 rounded-sm"></div>
                      <div className="w-1/4 h-3 bg-grey-300 rounded-sm"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-1/2 h-3 bg-grey-200 rounded-sm"></div>
                      <div className="w-1/4 h-3 bg-grey-300 rounded-sm"></div>
                    </div>
                  </div>
               </div>
               <div className="mt-auto pt-4 border-t-2 border-grey-900 flex justify-end">
                  <div className="w-1/3 h-6 bg-brand-red opacity-80 rounded-sm"></div>
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-brand-black mb-6">100% Accurate Factory Data</h2>
            <ul className="space-y-5 mb-8">
              {['Original MSRP & options pricing', 'Exact color and trim codes', 'Standard equipment details', 'Fuel economy and safety ratings'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <span className="text-grey-800">{item}</span>
                </li>
              ))}
            </ul>
            <button className="inline-flex items-center gap-2 bg-brand-white border border-grey-900 text-brand-black px-6 py-3 rounded-sm font-medium hover:bg-grey-50 transition-colors">
              <FileText className="w-4 h-4" />
              View Sample Sticker
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-brand-black">How it works</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-grey-200 z-0"></div>
            {[
              { step: '01', title: 'Enter your VIN', desc: 'Type in your 17-character VIN or use the license plate lookup tool.' },
              { step: '02', title: 'Free Preview', desc: 'Verify the year, make, model, trim, and engine instantly at no cost.' },
              { step: '03', title: 'Download PDF', desc: 'Pay a small fee to unlock, view, and print the official digital document.' },
            ].map((step, i) => (
              <div key={i} className="flex-1 relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-brand-white border border-grey-300 rounded-full flex items-center justify-center font-bold text-lg text-brand-black mb-4 shadow-sm">
                  {step.step}
                </div>
                <h3 className="font-semibold text-brand-black mb-2">{step.title}</h3>
                <p className="text-sm text-grey-600 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const vinSections = [
  { pos: '1-3', title: 'World Manufacturer Identifier (WMI)', desc: 'Identifies the manufacturer and country of origin. e.g., WAU indicates Audi Germany.' },
  { pos: '4-8', title: 'Vehicle Descriptor Section (VDS)', desc: 'Contains details about the vehicle series, engine type, and trim level.' },
  { pos: '9', title: 'Check Digit', desc: 'A mathematical security digit to verify the VIN\'s authenticity.' },
  { pos: '10', title: 'Model Year Code', desc: 'Indicates the official model year (e.g., N = 2022, P = 2023).' },
  { pos: '11', title: 'Assembly Plant Code', desc: 'Specifies the factory where the vehicle was built (e.g., A = Ingolstadt, N = Neckarsulm).' },
  { pos: '12-17', title: 'Production Sequence Number', desc: 'The unique serial number assigned to the specific vehicle on the assembly line.' },
];

export default function VinDecoder() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-6 bg-brand-white border-t border-grey-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-black mb-3">Understanding the 17-digit VIN</h2>
          <p className="text-grey-700">How the Vehicle Identification Number structure works.</p>
        </div>

        <div className="border border-grey-200 rounded-sm divide-y divide-grey-200">
          {vinSections.map((section, i) => (
            <div key={i} className="bg-brand-white">
              <button
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-grey-50 transition-colors text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-brand-red bg-red-50 px-2 py-1 rounded-sm w-16 text-center">
                    POS {section.pos}
                  </span>
                  <span className="font-medium text-brand-black">{section.title}</span>
                </div>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-grey-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-grey-500" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 pt-1 text-sm text-grey-700 ml-20">
                  {section.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VinLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  {
    num: "1",
    title: "Lower Driver-Side Windshield",
    desc: "Stand outside your Audi and inspect the lower bottom corner of the driver's side front windshield. You will see the VIN engraved onto a metal plate."
  },
  {
    num: "2",
    title: "Driver's Side Door Jamb",
    desc: "Open your driver's cabin door and look at the side door frame pillar. You will see the official safety compliance sticker printing your VIN and manufacturing date."
  },
  {
    num: "3",
    title: "Engine Bay",
    desc: "Many Audis have the VIN stamped directly into the metal or on a mounted plate inside the engine compartment."
  },
  {
    num: "4",
    title: "In-Car System (MMI)",
    desc: "Launch your official Audi MMI system. Open Car settings → Service & Checks. Your chassis number and VIN are printed directly on the screen."
  }
];

export default function VinLocationModal({ isOpen, onClose }: VinLocationModalProps) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-brand-white rounded-sm shadow-2xl flex flex-col overflow-hidden max-h-[90vh] md:max-h-[85vh] transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-grey-100 hover:bg-grey-200 text-brand-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Content List */}
        <div className="flex flex-col h-full bg-brand-white overflow-hidden">
          
          <div className="p-6 md:p-10 flex-1 overflow-y-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 pr-12">
              How to locate your Audi's 17-character VIN
            </h2>
            <p className="text-grey-600 text-sm md:text-base leading-relaxed mb-8">
              Audi embeds your unique 17-character vehicle identification number in multiple easy-to-locate configurations:
            </p>

            <div className="space-y-8 pb-4">
              {locations.map((loc) => (
                <div key={loc.num} className="flex gap-4 group">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-brand-red/10 text-brand-red font-bold text-sm flex items-center justify-center border border-brand-red/20 group-hover:bg-brand-red group-hover:text-brand-white transition-colors">
                    {loc.num}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-brand-black mb-1">
                      {loc.title}
                    </h4>
                    <p className="text-sm text-grey-600 leading-relaxed">
                      {loc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="p-6 md:p-8 bg-grey-50 border-t border-grey-200 shrink-0">
            <button 
              onClick={onClose}
              className="w-full bg-brand-black hover:bg-grey-900 text-brand-white font-bold py-4 px-6 rounded-sm transition-colors text-center cursor-pointer"
            >
              I've found my VIN
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

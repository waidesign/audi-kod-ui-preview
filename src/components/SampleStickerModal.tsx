import React from 'react';
import { X, Download, Printer, CheckCircle2, ShieldCheck, Car, ExternalLink } from 'lucide-react';

interface SampleStickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SampleStickerModal({ isOpen, onClose }: SampleStickerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-brand-white rounded-lg shadow-2xl border border-grey-200 overflow-hidden my-8 animate-scaleIn">
        
        {/* Header bar */}
        <div className="bg-brand-black text-brand-white px-6 py-4 flex items-center justify-between border-b border-grey-800">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-brand-red flex items-center justify-center rounded-sm text-white font-bold text-xs">
              A
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-white leading-tight">Official Audi Factory Monroney Window Sticker</h3>
              <p className="text-xs text-grey-400">Sample Preview &bull; 2024 Audi RS6 Avant &bull; VIN: WUA14BF29RN902418</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="p-2 text-grey-400 hover:text-white hover:bg-grey-800 rounded-sm transition-colors cursor-pointer"
              title="Print Sample"
            >
              <Printer size={18} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-grey-400 hover:text-white hover:bg-grey-800 rounded-sm transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Sticker Body */}
        <div className="p-6 sm:p-8 bg-grey-100 max-h-[75vh] overflow-y-auto">
          {/* Simulated Real Monroney Sticker */}
          <div className="bg-white border-2 border-brand-black p-6 rounded-sm shadow-md font-sans text-brand-black text-xs leading-normal">
            
            {/* Top Brand Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-brand-black pb-4 mb-4 gap-4">
              <div>
                <div className="text-2xl font-black tracking-tight text-brand-black">Audi of America</div>
                <div className="text-xs text-grey-600 font-semibold tracking-wider uppercase">Factory Monroney Label Replica</div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm font-bold">2024 AUDI RS 6 AVANT 4.0T</div>
                <div className="font-mono text-xs text-grey-700">VIN: WUA14BF29RN902418</div>
                <div className="text-xs text-grey-600">Port of Entry: Davisville, RI</div>
              </div>
            </div>

            {/* Main Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b-2 border-brand-black pb-6 mb-6">
              
              {/* Column 1: Standard Equipment */}
              <div>
                <h4 className="font-black text-xs uppercase tracking-wider bg-grey-200 px-2 py-1 mb-2">Technical Specs</h4>
                <ul className="space-y-1 text-[11px] text-grey-800">
                  <li>&bull; 4.0L V8 Twin-Turbo TFSI Engine</li>
                  <li>&bull; 621 HP / 627 lb-ft of Torque</li>
                  <li>&bull; 8-Speed Tiptronic Transmission</li>
                  <li>&bull; quattro&reg; with Sport Rear Differential</li>
                  <li>&bull; Dynamic All-Wheel Steering</li>
                  <li>&bull; RS Adaptive Air Suspension</li>
                </ul>

                <h4 className="font-black text-xs uppercase tracking-wider bg-grey-200 px-2 py-1 mt-4 mb-2">Safety / Security</h4>
                <ul className="space-y-1 text-[11px] text-grey-800">
                  <li>&bull; Audi pre sense front &amp; rear</li>
                  <li>&bull; Lane Departure Warning</li>
                  <li>&bull; Top view camera with Virtual 360&deg;</li>
                  <li>&bull; Advanced Airbag Protection System</li>
                </ul>
              </div>

              {/* Column 2: Comfort & Tech */}
              <div>
                <h4 className="font-black text-xs uppercase tracking-wider bg-grey-200 px-2 py-1 mb-2">Standard Features</h4>
                <ul className="space-y-1 text-[11px] text-grey-800">
                  <li>&bull; Valcona Leather RS Sport Seats</li>
                  <li>&bull; Bang &amp; Olufsen&reg; Premium 3D Sound</li>
                  <li>&bull; Audi MMI Navigation plus w/ Touch</li>
                  <li>&bull; Audi virtual cockpit plus (12.3")</li>
                  <li>&bull; Matrix-design LED Headlights with Laser Light</li>
                  <li>&bull; Power Tailgate &amp; Soft-Close Doors</li>
                  <li>&bull; Carbon Twill Structure Inlays</li>
                  <li>&bull; 4-Zone Automatic Climate Control</li>
                </ul>
              </div>

              {/* Column 3: Factory Installed Options & Pricing */}
              <div className="bg-grey-50 p-3 border border-grey-300 rounded-sm">
                <h4 className="font-black text-xs uppercase tracking-wider text-brand-red mb-2">Manufacturer's Suggested Retail Price</h4>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between font-bold">
                    <span>Base MSRP:</span>
                    <span>$125,800.00</span>
                  </div>
                  <div className="border-t border-grey-300 pt-1.5 text-grey-700">
                    <div className="flex justify-between">
                      <span>Nardo Gray Exterior</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Black Optic Package (22" Wheels)</span>
                      <span>$2,750.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Executive Package</span>
                      <span>$2,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Driver Assistance Package</span>
                      <span>$2,250.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RS Sport Exhaust System</span>
                      <span>$1,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Destination Charge</span>
                      <span>$1,095.00</span>
                    </div>
                  </div>
                  <div className="border-t-2 border-brand-black pt-2 flex justify-between font-black text-xs text-brand-black">
                    <span>TOTAL MSRP:</span>
                    <span>$135,395.00</span>
                  </div>
                </div>
              </div>

            </div>

            {/* EPA and Safety rating badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-grey-50 p-4 border border-grey-300 rounded-sm">
              <div>
                <div className="font-bold text-xs uppercase text-grey-700 mb-1">EPA Fuel Economy &amp; Environment</div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black text-brand-black">17 <span className="text-xs font-normal text-grey-600">MPG</span></div>
                  <div className="text-[11px] text-grey-600">
                    <div>14 City &bull; 21 Highway</div>
                    <div>5.9 gals per 100 miles</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-bold text-xs uppercase text-grey-700 mb-1">Government 5-Star Safety Ratings</div>
                <div className="text-[11px] text-grey-600">
                  <div className="flex items-center gap-1 font-bold text-brand-black">
                    Overall Vehicle Score: <span className="text-yellow-500 text-sm">★★★★★</span>
                  </div>
                  <div>Frontal Crash: <span className="text-yellow-500">★★★★★</span> &bull; Side Crash: <span className="text-yellow-500">★★★★★</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-brand-white px-6 py-4 border-t border-grey-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-grey-600">
            <ShieldCheck size={16} className="text-green-600" />
            <span>Guaranteed 100% genuine factory equipment data match</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-brand-black text-brand-white text-sm font-semibold rounded-sm hover:bg-grey-900 transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
}

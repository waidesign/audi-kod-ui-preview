import React, { useState } from 'react';
import audiVinDiagram from '../assets/images/audi_vin_location_diagram_1787230191094.jpg';

const locations = [
  {
    id: "dashboard",
    title: "Dashboard (Windshield Corner)",
    desc: "Stand outside on the driver's side and look through the glass at the base of the windshield."
  },
  {
    id: "door",
    title: "Driver-Door Jamb",
    desc: "Open the driver door and check the factory sticker located on the frame."
  },
  {
    id: "engine",
    title: "Engine Bay",
    desc: "Stamped directly into the metal or on a mounted plate inside the engine compartment."
  },
  {
    id: "trunk",
    title: "Trunk Area",
    desc: "Found on the build label containing factory option codes under the trunk lining."
  },
  {
    id: "docs",
    title: "Vehicle Documents",
    desc: "Appears on the registration, insurance card, service book, and delivery papers."
  },
  {
    id: "mmi",
    title: "In-Car System (MMI)",
    desc: "Open Car settings → Service & Checks → Chassis number to view on screen."
  },
  {
    id: "classic",
    title: "Classic Audi Models",
    desc: "For vintage Audis (pre-1981), check the dashboard, door jamb, firewall, and trunk."
  }
];

export default function WhereToFindVIN() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  return (
    <section id="where-to-find-vin" className="py-16 px-6 bg-grey-50 border-t border-grey-100">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Compact Header */}
        <div className="mb-12 border-b border-grey-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-4">
              Where Can You Find the VIN on an Audi?
            </h2>
            <p className="text-lg text-grey-700 leading-relaxed">
              A VIN is a 17-character code that identifies the Audi, although classic models may feature 5- to 14-digit VINs. You can spot the Audi VIN in these easy places:
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-2 h-2 bg-brand-red"></div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-black">7 Locations</span>
          </div>
        </div>
        
        {/* Main Content: Side-by-Side (50/50 Split) */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Interactive VIN Image Map */}
          <div className="lg:w-1/2 w-full lg:sticky lg:top-32">
            <div className="relative w-full aspect-[16/9] bg-white rounded-sm overflow-hidden border border-grey-200 shadow-sm group">
              <img 
                src={audiVinDiagram} 
                alt="Audi side profile showing VIN locations" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Marker: Engine Bay */}
              <button 
                onMouseEnter={() => setActiveMarker('engine')}
                onMouseLeave={() => setActiveMarker(null)}
                className="absolute top-[48%] left-[22%] w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center cursor-crosshair group/marker z-10"
              >
                <div className={`absolute inset-0 rounded-full bg-brand-red opacity-20 animate-ping`}></div>
                <div className={`w-2.5 h-2.5 rounded-full bg-brand-red transition-transform duration-300 ${activeMarker === 'engine' ? 'scale-150 shadow-md' : ''}`}></div>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-brand-black text-brand-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm whitespace-nowrap transition-opacity pointer-events-none ${activeMarker === 'engine' ? 'opacity-100' : 'opacity-0 group-hover/marker:opacity-100'}`}>
                  Engine Bay
                </div>
              </button>

              {/* Marker: Dashboard */}
              <button 
                onMouseEnter={() => setActiveMarker('dashboard')}
                onMouseLeave={() => setActiveMarker(null)}
                className="absolute top-[38%] left-[35%] w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center cursor-crosshair group/marker z-10"
              >
                <div className={`absolute inset-0 rounded-full bg-brand-red opacity-20 animate-ping delay-75`}></div>
                <div className={`w-2.5 h-2.5 rounded-full bg-brand-red transition-transform duration-300 ${activeMarker === 'dashboard' ? 'scale-150 shadow-md' : ''}`}></div>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-brand-black text-brand-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm whitespace-nowrap transition-opacity pointer-events-none ${activeMarker === 'dashboard' ? 'opacity-100' : 'opacity-0 group-hover/marker:opacity-100'}`}>
                  Dashboard
                </div>
              </button>

              {/* Marker: Door Jamb */}
              <button 
                onMouseEnter={() => setActiveMarker('door')}
                onMouseLeave={() => setActiveMarker(null)}
                className="absolute top-[48%] left-[52%] w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center cursor-crosshair group/marker z-10"
              >
                <div className={`absolute inset-0 rounded-full bg-brand-red opacity-20 animate-ping delay-150`}></div>
                <div className={`w-2.5 h-2.5 rounded-full bg-brand-red transition-transform duration-300 ${activeMarker === 'door' ? 'scale-150 shadow-md' : ''}`}></div>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-brand-black text-brand-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm whitespace-nowrap transition-opacity pointer-events-none ${activeMarker === 'door' ? 'opacity-100' : 'opacity-0 group-hover/marker:opacity-100'}`}>
                  Door Jamb
                </div>
              </button>

              {/* Marker: Trunk Area */}
              <button 
                onMouseEnter={() => setActiveMarker('trunk')}
                onMouseLeave={() => setActiveMarker(null)}
                className="absolute top-[45%] left-[82%] w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center cursor-crosshair group/marker z-10"
              >
                <div className={`absolute inset-0 rounded-full bg-brand-red opacity-20 animate-ping delay-300`}></div>
                <div className={`w-2.5 h-2.5 rounded-full bg-brand-red transition-transform duration-300 ${activeMarker === 'trunk' ? 'scale-150 shadow-md' : ''}`}></div>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-brand-black text-brand-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm whitespace-nowrap transition-opacity pointer-events-none ${activeMarker === 'trunk' ? 'opacity-100' : 'opacity-0 group-hover/marker:opacity-100'}`}>
                  Trunk Area
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Dense List Layout */}
          <div className="lg:w-1/2 w-full">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {locations.map((loc) => (
                <div 
                  key={loc.id} 
                  className={`relative border-t-2 pt-4 transition-colors cursor-default ${
                    activeMarker === loc.id ? 'border-brand-red' : 'border-grey-200 hover:border-brand-red'
                  }`}
                  onMouseEnter={() => setActiveMarker(loc.id)}
                  onMouseLeave={() => setActiveMarker(null)}
                >
                  <h3 className={`text-base font-bold mb-1 transition-colors leading-snug ${
                    activeMarker === loc.id ? 'text-brand-red' : 'text-brand-black group-hover:text-brand-red'
                  }`}>
                    {loc.title}
                  </h3>
                  <p className="text-sm text-grey-600 leading-relaxed">
                    {loc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

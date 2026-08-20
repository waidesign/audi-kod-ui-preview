import React, { useState } from 'react';

const vinSegments = [
  { 
    id: 'wmi', 
    chars: 'W A 1', 
    label: 'WMI', 
    title: 'World Manufacturer Identifier (1-3)', 
    desc: 'Identifies the country of origin and manufacturer. "W" indicates Germany, and "A1" designates Audi.' 
  },
  { 
    id: 'vds', 
    chars: 'A N A F Y', 
    label: 'VDS', 
    title: 'Vehicle Descriptor Section (4-8)', 
    desc: 'Denotes the vehicle\'s specific model, engine size, body style, and restraint system.' 
  },
  { 
    id: 'check', 
    chars: '1', 
    label: 'Check', 
    title: 'Security Check Digit (9)', 
    desc: 'A mathematically calculated security digit used to verify the VIN\'s authenticity and prevent fraud.' 
  },
  { 
    id: 'year', 
    chars: 'L', 
    label: 'Year', 
    title: 'Model Year (10)', 
    desc: 'Shows the vehicle\'s model year. (e.g., "L" represents the year 2020).' 
  },
  { 
    id: 'plant', 
    chars: '2', 
    label: 'Plant', 
    title: 'Assembly Plant (11)', 
    desc: 'Indicates the specific Audi factory location where this vehicle was assembled.' 
  },
  { 
    id: 'serial', 
    chars: '0 4 2 5 4 4', 
    label: 'Serial', 
    title: 'Production Serial (12-17)', 
    desc: 'Displays the unique 6-digit production serial number assigned to this specific vehicle on the assembly line.' 
  }
];

const mainSections = [
  {
    title: "World Manufacturer Identifier",
    abbr: "WMI",
    chars: "Characters 1–3",
    desc: "Identifies the manufacturer and country of origin. It confirms the vehicle was built by Audi and specifies the manufacturing region."
  },
  {
    title: "Vehicle Descriptor Section",
    abbr: "VDS",
    chars: "Characters 4–8",
    desc: "Describes the core attributes of the vehicle, including the specific model, body style, engine type, and transmission."
  },
  {
    title: "Vehicle Identifier Section",
    abbr: "VIS",
    chars: "Characters 10–17",
    desc: "Includes the model year, assembly plant code, and a unique 6-digit production serial number that distinguishes it from all other similar models."
  }
];

export default function HowToReadVIN() {
  const [activeSegment, setActiveSegment] = useState(vinSegments[0]);

  return (
    <section className="py-24 px-6 bg-brand-white border-t border-grey-100">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black mb-6 leading-tight">
            How To Read An Audi VIN Number?
          </h2>
          <p className="text-lg text-grey-700 leading-relaxed">
            Every Audi comes with a unique 17-digit VIN that identifies and distinguishes it from other similar models. The Vehicle Identification Number is divided into three primary sections.
          </p>
        </div>

        {/* Interactive Technical Visualizer */}
        <div className="bg-brand-black rounded-sm p-8 lg:p-16 mb-20 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red"></div>
          
          <div className="text-center mb-12">
            <h3 className="text-brand-white font-medium text-lg uppercase tracking-widest opacity-80">
              Interactive VIN Breakdown
            </h3>
            <p className="text-grey-400 text-sm mt-2">Hover over any segment to decode</p>
          </div>

          {/* VIN Display */}
          <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 lg:gap-x-6 gap-y-8 mb-16">
            {vinSegments.map((segment) => (
              <div 
                key={segment.id}
                className="flex flex-col items-center cursor-crosshair group"
                onMouseEnter={() => setActiveSegment(segment)}
              >
                {/* Highlight Bar */}
                <div className={`w-full h-1 mb-3 transition-colors duration-300 ${activeSegment.id === segment.id ? 'bg-brand-red' : 'bg-grey-800 group-hover:bg-grey-600'}`}></div>
                
                {/* Characters */}
                <div className={`font-mono text-2xl md:text-4xl lg:text-5xl font-black tracking-[0.2em] transition-colors duration-300 ${activeSegment.id === segment.id ? 'text-brand-red' : 'text-brand-white group-hover:text-grey-300'}`}>
                  {segment.chars}
                </div>
                
                {/* Label */}
                <div className={`mt-4 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeSegment.id === segment.id ? 'text-brand-white' : 'text-grey-600 group-hover:text-grey-400'}`}>
                  {segment.label}
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Readout Panel */}
          <div className="max-w-2xl mx-auto bg-grey-900 rounded-sm p-6 md:p-8 min-h-[140px] flex flex-col justify-center border border-grey-800 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3 justify-center">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
              <h4 className="text-brand-white font-bold text-lg tracking-wide">
                {activeSegment.title}
              </h4>
            </div>
            <p className="text-grey-400 text-center leading-relaxed text-sm md:text-base">
              {activeSegment.desc}
            </p>
          </div>
        </div>

        {/* 3-Column Core Sections Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {mainSections.map((section, i) => (
            <div key={i} className="bg-grey-50 p-8 rounded-sm border border-grey-200 hover:border-grey-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-brand-red font-black font-mono text-xl">{section.abbr}</span>
                <span className="bg-brand-white border border-grey-200 text-grey-600 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
                  {section.chars}
                </span>
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-3 leading-snug">
                {section.title}
              </h3>
              <p className="text-grey-600 leading-relaxed text-sm">
                {section.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

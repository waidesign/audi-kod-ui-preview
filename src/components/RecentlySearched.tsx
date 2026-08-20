import React from 'react';
import { Activity, Search, ChevronRight } from 'lucide-react';

const recentSearches = [
  { vin: "WAU24GF50KN000155", time: "Just now" },
  { vin: "TRUTECFV0L1003830", time: "2 min ago" },
  { vin: "WAUFGAFC5GN004648", time: "5 min ago" },
  { vin: "WA1VXBF72PD025321", time: "12 min ago" },
  { vin: "WA1CWBF17PD030486", time: "18 min ago" },
  { vin: "WAUFACF52PA058236", time: "24 min ago" },
  { vin: "WAUKGBFL2BA112925", time: "31 min ago" },
  { vin: "WAUH7HFF8G1030521", time: "45 min ago" },
  { vin: "WAUACJFF2F1007447", time: "1 hr ago" },
  { vin: "WAUZZZF33K1059184", time: "1 hr ago" },
  { vin: "TRUZZZ8NZX1022851", time: "2 hrs ago" },
  { vin: "WAUDFAFC4DN156829", time: "2 hrs ago" }
];

export default function RecentlySearched() {
  return (
    <section className="py-24 px-6 bg-grey-50 border-t border-grey-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-3">
              Recently Searched Audi Window Stickers
            </h2>
            <p className="text-lg text-grey-600">
              Live feed of the latest vehicle checks across our global database.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-brand-white border border-grey-200 px-4 py-2 rounded-full shadow-sm shrink-0">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
            </div>
            <span className="text-sm font-bold text-brand-black uppercase tracking-wider">
              Live Updates
            </span>
          </div>
        </div>

        {/* VIN Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentSearches.map((item, idx) => (
            <button 
              key={idx} 
              className="group flex items-center justify-between p-4 bg-brand-white border border-grey-200 rounded-sm hover:border-brand-red hover:shadow-md transition-all text-left cursor-pointer"
            >
              <div>
                <div className="font-mono font-bold text-brand-black text-sm md:text-base tracking-wider group-hover:text-brand-red transition-colors">
                  {item.vin}
                </div>
                <div className="text-xs text-grey-500 font-medium mt-1 flex items-center gap-1.5">
                  <Activity size={12} className="text-grey-400" />
                  {item.time}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-grey-50 flex items-center justify-center group-hover:bg-brand-red/10 transition-colors">
                <ChevronRight size={16} className="text-grey-400 group-hover:text-brand-red transition-colors" />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ArrowRight, Barcode, ShieldCheck, Gauge, AlertTriangle, Sparkles, FileText } from 'lucide-react';

const tools = [
  {
    name: "Audi VIN Decoder",
    desc: "Decode any Audi VIN Number to instantly view the year, make, model, engine, trim, and more for free.",
    icon: Barcode,
    href: "#vin-decoder"
  },
  {
    name: "Audi Warranty Check by VIN",
    desc: "See the factory warranty coverage, including the years and mileage. Know what is still protected before you commit.",
    icon: ShieldCheck,
    href: "#warranty-check"
  },
  {
    name: "Audi Specs by VIN",
    desc: "Get verified performance and dimensions: power, torque, 0-60, towing, and more.",
    icon: Gauge,
    href: "#specs"
  },
  {
    name: "Audi Recalls by VIN",
    desc: "Check for past and open recalls in seconds. Make sure the Audi is safe for you and all users.",
    icon: AlertTriangle,
    href: "#recalls"
  },
  {
    name: "Audi Options by VIN",
    desc: "Reveal any Audi's original options, packages, and pricing. Confirm features to determine value and fair price.",
    icon: Sparkles,
    href: "#options"
  },
  {
    name: "Audi Build Sheet by VIN",
    desc: "Pull the original options, equipment, colors, and other production data. Verify authenticity and order the right parts during restoration.",
    icon: FileText,
    href: "#build-sheet"
  }
];

export default function RelatedTools() {
  return (
    <section className="py-24 px-6 bg-grey-50 border-t border-grey-200">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black mb-6">
            Find More Audi Vehicle Information With These Tools
          </h2>
          <p className="text-lg text-grey-600 leading-relaxed max-w-3xl mx-auto">
            Beyond the <strong>Audi Monroney sticker</strong>, you can use these tools to look up Audi paint codes, warranty status, options, and full specifications so you can make a confident decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-0 border-b border-grey-200 md:border-b-0">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <a 
                key={i} 
                href={tool.href}
                className="group flex items-start gap-6 py-8 border-t border-grey-200 transition-all cursor-pointer"
              >
                <div className="shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-grey-200 group-hover:bg-brand-black group-hover:border-brand-black transition-colors">
                  <Icon size={20} className="text-brand-black group-hover:text-white transition-colors" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-brand-black group-hover:text-brand-red transition-colors">
                      {tool.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-grey-100 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-hover:bg-brand-red/10">
                      <ArrowRight size={16} className="text-brand-red" />
                    </div>
                  </div>
                  <p className="text-grey-600 text-sm leading-relaxed pr-4">
                    {tool.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
